import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export default class IsValidate {
  // Validate the request against the provided schema
  validateRequest = async (
    schema: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Use Joi to validate the request body
      await schema.validateAsync(req.body);
      next();
    } catch (error: any) {
      // If validation fails, send a 400 Bad Request response with the error message
      return res.status(400).json({ message: error.details[0].message });
    }
  };

  // Validation schema for updating a product
  updateProductValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const schema = Joi.object({
      newName: Joi.string().min(3).max(40).required(), // Make newName required
      category: Joi.string().min(3).max(20).optional(), // Make category optional
    });

    // Use the common validation function to validate the request
    await this.validateRequest(schema, req, res, next);
  };
}
