import { Router } from "express";

import { tryCatch } from "../middleware/tryCatch";
import { isExist } from "../middleware/isExist";
import IsValidate from "../middleware/validation";

import productController from "../controllers/product.controller";

const productsRouter: Router = Router();
const isValidate = new IsValidate();

productsRouter.get(
  "/",

  tryCatch(productController.getAllProduct.bind(productController))
);

productsRouter.get(
  "/:productId",
  isExist,
  tryCatch(productController.getOneProduct.bind(productController))
);

productsRouter.patch(
  "/:productId",
  isValidate.updateTodoValidation,
  isExist,
  tryCatch(productController.updateProductName.bind(productController))
);

export default productsRouter;
