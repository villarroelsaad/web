import { Router } from "express";
import { ClientsController } from "../controllers/clientController.js";

export const routerClient = Router();

routerClient.get('/get', ClientsController.getClients);
routerClient.delete('/delete/:id', ClientsController.deleteClient);
routerClient.put('/edit/:id', ClientsController.editClient);

routerClient.post('/create', ClientsController.createClient);