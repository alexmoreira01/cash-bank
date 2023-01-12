import { Router } from "express";

import { CreateTransactionController } from "@modules/transactions/useCases/createTransaction/CreateTransactionController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ListTransactionsController } from "@modules/transactions/useCases/listTransactions/ListTransactionsController";
import { ListCashOutTransactionsController } from "@modules/transactions/useCases/listCashOutTransactions/ListCashOutTransactionsController";
import { ListCashInTransactionsController } from "@modules/transactions/useCases/listCashInTransactions/ListCashInTransactionsController";
import { ListDateTransactionsController } from "@modules/transactions/useCases/listDateTransactions/ListDateTransactionsController";

const transactionsRoutes = Router();

const createTransactionController = new CreateTransactionController();
const listTransactionsController = new ListTransactionsController();
const listDateTransactionsController = new ListDateTransactionsController();
const listCashOutTransactionsController = new ListCashOutTransactionsController();
const listCashInTransactionsController = new ListCashInTransactionsController();


transactionsRoutes.post("/", ensureAuthenticated, createTransactionController.handle);
transactionsRoutes.get("/list", ensureAuthenticated, listTransactionsController.handle);
transactionsRoutes.get("/list/date/:date", ensureAuthenticated, listDateTransactionsController.handle);
transactionsRoutes.get("/list/cashOut", ensureAuthenticated, listCashOutTransactionsController.handle);
transactionsRoutes.get("/list/cashIn", ensureAuthenticated, listCashInTransactionsController.handle);



export { transactionsRoutes };
