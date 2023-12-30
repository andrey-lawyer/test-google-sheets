import { DataSource } from "typeorm";

import Product from "../entities/Product";
import Size from "../entities/Size";
import Model from "../entities/Model";
import fetchDataFromGoogleSheet from "../services/googlespreadsheet.service";

// import Todo from "../entities/Todo";

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT_DB) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: [Product, Model, Size],
});

const connectDB = async () => {
  try {
    await PostgresDataSource.initialize();
    console.log("Data Source has been initialized!");
    fetchDataFromGoogleSheet();
    setInterval(() => {
      fetchDataFromGoogleSheet();
    }, 3600000);
  } catch (err) {
    console.error("Error during Data Source initialization", err);
  }
};

export default connectDB;
