import stripe from "stripe";
import "dotenv/config";

const Stripe = new stripe(process.env.STRIPE_SECRET_KEY);

export class StripeController {
  static async checkout(req, res) {
    try {
      const { id, amount, name, email, phoneNumber, allProducts, lastName } =
        req.body;
      const customer = await Stripe.customers.create({
        email: email,
        name: name,
        phone: phoneNumber,
      });
      const payment = await Stripe.paymentIntents.create({
        amount,
        currency: "MXN",
        payment_method: id,
        confirmation_method: "manual",
        confirm: true,
        return_url: process.env.CLIENT_URL || "http://localhost:5173",
        receipt_email: email,
        description: `Compra de ${name} " " ${lastName} , productos: ${allProducts}`,
        customer: customer.id,
        metadata: {
          "Nombre:": name,
          "Apellido:": lastName,
          "Correo electrónico: ": email,
          "Telefono: ": phoneNumber,
          "Productos: ": allProducts,
        },
      });
      if (payment.status === "succeeded") {
        console.log("Successful Payment");
      }
      console.log(payment);
      res.json({ message: "Successful Payment", payment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.raw.message });
    }
  }
}
