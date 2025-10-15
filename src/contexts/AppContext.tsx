import React, { createContext, useContext, useState, ReactNode } from "react";
import { ColorCombination } from "../App";

interface VaseColor {
  id: string;
  name: string;
  hex: string;
  rgb: [number, number, number];
  description: string;
}

interface AppContextType {
  selectedCombination: ColorCombination;
  setSelectedCombination: (combination: ColorCombination) => void;
  selectedProduct: "pot" | "vase";
  setSelectedProduct: (product: "pot" | "vase") => void;
  combinations: ColorCombination[];
  setCombinations: (combinations: ColorCombination[]) => void;
  selectedVaseColor: VaseColor;
  setSelectedVaseColor: (color: VaseColor) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
  initialCombinations: ColorCombination[];
}

export function AppProvider({
  children,
  initialCombinations,
}: AppProviderProps) {
  const [combinations, setCombinations] =
    useState<ColorCombination[]>(initialCombinations);
  const [selectedCombination, setSelectedCombination] =
    useState<ColorCombination>(initialCombinations[0]);
  const [selectedProduct, setSelectedProduct] = useState<"pot" | "vase">("pot");

  // Výchozí barva vázy
  const initialVaseColor: VaseColor = {
    id: "1",
    name: "Klasická Bílá",
    hex: "#FFFFFF",
    rgb: [255, 255, 255],
    description: "Čistá bílá pro minimalistický vzhled",
  };
  const [selectedVaseColor, setSelectedVaseColor] =
    useState<VaseColor>(initialVaseColor);

  const value: AppContextType = {
    selectedCombination,
    setSelectedCombination,
    selectedProduct,
    setSelectedProduct,
    combinations,
    setCombinations,
    selectedVaseColor,
    setSelectedVaseColor,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
