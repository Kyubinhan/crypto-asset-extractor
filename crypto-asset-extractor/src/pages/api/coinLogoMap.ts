import { promises as fs } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "json");

  // Read the json data file data.json
  const fileContents = await fs.readFile(
    jsonDirectory + "/logoMap.json",
    "utf8"
  );

  // Return the content of the data file in json format
  res.status(200).json(JSON.parse(fileContents));
}
