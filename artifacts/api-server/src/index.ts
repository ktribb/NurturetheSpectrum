import app from "./app.js";
import { logger } from "./lib/logger.js";

// Export the app for Vercel serverless deployment
export default app;

// Only start listening when PORT is provided (local development / traditional server)
const rawPort = process.env["PORT"];

if (rawPort) {
  const port = Number(rawPort);

  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Invalid PORT value: "${rawPort}"`);
  }

  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Server listening");
  });
}
