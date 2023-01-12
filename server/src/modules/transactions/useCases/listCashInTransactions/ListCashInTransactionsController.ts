import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCashInTransactionsUseCase } from "./ListCashInTransactionsUseCase";

class ListCashInTransactionsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const listCashInTransactionsUseCase = container.resolve(ListCashInTransactionsUseCase);

        const transactions = await listCashInTransactionsUseCase.execute({
            id_user: id
        });

        return response.json(transactions);
    }
}

export { ListCashInTransactionsController };
