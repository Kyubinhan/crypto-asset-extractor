import { useRouter } from "next/router";

export const useExtractQueryParam = () => {
  const router = useRouter();

  const { extract } = router.query;
  const setExtractQueryParam = (extract: string) => {
    router.replace({
      query: { ...router.query, extract },
    });
  };

  return {
    extract,
    setExtractQueryParam,
  };
};
