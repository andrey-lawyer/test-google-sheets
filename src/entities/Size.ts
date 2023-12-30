import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import Product from "./Product";

@Entity()
class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string;

  @Column({ default: false })
  available: boolean;

  @ManyToMany(() => Product, (product) => product.sizes)
  products: Product[];
}

export default Size;
