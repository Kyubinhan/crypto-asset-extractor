import { QueryClient, QueryClientProvider } from "react-query";
import CryptoAssetList from "src/components/CryptoAssetList/CryptoAssetList";

import Header from "src/components/Header";
import TopBar from "src/components/TapBar";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TopBar />
      <Header />
      <CryptoAssetList />
    </QueryClientProvider>
  );
}

export default App;
