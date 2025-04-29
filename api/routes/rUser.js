import { Router } from "express";
import { UserController } from "../controllers/userController";

export const routerUser = Router();

routerUser.post("/login", UserController.login);
routerUser.post("/register", UserController.register);
routerUser.post("/logout", UserController.logOut);
routerUser.get("/:id", UserController.deleteUser);