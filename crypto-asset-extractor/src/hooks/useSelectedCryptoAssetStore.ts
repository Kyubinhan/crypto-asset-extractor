import { create } from "zustand";

export interface SelectedSymbolState {
  selected: Record<string, boolean>;
  toggle: (symbol: string) => void;
  reset: () => void;
}

export const useSelectedSymbolStore = create<SelectedSymbolState>()((set) => ({
  selected: {},
  toggle: (symbol) =>
    set((state) => {
      const prev = Boolean(state.selected[symbol]);

      return {
        selected: { ...state.selected, [symbol]: !prev },
      };
    }),
  reset: () =>
    set({
      selected: {},
    }),
}));

export const getSelectedSymbols = (selected: SelectedSymbolState["selected"]) =>
  Object.entries(selected)
    .filter(([_, checked]) => checked)
    .map(([symbol]) => symbol);
