import CryptoAssetList from "src/components/CryptoAssetList/CryptoAssetList";

import Header from "src/components/Header";
import TopBar from "src/components/TapBar";

function App() {
  return (
    <main>
      <TopBar />
      <Header />
      <CryptoAssetList />
    </main>
  );
}

export default App;
