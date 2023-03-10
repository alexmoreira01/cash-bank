import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        username,
        password,
        accountId,
        id,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            username,
            password,
            accountId,
            id,
        });

        await this.repository.save(user);
    }

    async findByUsername(username: string): Promise<User> {
        const user = await this.repository.findOne({ username });
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }
}

export { UsersRepository };
