import { Router } from "express";

import { GetBalanceController } from "@modules/accounts/useCases/getBalance/GetBalanceController"; 
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const accountsRoutes = Router();

const getBalanceController = new GetBalanceController();

accountsRoutes.get("/balance", ensureAuthenticated, getBalanceController.handle);

export { accountsRoutes };
