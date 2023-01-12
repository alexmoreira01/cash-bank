import { inject, injectable } from "tsyringe";

import { ITransactionsRepository } from "@modules/transactions/repositories/ITransactionsRepository";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IAccountsRepository } from "@modules/accounts/repositories/IAccountsRepository";

interface IRequest {
    username: string;
    value: number;
    id: string;
}

@injectable()
class CreateTransactionUseCase {
    constructor(
        @inject("TransactionsRepository")
        private transactionsRepository: ITransactionsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("AccountsRepository")
        private accountsRepository: IAccountsRepository,
    ) {}

    async execute({ username, value, id }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(id);
        const account = await this.accountsRepository.findById(user.accountId);

        if(user.username === username){
            throw new AppError("A transfer to yourself is not allowed!");
        }

        const userReceiving = await this.usersRepository.findByUsername(username) ;

        if (!userReceiving) {
            throw new AppError("User does not exist!");
        }

        if(account.balance < value) {
            throw new AppError("Insufficient funds!");
        }

        const valueCashOut = account.balance - value;

        await this.accountsRepository.cashOut(account.id, valueCashOut);

        const accountReceiving = await this.accountsRepository.findById(userReceiving.accountId);

        const valueReceiving = Number(accountReceiving.balance);

        const valueCashIn = Number(valueReceiving + value);

        // const valueCashIn = Number(accountReceiving.balance + value);

        await this.accountsRepository.cashIn(accountReceiving.id, valueCashIn);

        await this.transactionsRepository.create({
            debitedId: String(user.accountId), 
            creditedId: String(userReceiving.accountId), 
            value
        });

    }
}

export { CreateTransactionUseCase };
