import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";

import { usersRoutes } from "./users.routes";
import { accountsRoutes } from "./accounts.routes";
import { transactionsRoutes } from "./transactions.routes";

const router = Router();

router.use("/users", usersRoutes); 
router.use("/accounts", accountsRoutes);
router.use("/transactions", transactionsRoutes);
router.use(authenticateRoutes); 

export { router };
