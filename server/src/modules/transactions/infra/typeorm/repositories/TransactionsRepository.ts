import { getRepository, In, Repository } from "typeorm";

import {
    ITransactionsRepository,
    ICreateTransactionsDTO,
} from "@modules/transactions/repositories/ITransactionsRepository";

import { Transaction } from "../entities/Transaction";

class TransactionsRepository implements ITransactionsRepository {
    private repository: Repository<Transaction>;

    constructor() {
        this.repository = getRepository(Transaction);
    }

    async create({ debitedId, creditedId, value }: ICreateTransactionsDTO): Promise<void> {
        const transaction = this.repository.create({
            debited_account_id: debitedId,
            credited_account_id: creditedId,
            value
        });

        await this.repository.save(transaction);
    }

    async list(id_user: string): Promise<Transaction[]> {
        const transactionsQuery = await this.repository
        .createQueryBuilder("t")
        .where("debited_account_id = :idDebited OR credited_account_id = :idCredited", { idDebited: id_user, idCredited: id_user})
        .getMany();

        return transactionsQuery; 
    }

    async listDate(id_user: string, data: string): Promise<Transaction[]> {
        const transactionsQuery = await this.repository.query(
            `
                SELECT * FROM transactions 
                WHERE '${id_user}' in (debited_account_id,credited_account_id)
                AND created_at > '${data} 00:00:00'
                AND created_at < '${data} 12:00:00'
            `
        )

        return transactionsQuery; 

        // Not working
        // .createQueryBuilder("t")
        // .where("debited_account_id = :idDebited OR credited_account_id = :idCredited", { idDebited: id_user, idCredited: id_user})
        // .andWhere("created_at > :dateInit && created_at < :dateEnd", { dateInit: `${data} 00:00:00`, dateEnd: `${data} 12:00:00`})
        // .getMany();
    }

    async listCashOut(id_user: string): Promise<Transaction[]> {
        const transactions = await this.repository.find({
            where: { debited_account_id: id_user}
        }); 
        return transactions; 
    }

    async listCashIn(id_user: string): Promise<Transaction[]> {
        const transactions = await this.repository.find({
            where: { credited_account_id: id_user}
        }); 
        return transactions; 
    }


}

export { TransactionsRepository };
