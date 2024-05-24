import { Router } from "express";
import ToolsController from "../controllers/ToolsController.js";

const routes = Router();

routes.get("/tools", ToolsController.read);
routes.post("/tools", ToolsController.create);
routes.put("/tools/:id", ToolsController.update);
routes.delete("/tools/:id", ToolsController.delete);

export default routes;
