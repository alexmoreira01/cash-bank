import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { IAccountsRepository } from "@modules/accounts/repositories/IAccountsRepository";

@injectable() 
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("AccountsRepository")
        private accountsRepository: IAccountsRepository
    ) {}

    async execute({
        username,
        password,
    }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByUsername(username);

        if (userAlreadyExists) {
            throw new AppError("User already exists");
        }

        if (username.length <= 3) {
            throw new AppError("Username must be longer than 3 characters");
        }

        const verify = this.verifyPass(password)

        if (password.length <= 8 && !verify) {
            throw new AppError("User name must have a uppercase character, numbers, and greater than eight characters");
        }

        const passwordHash = await hash(password, 8);


        const account = await this.accountsRepository.create(100)

        await this.usersRepository.create({
            username,
            password: passwordHash,
            accountId: account.id,
        });
    }

    verifyPass(pass) {
        const verify  = new RegExp(
            "^(?=.*[A-Z])(?=.*\\d).+$"
        );
        return verify.test(pass)
    }
}

export { CreateUserUseCase };
