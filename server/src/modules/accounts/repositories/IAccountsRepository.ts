import { Account } from "../infra/typeorm/entities/Account";

interface IAccountsRepository {
    create(balance: number): Promise<Account>;
    getBalance(id: string): Promise<Account>;
    findById(id: string): Promise<Account>;
    cashOut(id: string, value:number): Promise<void>;
    cashIn(id: string, value:number): Promise<void>;
}

export { IAccountsRepository };
