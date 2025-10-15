"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ColorCombination, VaseColor } from "../types";

interface AppContextType {
  selectedCombination: ColorCombination | null;
  setSelectedCombination: (combination: ColorCombination) => void;
  selectedProduct: "pot" | "vase";
  setSelectedProduct: (product: "pot" | "vase") => void;
  combinations: ColorCombination[];
  setCombinations: (combinations: ColorCombination[]) => void;
  selectedVaseColor: VaseColor | null;
  setSelectedVaseColor: (color: VaseColor) => void;
  potColors: any[];
  vaseColors: VaseColor[];
  setVaseColors: (colors: VaseColor[]) => void;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [selectedCombination, setSelectedCombination] =
    useState<ColorCombination | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<"pot" | "vase">("pot");
  const [combinations, setCombinations] = useState<ColorCombination[]>([]);
  const [selectedVaseColor, setSelectedVaseColor] = useState<VaseColor | null>(
    null
  );
  const [potColors, setPotColors] = useState<any[]>([]);
  const [vaseColors, setVaseColors] = useState<VaseColor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Načíst kombinace barev
        const combinationsResponse = await fetch("/api/combinations");
        if (combinationsResponse.ok) {
          const combinationsData = await combinationsResponse.json();
          setCombinations(combinationsData);
          if (combinationsData.length > 0) {
            setSelectedCombination(combinationsData[0]);
          }
        }

        // Načíst barvy váží
        const vaseColorsResponse = await fetch("/api/vase-colors");
        if (vaseColorsResponse.ok) {
          const vaseColorsData = await vaseColorsResponse.json();
          setVaseColors(vaseColorsData);
          if (vaseColorsData.length > 0) {
            setSelectedVaseColor(vaseColorsData[0]);
          }
        }

        // Načíst barvy palety
        const paletteColorsResponse = await fetch("/api/palette-colors");
        if (paletteColorsResponse.ok) {
          const paletteColorsData = await paletteColorsResponse.json();
          // Palette colors se používají v komponentách přímo, takže je uložíme do localStorage pro rychlý přístup
          localStorage.setItem(
            "paletteColors",
            JSON.stringify(paletteColorsData)
          );
        }
      } catch (error) {
        console.error("Error loading data:", error);
        // Fallback na prázdné pole v případě chyby
        setCombinations([]);
        setVaseColors([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const value: AppContextType = {
    selectedCombination,
    setSelectedCombination,
    selectedProduct,
    setSelectedProduct,
    combinations,
    setCombinations,
    selectedVaseColor,
    setSelectedVaseColor,
    potColors,
    vaseColors,
    setVaseColors,
    loading,
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
