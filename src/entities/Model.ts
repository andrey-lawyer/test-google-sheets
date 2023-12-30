import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Product from "./Product";

@Entity()
class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelName: string;

  @OneToMany(() => Product, (product) => product.model)
  products: Product[];
}

export default Model;
