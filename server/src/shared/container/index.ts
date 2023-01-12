import { container } from "tsyringe";

import "@shared/container/providers";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { TransactionsRepository } from "@modules/transactions/infra/typeorm/repositories/TransactionsRepository";
import { ITransactionsRepository } from "@modules/transactions/repositories/ITransactionsRepository";
import { IAccountsRepository } from "@modules/accounts/repositories/IAccountsRepository";
import { AccountsRepository } from "@modules/accounts/infra/typeorm/repositories/AccountsRepository";


// Singleton => para se ter apenas uma instancia
container.registerSingleton<ITransactionsRepository>( 
    "TransactionsRepository", 
    TransactionsRepository 
);

container.registerSingleton<IAccountsRepository>(
    "AccountsRepository",
    AccountsRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
);
