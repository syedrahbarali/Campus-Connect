import { Request, Response, NextFunction } from "express";

export const test = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("test middleware");
  next();
};
