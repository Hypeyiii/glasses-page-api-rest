// MIDDLEWARE PARA SABER QUE ORIGENES SON PERMITIDOS PARA ACCEDER A LA API

import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:8080",
  "http://localhost:5173",
  "https://isaac-glasses-page.vercel.app/",
];

export const corsMiddleware = ({ accepted_origins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (accepted_origins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      callback(new Error("No permitido por CORS"));
    },
  });
