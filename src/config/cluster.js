import cluster from "cluster";

import isDevEnvironment from "../utils/general/isDevEnvironment.js";
import logger from "./logger.js";
import startServer from "./server/startServer.js";

function runPrimaryProcess() {
  const processesCount = process.env.CPUS;

  for (let index = 0; index < processesCount; index += 1) cluster.fork();

  cluster.on("exit", (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      logger.error(`Worker ${worker.process.pid} exit`);
      cluster.fork();
    }
  });
}

export default function startClusterServerInProd() {
  if (isDevEnvironment) return startServer();

  return cluster.isPrimary ? runPrimaryProcess() : startServer();
}
