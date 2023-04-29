import { create } from "zustand";

interface State {
  selected: Record<string, boolean>;
  toggle: (symbol: string) => void;
}

export const useSelectedSymbolStore = create<State>()((set) => ({
  selected: {},
  toggle: (symbol) =>
    set((state) => {
      const prev = Boolean(state.selected[symbol]);

      return {
        selected: { ...state.selected, [symbol]: !prev },
      };
    }),
}));
