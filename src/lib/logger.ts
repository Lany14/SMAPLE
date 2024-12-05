import pino from "pino";

const logger = pino({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export function logError(error: Error, context?: any) {
  try {
    logger.error({
      err: {
        message: error.message,
        stack: error.stack,
      },
      ...context,
    });
  } catch (err) {
    console.error(error, context);
  }
}

export function logInfo(message: string, context?: any) {
  try {
    logger.info({ msg: message, ...context });
  } catch (err) {
    console.log(message, context);
  }
}
