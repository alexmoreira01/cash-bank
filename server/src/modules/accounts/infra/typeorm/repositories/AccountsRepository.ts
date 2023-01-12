import { getRepository, Repository } from "typeorm";

import { IAccountsRepository } from "@modules/accounts/repositories/IAccountsRepository";

import { Account } from "../entities/Account";

class AccountsRepository implements IAccountsRepository {
    private repository: Repository<Account>;

    constructor() {
        this.repository = getRepository(Account);
    }

    async create(balance: number): Promise<Account> {
        const account = this.repository.create({balance});

        await this.repository.save(account);

        return account;
    }

    async getBalance(id: string): Promise<Account> {
        const balance = this.repository.findOne(id);

        return balance
    }

    async findById(id: string): Promise<Account> {
        const account = await this.repository.findOne(id);
        return account;
    }

    async cashOut(id: string, value: number): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ balance: value })
            .where("id = :id")
            .setParameters({ id })
            .execute();
    }

    async cashIn(id: string, value: number): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ balance: value })
            .where("id = :id")
            .setParameters({ id })
            .execute();
    }
}

export { AccountsRepository };
