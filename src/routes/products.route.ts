import { Router } from "express";

import { tryCatch } from "../middleware/tryCatch";
import { isExist } from "../middleware/isExist";
import IsValidate from "../middleware/validation";

import productController from "../controllers/product.controller";

// Create an instance of Express Router
const productsRouter: Router = Router();

// Create an instance of IsValidate middleware for validation checks
const isValidate = new IsValidate();

// Route: Get all products
productsRouter.get(
  "/",
  tryCatch(productController.getAllProduct.bind(productController))
);

// Route: Get a single product by productId
productsRouter.get(
  "/:productId",
  isExist, // Middleware to check if the product exists
  tryCatch(productController.getOneProduct.bind(productController))
);

// Route: Update a product by productId
productsRouter.patch(
  "/:productId",
  isValidate.updateProductValidation, // Middleware to validate update request
  isExist, // Middleware to check if the product exists
  tryCatch(productController.updateProductName.bind(productController))
);

// Export the productsRouter for use in other parts of the application
export default productsRouter;
