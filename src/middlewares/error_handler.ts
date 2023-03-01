import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { CustomError } from "../errors";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  if (err instanceof ZodError) {
    const errors = err.errors.map(({ message }) => ({ message }));

    return res.status(400).send({ errors });
  }

  res.status(500).send({ errors: [{ message: "Something went wrong!" }] });
};
