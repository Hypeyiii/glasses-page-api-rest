import { Router } from "express";

import { GlassesController } from "../controllers/glassesController.js";

export const glassesRouter = Router();

//TODAS LAS RUTAS CON SU RESPECTIVO CONTROLADOR PARA QUITAR LA LOGICA EN MI APP.JS
glassesRouter.get("/", GlassesController.getAll);
glassesRouter.get("/:id", GlassesController.getById);
glassesRouter.post("/", GlassesController.create);
glassesRouter.put("/:id", GlassesController.update);
glassesRouter.delete("/:id", GlassesController.delete);
