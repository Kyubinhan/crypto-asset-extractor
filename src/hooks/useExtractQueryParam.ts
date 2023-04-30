import { useSearchParams } from "react-router-dom";

export const useExtractQueryParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setExtractQueryParam = (extract: string) => {
    setSearchParams({ extract });
  };
  const extract = searchParams.get("extract");

  return {
    extract,
    setExtractQueryParam,
  };
};
