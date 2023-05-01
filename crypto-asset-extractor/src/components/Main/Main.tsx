import { Inter } from "next/font/google";
import { useState } from "react";

import CoinCardListView from "src/components/CoinCardListView";
import CoinPriceQuoteTable from "src/components/CoinPriceQuoteTable";
import Header from "src/components/Header";
import SelectedSymbolList from "src/components/SelectedSymbolList";
import StopWatch from "src/components/StopWatch";
import TopBar from "src/components/TopBar";
import { getSelectedSymbols, useSelectedSymbolStore } from "src/hooks";

import S from "./style.module.scss";

const inter = Inter({ subsets: ["latin"] });

const Main: React.FC = () => {
  const { selected, toggle, reset } = useSelectedSymbolStore();
  const [isExtractMode, setExtractMode] = useState(false);

  const selectedSymbols = getSelectedSymbols(selected);

  const handleStart = () => {
    setExtractMode(true);
  };
  const handleReset = () => {
    setExtractMode(false);
    reset();
  };

  return (
    <main className={`${S.main} ${inter.className}`}>
      <TopBar />
      <Header />
      <CoinCardListView
        selected={selected}
        toggle={toggle}
        hidden={isExtractMode}
      />
      {selectedSymbols.length > 0 && (
        <>
          <SelectedSymbolList
            symbols={selectedSymbols}
            toggle={toggle}
            canUnselect={!isExtractMode}
          />
          <StopWatch handleStart={handleStart} handleReset={handleReset} />
        </>
      )}
      {isExtractMode && <CoinPriceQuoteTable symbols={selectedSymbols} />}
    </main>
  );
};

export default Main;
