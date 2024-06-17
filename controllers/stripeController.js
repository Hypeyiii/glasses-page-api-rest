import { StripeModel } from "../models/mysql/stripeModel.js";

export class StripeController {

  static async checkout(req, res) {
    try {
      const payment = await StripeModel.create({ input: req.body });

      res
        .status(200)
        .json({ message: "Payment successful", paymentId: payment.id });
    } catch (error) {
      console.error("Error in checkout:", error);
      res
        .status(500)
        .json({ error: "Failed to process payment. Please try again later." });
    }
  }
}