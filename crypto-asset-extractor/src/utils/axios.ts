import axios from "axios";

console.log(process.env);

const instance = axios.create({
  baseURL: process.env.REACT_APP_CMC_BASE_URL,
  headers: { "X-CMC_PRO_API_KEY": process.env.REACT_APP_CMC_API_KEY },
});

export default instance;
