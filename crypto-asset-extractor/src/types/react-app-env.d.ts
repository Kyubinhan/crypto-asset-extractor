/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    PUBLIC_URL: string;
    REACT_APP_CMC_URL: string;
    REACT_APP_CMC_API_KEY: string;
  }
}
