import { Router } from "express";
import { UserController } from "../controllers/userController";

export const routerUser = Router();

routerUser.post("/login", UserController.login);
routerUser.post("/register", UserController.register);
routerUser.get("/logout", UserController.logOut);
routerUser.get("/delete/:id", UserController.deleteUser);
routerUser.post("/edit:id", UserController.editUser);