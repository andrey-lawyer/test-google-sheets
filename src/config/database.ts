import { DataSource } from "typeorm";

import Product from "../entities/Product";
import Size from "../entities/Size";
import Model from "../entities/Model";
import fetchDataFromGoogleSheet from "../services/googlespreadsheet.service";

// Create a new DataSource instance for PostgreSQL
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

// Function to connect to the PostgreSQL database
const connectDB = async () => {
  try {
    // Initialize the DataSource and connect to the database
    await PostgresDataSource.initialize();
    console.log("Data Source has been initialized!");

    // Fetch data from the Google Sheet on application startup
    fetchDataFromGoogleSheet();

    // Set up an interval to fetch data from the Google Sheet every hour (3600000 milliseconds)
    setInterval(() => {
      fetchDataFromGoogleSheet();
    }, 3600000);
  } catch (err) {
    // Handle errors during DataSource initialization
    console.error("Error during Data Source initialization", err);
  }
};

export default connectDB;
