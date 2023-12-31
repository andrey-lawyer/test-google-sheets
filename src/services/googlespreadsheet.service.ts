import { DeepPartial } from "typeorm";
import { PostgresDataSource } from "../config/database";
import getSpreadsheet from "../config/googlespreadsheet";

import Model from "../entities/Model";
import Product from "../entities/Product";
import Size from "../entities/Size";

import { sizeHeaders } from "../data/sizes.data";

// Function to fetch data from Google Sheet, update size data, and add new products to the database
async function fetchDataFromGoogleSheet() {
  try {
    // Get repositories for working with tables
    const productRepository = PostgresDataSource.getRepository(Product);
    const modelRepository = PostgresDataSource.getRepository(Model);
    const sizeRepository = PostgresDataSource.getRepository(Size);

    // Get data from the Google Sheet
    const doc = await getSpreadsheet();

    // Iterate through the sheets in the table
    for (const sheetName in doc.sheetsByIndex) {
      const sheet = doc.sheetsByIndex[sheetName];

      // Try to find a model in the database with the given modelName from the current sheet
      let model = await modelRepository.findOneBy({ modelName: sheet.title });
      // If the model does not exist in the database, create and save a new model with the modelName
      if (!model) {
        model = await modelRepository.save({ modelName: sheet.title });
      }

      // Load cells of the sheet
      await sheet.loadCells("B4:Z18");

      // Iterate through the columns of the table
      for (let col = 1; col < sheet.columnCount; col++) {
        // Get product data from the corresponding cells
        const productName = sheet.getCell(3, col).value;

        // If productName is not present, exit the loop as there are no more products in this column
        if (!productName) break;

        const price = sheet.getCell(4, col).value;
        const productCode = sheet.getCell(5, col).value as number;

        // Try to find a product in the database with the given productCode
        let existingProduct = await productRepository.findOneBy({
          productCode,
        });

        // If the product does not exist in the database, create and save a new product
        if (!existingProduct) {
          // If a new product, add it to the database
          const product = { productName, price, productCode, model };
          existingProduct = await productRepository.save(
            product as DeepPartial<Product>
          );
        }

        // Iterate through the sizes of the product
        for (let i = 0; i < sizeHeaders.length; i++) {
          // Get the value of the size from the corresponding cell in the sheet
          const sizeValue = sheet.getCell(i + 7, col).value;

          // Try to find a size in the database with the given size and associated product
          let size = await sizeRepository.findOneBy({
            size: sizeHeaders[i],
            products: [existingProduct],
          });

          // If the size does not exist, create and save a new size
          if (!size) {
            // If a new size, add it 
            size = sizeRepository.create({
              size: sizeHeaders[i],
              available: sizeValue === "+",
              products: [existingProduct],
            });
          } else {
            // If the size already exists, update its availability
            size.available = sizeValue === "+";
          }

          // Save changes in the size
          await sizeRepository.save(size);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export default fetchDataFromGoogleSheet;
