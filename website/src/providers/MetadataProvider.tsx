"use client";
import { createContext, useContext } from "react";

type MetadataType = any;

const MetadataContext = createContext<MetadataType | null>(null);

export function MetadataProvider({
  value,
  children,
}: {
  value: MetadataType;
  children: React.ReactNode;
}) {
  return (
    <MetadataContext.Provider value={value}>
      {children}
    </MetadataContext.Provider>
  );
}

export function useMetadata() {
  return useContext(MetadataContext);
}
