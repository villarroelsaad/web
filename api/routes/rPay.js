import { Router } from "express";
import { PayController } from "../controllers/payController.js";

export const routerPay = Router();

routerPay.post('/ipn', PayController.paypalIpn);
routerPay.get('/get-ipn', PayController.getIpnData);
