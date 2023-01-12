import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { IAccountsRepository } from "@modules/accounts/repositories/IAccountsRepository";
import { Account } from "@modules/accounts/infra/typeorm/entities/Account";


interface IRequest {
    user_id: string;
}


@injectable() 
class GetBalanceUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("AccountsRepository")
        private accountsRepository: IAccountsRepository
    ) {}

    async execute({ user_id }: IRequest): Promise<Account> {
        const user = await this.usersRepository.findById(user_id);


        const accountExists = await this.accountsRepository.findById(user.accountId);

        if (!accountExists) {
            throw new AppError("Account is not existing");
        }

        const balance = await this.accountsRepository.getBalance(user.accountId);

        return balance;
    }
}

export { GetBalanceUseCase };
