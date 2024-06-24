import { Router } from "express";
import { OrdersController } from "../controllers/ordersController.js";
import { OrderProductsController } from "../controllers/orderProductsController.js";

export const ordersRouter = Router();

ordersRouter.delete("/:id", OrdersController.delete);

ordersRouter.get("/", OrdersController.getAll);
ordersRouter.get("/:id", OrdersController.getById);
ordersRouter.get("/user/:userId", OrdersController.getByUserId);
ordersRouter.get(
  "/products/:orderId",
  OrderProductsController.getProductsByOrderId
);
ordersRouter.get("/products", OrderProductsController.getAll);
ordersRouter.post("/", OrdersController.create);
