import { Request } from "express";
import { SelectQueryBuilder } from "typeorm";

import { PostgresDataSource } from "../config/database";
import Product from "../entities/Product";

export default class ProductService {
  private productRepository = PostgresDataSource.getRepository(Product);

  async findAllProducts(req: Request) {
    const { size, code } = req.query;

    const queryBuilder: SelectQueryBuilder<Product> = this.productRepository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.sizes", "size")
      .leftJoinAndSelect("product.model", "model");
    if (size) {
      queryBuilder
        .andWhere("size.size = :size", { size })
        .andWhere("size.available = true");
    }
    if (code) {
      queryBuilder.andWhere("product.productCode = :code", { code });
    }

    return await queryBuilder.getMany();
  }

  async getOneProduct(productId: number, size?: string) {
    const relations = ["sizes", "model"];
    const queryBuilder: SelectQueryBuilder<Product> = this.productRepository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.sizes", "size")
      .leftJoinAndSelect("product.model", "model")
      .where("product.id = :productId", { productId });

    if (size) {
      queryBuilder
        .andWhere("size.size = :size", { size })
        .andWhere("size.available = true");

      relations.push("sizes");
    }

    return await queryBuilder.getOne();
  }

  async updateProductName(
    productId: number,
    newName: string,
    category: string
  ) {
    const product = (await this.productRepository.findOneBy({
      id: productId,
    })) as Product;
    product.productName = newName;
    product.category = category;
    return await this.productRepository.save(product);
  }
}
