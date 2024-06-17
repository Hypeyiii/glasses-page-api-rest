import express, { json } from "express";
import { corsMiddleware } from "./middleware/cors.js";
import { glassesRouter } from "./routes/glasses.js";
import { userRouter } from "./routes/user.js";
import { stripeRouter } from "./routes/stripe.js";
import cookieParser from "cookie-parser";
import { PORT } from "./config.js";

const app = express();

app.use(json());
app.use(cookieParser());
app.use(corsMiddleware());

app.use("/checkout", stripeRouter);
app.use("/glasses", glassesRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
