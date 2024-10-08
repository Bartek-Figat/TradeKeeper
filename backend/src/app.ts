import "./config";
import express, {
  json,
  urlencoded,
  Response,
  Request,
  NextFunction,
} from "express";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import hpp from "hpp";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import { RegisterRoutes } from "../build/routes";
import { ApiError } from "./error/apiError";

export const app = express();

app.use(urlencoded({ extended: true, limit: "50mb" }));
app.use(json({ limit: "50mb" }));

app.use(cookieParser());

app.use(compression());

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    credentials: true,
  })
);

// Security middleware
app.use(helmet());
app.use(morgan("dev"));

app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"))
  );
});

// Security-related HTTP headers
app.set("trust proxy", 1);
app.set("x-powered-by", false);
app.disable("x-powered-by");
app.use(helmet.contentSecurityPolicy());
app.use(helmet.referrerPolicy({ policy: "same-origin" }));
app.use(helmet.frameguard({ action: "sameorigin" }));
app.use(
  helmet.hsts({ maxAge: 63072000, includeSubDomains: true, preload: true })
);
app.use(helmet.noSniff());
app.use(helmet.xssFilter());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Register API routes
RegisterRoutes(app);

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    next(err);
  }
});

export default app;
