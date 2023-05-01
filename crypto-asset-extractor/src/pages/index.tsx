import { Inter } from "next/font/google";
import Head from "next/head";
import { useState } from "react";

import CoinCardListView from "src/components/CoinCardListView";
import Header from "src/components/Header";
import PriceChangeRateTable from "src/components/PriceChangeRateTable";
import SelectedSymbolList from "src/components/SelectedSymbolList";
import StopWatch from "src/components/StopWatch";
import TopBar from "src/components/TopBar";
import { getSelectedSymbols, useSelectedSymbolStore } from "src/hooks";

import styles from "src/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
    <>
      <Head>
        <title>Crypto asset extractor</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
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
        {isExtractMode && <PriceChangeRateTable symbols={selectedSymbols} />}
      </main>
    </>
  );
}
