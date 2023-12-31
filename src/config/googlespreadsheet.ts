import { GoogleSpreadsheet } from "google-spreadsheet";

async function getSpreadsheet() {
  const doc = new GoogleSpreadsheet(process.env.DOC_ID!, {
    apiKey: process.env.GOOGLE_API_KEY!,
  });
  await doc.loadInfo();
  console.log(`Access to the "${doc.title}" is open!`);
  return doc;
}

export default getSpreadsheet;
