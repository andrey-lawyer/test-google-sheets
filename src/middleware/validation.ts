import { Request, Response, NextFunction } from "express";

import Joi from "joi";

export default class IsValidate {
  validateRequest = async (
    schema: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error: any) {
      return res.status(400).json({ message: error.details[0].message });
    }
  };

  updateTodoValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const schema = Joi.object({
      newName: Joi.string().min(3).max(40).required(),
      category: Joi.string().min(3).max(20).optional(),
    });
    await this.validateRequest(schema, req, res, next);
  };
}
