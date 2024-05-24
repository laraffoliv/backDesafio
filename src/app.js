import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";
import isDevEnvironment from "./utils/general/isDevEnvironment.js";
import { NotFoundError } from "./errors/baseErrors.js";

// Inicializando instância do servidor express
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
if (isDevEnvironment) app.use(morgan("dev"));

// Routes
app.use("/api", routes);

// Non existing routes
app.use("*", (req, res, next) => {
  next(new NotFoundError(`Route '${req.baseUrl}' not found`));
});

export default app;
