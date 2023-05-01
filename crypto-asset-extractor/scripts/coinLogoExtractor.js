const fs = require("fs");

const CMC_API_KEY = "";
if (!CMC_API_KEY) {
  throw new Error("CoinMarketCap API key is required!");
}

const headers = {
  "Content-Type": "application/json",
  "X-CMC_PRO_API_KEY": CMC_API_KEY,
};

/**
 *  * Group elements in an array by given size
 *
 * const arr = [1, 2, 3, 4, 5]
 * groupBy(arr, 3) // [[1, 2 ,3], [4, 5]]
 *
 * @param {any[]} arr
 * @param {number} size
 * @returns
 */
function groupBy(arr, size) {
  const result = [];

  let count = 0;
  while (count < arr.length) {
    result.push(arr.slice(count, count + size));
    count += size;
  }

  return result;
}

/**
 *
 * @param {Object[]} coins
 * @returns Array
 */
async function fetchLogos(coins) {
  const symbols = coins.map((d) => d.symbol).join(",");

  console.log(`Fetching ${coins.length} logos`);
  const logoUrl = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbols}&aux=logo&skip_invalid=true`;
  const logosResponse = await fetch(logoUrl, {
    method: "GET",
    headers,
  });
  const { data } = await logosResponse.json();

  return data;
}

/**
 *
 * @param {Object[]} coins
 * @returns Object
 */
async function fetchAllLogos(coins) {
  const logoLimit = 100; // set by CMC
  const groupedCoins = groupBy(coins, logoLimit);

  const results = await Promise.all(
    groupedCoins.map((coins) => fetchLogos(coins))
  );

  return results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
}

/**
 *
 * Fetch top ranking coin logo URLs and store it in a json file
 * Next.js will serve it as a static data through its API
 *
 * @param {number} numOfCoins
 * @param {string} path
 */
async function storeLogosMap(numOfCoins, path) {
  console.log(`Fetching top ${numOfCoins} coins`);
  const coinRankingUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?listing_status=active&sort=cmc_rank&limit=${numOfCoins}`;
  const rankingsResponse = await fetch(coinRankingUrl, {
    method: "GET",
    headers,
  });
  const { data: coins } = await rankingsResponse.json();

  const logosInObj = await fetchAllLogos(coins);

  const logoMap = {};
  Object.entries(logosInObj).map(([symbol, data]) => {
    if (data.length > 0) {
      logoMap[symbol] = data[0].logo;
    }
  });

  fs.writeFileSync(path, JSON.stringify(logoMap));
  console.log(`Saving the logo map to file system '${path}'`);
}

try {
  storeLogosMap(200, "json/logoMap.json");
} catch (err) {
  console.error(err);
}
