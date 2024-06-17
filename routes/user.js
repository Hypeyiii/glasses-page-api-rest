import { Router } from "express";
import { UserController } from "../controllers/usersController.js";

export const userRouter = Router();

userRouter.get("/verify", UserController.verify);
userRouter.get("/logout", UserController.logout);


userRouter.get("/email/:email", UserController.getByEmail);
userRouter.get("/:id", UserController.getById);
userRouter.delete("/:id", UserController.delete);
userRouter.get("/", UserController.getAll);
userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);

userRouter.put("/:id", UserController.update);
