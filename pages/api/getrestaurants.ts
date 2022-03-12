import { DocumentSnapshot } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  addCategoryToDB,
  getDocsData,
  updateToDB,
} from "../../functions/Firebase.prod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "GET":
      return getAllData();
    case "POST":
      return resolvePostQuery();
    case "PUT":
      return upadteRestoData();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getAllData() {
    const data = await getDocsData();
    return res.status(200).send(JSON.stringify({ data }));
  }
  async function resolvePostQuery() {
    const { lastDoc, name } = JSON.parse(req.body);
    if (lastDoc) {
      return await getNextData(lastDoc);
    } else {
      const flag = await addCategoryToDB(name);
      return res.status(200).send(JSON.stringify({ flag }));
    }
  }
  async function getNextData(lastDoc: DocumentSnapshot) {
    const data = await getDocsData(true, lastDoc);
    return res.status(200).send(JSON.stringify({ data }));
  }
  function upadteRestoData() {
    const { selectedresto, selectedCategory } = JSON.parse(req.body);
    updateToDB(selectedresto, selectedCategory);
    return res.status(200).send("Updated category");
  }
}
