import { Response, Request, NextFunction } from "express";
import { PostgresDataSource } from "../config/database";
import Product from "../entities/Product";

export const isExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract productId from the request params and parse it
  const productId = parseInt(req.params.productId, 10);

  // Check if productId is not a number
  if (isNaN(productId)) {
    return res
      .status(400)
      .json({ error: "Invalid product ID", status: "error" });
  }

  // Get the product repository from the PostgresDataSource
  const productRepository = PostgresDataSource.getRepository(Product);

  // Find the product in the database by ID
  const product = await productRepository.findOneBy({ id: productId });

  // Check if the product exists
  if (product) {
    // If the product exists, proceed to the next middleware
    next();
  } else {
    // If the product does not exist, send a 400 Bad Request response
    res.status(400).json({ message: "Not found" });
  }
};
