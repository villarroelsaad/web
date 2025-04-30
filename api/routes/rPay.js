import { Router } from "express";
import { PayController } from "../controllers/payController";

export const routerPay = Router();

routerPay.post('/paypal-ipn', PayController.paypalIpn);
routerPay.get('/get-ipn', PayController.getIpnData);
