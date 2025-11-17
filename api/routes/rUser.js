import { Router } from "express";
import { UserController } from "../controllers/userController.js";

export const routerUser = Router();

routerUser.post("/login", UserController.login);
routerUser.post("/register", UserController.register);
routerUser.post("/edit/:id", UserController.editUser);

routerUser.get("/get", UserController.getUsers);
routerUser.get("/logout", UserController.logOut);
routerUser.get("/delete/:id", UserController.deleteUser);


//biyics4gsunhdwjwohx5