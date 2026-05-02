import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import rateLimit from "express-rate-limit";
import router from "./routes";
import { logger } from "./lib/logger";
import { allowedOrigins, requireSameOrigin } from "./middlewares/origin";

const app: Express = express();

app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (same-origin, server-to-server)
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
      } else {
        // For unrecognized origins, do not echo Access-Control-Allow-Origin
        // (so browsers block the response) but let the request continue so
        // route-level guards like `requireSameOrigin` can return a clean 403
        // instead of Express's default 500 for a thrown CORS error.
        callback(null, false);
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));

const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

const listingSubmitRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

const listingReadRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

app.use("/api/contact", contactRateLimit, requireSameOrigin);
app.use("/api/listings/submit", listingSubmitRateLimit, requireSameOrigin);
app.use("/api/listings", (req, res, next) => {
  if (req.method === "GET") {
    listingReadRateLimit(req, res, next);
  } else {
    next();
  }
});

app.use("/api", router);

export default app;
