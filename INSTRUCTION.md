# Coin Rate Service

Please, create a service that can inquire the rate of selected coins.

## Description

https://coinmarketcap.com/api/

The above web site provides real-time/past exchange rate of cryptocurrencies. Use this site to provide current coin rate of currencies listed on the website.
Refer to this figma page for the publishing: https://www.figma.com/file/xGHOofWCHAeihS7WP5xywD/%5BFront%5D-Challenge?node-id=1551%3A7444

## Requirements

- Code management: please use this repository and push codes with commit logs.
- Program language: please use Javascript or Typescript with React JS or React Native.
- Please provide `README.md` file to describe `how-to-use`. The submission should be demo-able.
- Retrieve top 100 coins from CoinMarketCap (CMC) and show them on the page with pagination (Look at figma).
- When a user selects a coin, checkmark should be checked and selected coins should be shown below the coin list.
- When a checkbox is unchecked or `x` is clicked on the selected coin list, the coin should be removed from the selected coin list.
- When `start` button is clicked the actions should be executed:
  - Stop watch should start and a user should be able to see the time elapse.
  - Proceed to the next page on the figma page.
  - Send a reqeust to CMC to retrieve rates of selected coins.
  - Mark the request time (refer to the figma page).
- When it receives a response from CMC, show the price with 24h / 7d price changes on the table in the result page. Also, mark the response time on the result page.
- The price and 24h / 7d price changes should be refreshed every 5 seconds. Request / response time should be updates accordingly.
- When `Reset` button is clicked, stop watch should stop. The price update should stop as well.
- Use a free API key. You do not have to purchase a paid one.
- Use the style guide on the figma page.
