import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCashOutTransactionsUseCase } from "./ListCashOutTransactionsUseCase";

class ListCashOutTransactionsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const listCashOutTransactionsUseCase = container.resolve(ListCashOutTransactionsUseCase);

        const transactions = await listCashOutTransactionsUseCase.execute({
            id_user: id
        });

        return response.json(transactions);
    }
}

export { ListCashOutTransactionsController };
