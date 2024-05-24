import expressConfig from "../express.js";
import logger from "../logger.js";
import mongoConfig from "../mongo.js";
import setGracefulShutdown from "./setGracefulShutDown.js";

export default async function startServer() {
  try {
    const databaseConnection = await mongoConfig();
    const serverConnection = await expressConfig();

    setGracefulShutdown({
      serverConnection,
      databaseConnection,
    });
  } catch (err) {
    logger.error(err, "App exited with failure");
    process.exit(EXIT_STATUS.FAILURE);
  }
}
