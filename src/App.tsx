import CryptoAssetList from "src/components/CryptoAssetList/CryptoAssetList";
import Header from "src/components/Header";
import SelectedSymbolList from "src/components/SelectedSymbolList/SelectedSymbolList";
import StopWatch from "src/components/StopWatch/StopWatch";
import TopBar from "src/components/TapBar";
import {
  getSelectedSymbols,
  useExtractQueryParam,
  useSelectedSymbolStore,
} from "src/hooks";

function App() {
  const { extract, setExtractQueryParam } = useExtractQueryParam();
  const { selected, toggle, reset } = useSelectedSymbolStore();

  const selectedSymbols = getSelectedSymbols(selected);
  const isExtractMode = Boolean(extract);

  const handleStart = () => {
    setExtractQueryParam(selectedSymbols.join(","));
  };
  const handleReset = () => {
    setExtractQueryParam("");
    reset();
  };

  return (
    <main>
      <TopBar />
      <Header />
      <CryptoAssetList selected={selected} toggle={toggle} />
      <SelectedSymbolList
        symbols={selectedSymbols}
        toggle={toggle}
        isToggleAble={!isExtractMode}
      />
      <StopWatch handleStart={handleStart} handleReset={handleReset} />
    </main>
  );
}

export default App;
