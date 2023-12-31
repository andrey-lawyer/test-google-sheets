import { Response, Request } from "express";
import ProductService from "../services/product.service";

export class ProductController {
  constructor(private productService: ProductService) {}

  // Controller method to get all products based on query parameters
  async getAllProduct(req: Request, res: Response) {
    const data = await this.productService.findAllProducts(req);
    res.status(200).json({ data, status: "success" });
  }

  // Controller method to get details of a single product based on ID and optional size
  async getOneProduct(req: Request, res: Response) {
    const productId = parseInt(req.params.productId, 10);
    const size = req.query.size as string | undefined;
    const data = await this.productService.getOneProduct(productId, size);

    res.status(200).json({ data, status: "success" });
  }

  // Controller method to update the product name
  async updateProductName(req: Request, res: Response) {
    const productId = parseInt(req.params.productId, 10);
    const newName = req.body.newName as string;
    const category = (req.body.category as string) || undefined;

    // Update the product name and, optionally, the category
    const updatedProduct = await this.productService.updateProductName(
      productId,
      newName,
      category
    );

    res.status(200).json({ data: updatedProduct, status: "success" });
  }
}

// Create an instance of ProductController
const productController = new ProductController(new ProductService());
export default productController;
