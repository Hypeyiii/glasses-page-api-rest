import { Router } from "express";
import { StripeController } from "../controllers/stripeController.js";

export const stripeRouter = Router();

stripeRouter.post("/", StripeController.checkout);
