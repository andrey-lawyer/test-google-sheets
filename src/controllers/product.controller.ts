import { Response, Request } from "express";
import ProductService from "../services/product.service";

export class ProductController {
  constructor(private productService: ProductService) {}

  async getAllProduct(req: Request, res: Response) {
    const data = await this.productService.findAllProducts(req);
    res.status(200).json({ data, status: "success" });
  }

  async getOneProduct(req: Request, res: Response) {
    const productId = parseInt(req.params.productId, 10);
    const data = await this.productService.getOneProduct(productId);

    res.status(200).json({ data, status: "success" });
  }

  async updateProductName(req: Request, res: Response) {
    const productId = parseInt(req.params.productId, 10);
    const newName = req.body.newName;
    const category = req.body.category ?? "football";

    if (!newName) {
      return res
        .status(400)
        .json({ error: "New name is required", status: "error" });
    }

    const updatedProduct = await this.productService.updateProductName(
      productId,
      newName,
      category
    );

    res.status(200).json({ data: updatedProduct, status: "success" });
  }
}

const productController = new ProductController(new ProductService());
export default productController;
