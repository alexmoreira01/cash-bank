import { Transaction } from "../infra/typeorm/entities/Transaction";

interface ICreateTransactionsDTO {
    debitedId: string;
    creditedId: string;
    value: number;
}

interface ITransactionsRepository {
    create({ debitedId, creditedId, value }: ICreateTransactionsDTO): Promise<void>;
    list(id_user: string): Promise<Transaction[]>;
    listDate(id_user: string, data: string): Promise<Transaction[]>;
    listCashOut(id_user: string): Promise<Transaction[]>;
    listCashIn(id_user: string): Promise<Transaction[]>;
}

export { ITransactionsRepository, ICreateTransactionsDTO };
