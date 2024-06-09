import { Router } from "express";

import { UserController } from "../controllers/usersController.js";

export const userRouter = Router();

userRouter.get("/", UserController.getAll);
userRouter.get("/:id", UserController.getById);
userRouter.get("/email/:email", UserController.getByEmail);
userRouter.post("/", UserController.create);
userRouter.delete("/:id", UserController.delete);
