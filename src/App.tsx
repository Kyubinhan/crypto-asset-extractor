import CryptoAssetList from "src/components/CryptoAssetList/CryptoAssetList";

import Header from "src/components/Header";
import SelectedSymbolList from "src/components/SelectedSymbolList/SelectedSymbolList";
import TopBar from "src/components/TapBar";

function App() {
  return (
    <main>
      <TopBar />
      <Header />
      <CryptoAssetList />
      <SelectedSymbolList mode="edit" />
    </main>
  );
}

export default App;
