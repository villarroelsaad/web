import { Router } from "express";
import { SalesController } from "../controllers/salesController";

export const routerSale = Router();

routerSale.get('/sales', SalesController.getSales);
routerSale.get('/delete-Sale/:id', SalesController.deleteSale);

