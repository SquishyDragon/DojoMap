"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type TechniqueSelection = {
  techniqueId: string;
  rankId: string;
};

type TechniqueSelectionContextValue = {
  selection: TechniqueSelection | null;
  selectTechnique: (
    selection: TechniqueSelection,
    returnFocusTarget?: HTMLElement,
  ) => void;
  clearTechnique: () => void;
};

const TechniqueSelectionContext =
  createContext<TechniqueSelectionContextValue | null>(null);

export function TechniqueSelectionProvider({
  children,
}: {
  children: ReactNode;
}) {
  // This provider is the sole owner of technique selection for the journey.
  const [selection, setSelection] = useState<TechniqueSelection | null>(null);
  const returnFocusTarget = useRef<HTMLElement | null>(null);
  const selectTechnique = useCallback(
    (nextSelection: TechniqueSelection, nextReturnFocusTarget?: HTMLElement) => {
      returnFocusTarget.current = nextReturnFocusTarget ?? null;
      setSelection(nextSelection);
    },
    [],
  );
  const clearTechnique = useCallback(() => {
    setSelection(null);
    returnFocusTarget.current?.focus({ preventScroll: true });
    returnFocusTarget.current = null;
  }, []);
  const value = useMemo(
    () => ({ selection, selectTechnique, clearTechnique }),
    [selection, selectTechnique, clearTechnique],
  );

  return (
    <TechniqueSelectionContext.Provider value={value}>
      {children}
    </TechniqueSelectionContext.Provider>
  );
}

export function useTechniqueSelection() {
  const context = useContext(TechniqueSelectionContext);

  if (!context) {
    throw new Error(
      "useTechniqueSelection must be used within TechniqueSelectionProvider",
    );
  }

  return context;
}
