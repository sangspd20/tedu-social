import { HttpException } from "@core/exceptions";
import { Logger } from "@core/utils";
import { NextFunction, Request, Response } from "express";

const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status: number = err.status || 500;
  const message: string = err.message || "Internal Server Error";

  res.status(status).json({
    status: "error",
    statusCode: status,
    message,
  });
  Logger.error(`Error: ${message} - ${status}`);
};

export default errorMiddleware;
