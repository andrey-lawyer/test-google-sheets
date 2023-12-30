import { Response, Request, NextFunction } from "express";
import { PostgresDataSource } from "../config/database";
import Product from "../entities/Product";

export const isExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = parseInt(req.params.productId, 10);
  if (isNaN(productId)) {
    return res
      .status(400)
      .json({ error: "Invalid product ID", status: "error" });
  }
  const productRepository = PostgresDataSource.getRepository(Product);
  const product = await productRepository.findOneBy({ id: productId });
  if (product) {
    next();
  } else {
    res.status(400).json({ message: "Not found" });
  }
};
