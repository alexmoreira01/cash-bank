import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

class CreateTransactionController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const { username, value } = request.body;

        const createCategoryUseCase = container.resolve(CreateTransactionUseCase);

        await createCategoryUseCase.execute({ username, value, id });

        return response.status(201).send();

    }
}

export { CreateTransactionController };
