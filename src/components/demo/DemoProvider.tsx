"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { DemoModal } from "./DemoModal";

interface DemoContextValue {
  isOpen: boolean;
  /** `source` is carried into the form so enquiries can be attributed to a page. */
  openDemo: (source?: string) => void;
  closeDemo: () => void;
  source: string;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("Website");

  const openDemo = useCallback((nextSource?: string) => {
    if (nextSource) setSource(nextSource);
    setIsOpen(true);
  }, []);

  const closeDemo = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openDemo, closeDemo, source }),
    [isOpen, openDemo, closeDemo, source],
  );

  return (
    <DemoContext.Provider value={value}>
      {children}
      <DemoModal open={isOpen} source={source} onClose={closeDemo} />
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used inside <DemoProvider>");
  return context;
}
