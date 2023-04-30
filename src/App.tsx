import CryptoAssetList from "src/components/CryptoAssetList/CryptoAssetList";
import Header from "src/components/Header";
import PriceChangeRateTable from "src/components/PriceChangeRateTable/PriceChangeRateTable";
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
      {!isExtractMode && (
        <CryptoAssetList selected={selected} toggle={toggle} />
      )}
      <SelectedSymbolList
        symbols={selectedSymbols}
        toggle={toggle}
        isToggleAble={!isExtractMode}
      />
      <StopWatch handleStart={handleStart} handleReset={handleReset} />
      {isExtractMode && <PriceChangeRateTable symbols={selectedSymbols} />}
    </main>
  );
}

export default App;
