import { GoogleSpreadsheet } from "google-spreadsheet";

async function getSpreadsheet() {
  const doc = new GoogleSpreadsheet(process.env.DOC_ID!, {
    apiKey: process.env.GOOGLE_API_KEY!,
  });
  await doc.loadInfo();
  console.log(doc.title);
  return doc;
}

export default getSpreadsheet;
