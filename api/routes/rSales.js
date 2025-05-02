import { Router } from "express";
import { SalesController } from "../controllers/salesController.js";

export const routerSale = Router();

routerSale.get('/get', SalesController.getSales);
routerSale.get('/delete/:id', SalesController.deleteSale);

