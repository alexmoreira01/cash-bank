import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListTransactionsUseCase } from "./ListTransactionsUseCase";

class ListTransactionsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const listTransactionsUseCase = container.resolve(ListTransactionsUseCase);

        const transactions = await listTransactionsUseCase.execute({
            id_user: id
        });

        return response.json(transactions);
    }
}

export { ListTransactionsController };
