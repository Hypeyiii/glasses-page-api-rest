import Stripe from "stripe";
import "dotenv/config";
import { STRIPE_SECRET_KEY } from "../../config.js";

const stripe = new Stripe(STRIPE_SECRET_KEY);

export class StripeModel {
  static async create({ input }) {
    try {
      const { id, amount, name, email, phoneNumber, allProducts, lastName } =
        input;

      // Create a new customer
      const customer = await stripe.customers.create({
        email: email,
        name: name,
        phone: phoneNumber,
      });

      // Create a new payment intent
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "MXN",
        payment_method: id,
        confirmation_method: "manual",
        confirm: true,
        return_url: process.env.CLIENT_URL || "http://localhost:5173",
        receipt_email: email,
        description: `Compra de ${name} ${lastName}, productos: ${allProducts}`,
        customer: customer.id,
        metadata: {
          Nombre: name,
          Apellido: lastName,
          "Correo electrónico": email,
          Telefono: phoneNumber,
          Productos: allProducts,
        },
      });

      return payment;
    } catch (error) {
      console.error("Error creating payment:", error);
      throw new Error("Failed to create payment. Please try again.");
    }
  }
}
