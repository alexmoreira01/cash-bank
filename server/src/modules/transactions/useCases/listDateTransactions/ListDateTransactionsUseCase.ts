import { inject, injectable } from "tsyringe";

import { Transaction } from "@modules/transactions/infra/typeorm/entities/Transaction";
import { ITransactionsRepository } from "@modules/transactions/repositories/ITransactionsRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
    id_user: string;
    date: string;
}

@injectable()
class ListDateTransactionsUseCase {
    constructor(
        @inject("TransactionsRepository")
        private transactionsRepository: ITransactionsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ id_user, date }: IRequest): Promise<Transaction[]> {
        const user = await this.usersRepository.findById(id_user);

        const transactions = await this.transactionsRepository.listDate(user.accountId, date);

        return transactions;
    }
}

export { ListDateTransactionsUseCase };
