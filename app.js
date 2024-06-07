import express, { json } from "express";
import { corsMiddleware } from "./middleware/cors.js";
import { glassesRouter } from "./routes/glasses.js";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(json());
app.use(corsMiddleware());
app.use("/glasses", glassesRouter);
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
