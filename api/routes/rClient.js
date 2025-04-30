import { Router } from "express";
import { ClientsController } from "../controllers/clientController";

export const routerClient = Router();

routerClient.get('/client', ClientsController.getClients);
routerClient.get('/edit-client', ClientsController.editClient);
routerClient.get('/delete-client', ClientsController.deleteClient);

