import { Request } from "express";
import { SelectQueryBuilder } from "typeorm";

import { PostgresDataSource } from "../config/database";
import Product from "../entities/Product";

export default class ProductService {
  // Access the product repository from the Postgres data source
  private productRepository = PostgresDataSource.getRepository(Product);

  // Find products based on query parameters (size, code) or without them
  async findAllProducts(req: Request) {
    const size = req.query.size;
    const code = req.query.code;

    // Build a query to fetch products with specified criteria
    const queryBuilder: SelectQueryBuilder<Product> = this.productRepository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.sizes", "size")
      .leftJoinAndSelect("product.model", "model");

    // Add conditions to the query based on size and code parameters
    if (size) {
      queryBuilder
        .andWhere("size.size = :size", { size })
        .andWhere("size.available = true");
    }
    if (code) {
      queryBuilder.andWhere("product.productCode = :code", { code });
    }

    // Execute the query and return the result
    return await queryBuilder.getMany();
  }

  // Retrieve details of a single product based on the provided product ID, and optionally filter by size
  async getOneProduct(productId: number, size?: string) {
    // Define relations to be loaded along with the product
    const relations = ["sizes", "model"];

    // Build a query to fetch a single product with specified criteria
    const queryBuilder: SelectQueryBuilder<Product> = this.productRepository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.sizes", "size")
      .leftJoinAndSelect("product.model", "model")
      .where("product.id = :productId", { productId });

    // Add conditions to the query based on the optional size parameter
    if (size) {
      queryBuilder
        .andWhere("size.size = :size", { size })
        .andWhere("size.available = true");

      // Include "sizes" relation in the result if size is specified
      relations.push("sizes");
    }

    // Execute the query and return the result
    return await queryBuilder.getOne();
  }

  // Update the name and category of a product based on ID
  async updateProductName(
    productId: number,
    newName: string,
    category?: string // Category is optional
  ) {
    // Find the product in the database based on ID
    const product = (await this.productRepository.findOneBy({
      id: productId,
    })) as Product;

    // Update the product's name
    product.productName = newName;

    // Update the product's category if provided
    if (category) product.category = category;

    // Save the changes to the database
    return await this.productRepository.save(product);
  }
}
