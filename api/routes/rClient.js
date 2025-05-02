import { Router } from "express";
import { ClientsController } from "../controllers/clientController.js";

export const routerClient = Router();

routerClient.get('/get', ClientsController.getClients);
routerClient.get('/delete/:id', ClientsController.deleteClient);
routerClient.post('/edit', ClientsController.editClient);

