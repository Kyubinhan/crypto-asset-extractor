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
      res.status(400).json({
        name: err.name,
        message: err.message,
      });
    });
}

// export default async (req, res) => {
//   const url = `https://swapi.dev/api/people/1`

//   await axios
//     .get(url)
//     .then(({ data }) => {
//       res.status(200).json({ data })
//     })
//     .catch(({ err }) => {
//       res.status(400).json({ err })
//     })
// }

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// export default function handler(req, res) {
//   const getData = async () => {
//     const response = await fetch(
//       `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${process.env.NEXT_BACKEND_CMC_API_KEY}`,
//       {
//         method: 'GET',
//         headers: {
//           Accept: '*/*',
//         },
//       },
//     )

//     const data = await response.json()

//     res.status(200).json({ data })
//   }

//   getData()
// }
