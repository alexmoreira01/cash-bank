import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListDateTransactionsUseCase } from "./ListDateTransactionsUseCase";

class ListDateTransactionsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const { date } = request.params;

        const listDateTransactionsUseCase = container.resolve(ListDateTransactionsUseCase);

        const transactions = await listDateTransactionsUseCase.execute({
            id_user: id,
            date
        });

        return response.json(transactions);
    }
}

export { ListDateTransactionsController };
