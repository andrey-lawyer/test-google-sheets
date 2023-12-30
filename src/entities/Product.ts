import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Size from "./Size";
import Model from "./Model";

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  price: number;

  @Column()
  productCode: number;

  @Column({ default: "football", nullable: true })
  category: string;

  @ManyToOne(() => Model, (model) => model.products)
  model: Model;

  @ManyToMany(() => Size, (size) => size.products)
  @JoinTable()
  sizes: Size[];
}

export default Product;
