import { DocumentSnapshot } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDocsData } from "../../functions/Firebase.prod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "GET":
      return getAllData();
    case "POST":
      return resolvePostQuery();

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
      return res.status(400).send("Bad request");
    }
  }
  async function getNextData(lastDoc: DocumentSnapshot) {
    const data = await getDocsData(true, lastDoc);
    return res.status(200).send(JSON.stringify({ data }));
  }
}
