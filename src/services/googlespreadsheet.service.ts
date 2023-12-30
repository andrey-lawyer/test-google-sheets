import { DeepPartial } from "typeorm";

import { PostgresDataSource } from "../config/database";
import getSpreadsheet from "../config/googlespreadsheet";

import Model from "../entities/Model";
import Product from "../entities/Product";
import Size from "../entities/Size";

import { sizeHeaders } from "../data/sizes.data";

async function fetchDataFromGoogleSheet() {
  try {
    const productRepository = PostgresDataSource.getRepository(Product);
    const modelRepository = PostgresDataSource.getRepository(Model);
    const sizeRepository = PostgresDataSource.getRepository(Size);

    const doc = await getSpreadsheet();

    for (const sheetName in doc.sheetsByIndex) {
      const sheet = doc.sheetsByIndex[sheetName];
      let model = await modelRepository.findOneBy({ modelName: sheet.title });
      if (!model) {
        model = await modelRepository.save({ modelName: sheet.title });
      }
      await sheet.loadCells("B4:Z18");
      for (let col = 1; col < sheet.columnCount; col++) {
        const productName = sheet.getCell(3, col).value;
        // console.log(productName);
        if (!productName) break;

        const price = sheet.getCell(4, col).value;
        const productCode = sheet.getCell(5, col).value as number;
        let existingProduct = await productRepository.findOneBy({
          productCode,
        });

        if (!existingProduct) {
          const product = { productName, price, productCode, model };
          existingProduct = await productRepository.save(
            product as DeepPartial<Product>
          );
        }

        for (let i = 0; i < sizeHeaders.length; i++) {
          const sizeValue = sheet.getCell(i + 7, col).value;

          let size = await sizeRepository.findOneBy({
            size: sizeHeaders[i],
            products: [existingProduct],
          });

          if (!size) {
            size = sizeRepository.create({
              size: sizeHeaders[i],
              available: sizeValue === "+",
              products: [existingProduct],
            });
          } else {
            size.available = sizeValue === "+";
          }

          await sizeRepository.save(size);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}
export default fetchDataFromGoogleSheet;
