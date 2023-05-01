import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { endpoint, ...params } = req.query;
  const url = `https://pro-api.coinmarketcap.com/${endpoint}`;

  return axios
    .get(url, {
      headers: {
        Accept: "application/json",
        "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
      },
      params,
    })
    .then(({ data }) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      if (process.env.NODE_ENV === "development") {
        res.status(400).json(err);
      }

      res.status(400).json({
        name: err.name,
        message: err.message,
      });
    });
}
