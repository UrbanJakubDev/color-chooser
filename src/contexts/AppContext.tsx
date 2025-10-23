"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { LegacyColorCombination, LegacyVaseColor } from "../types";
import { useSession } from "next-auth/react";

interface AppContextType {
  selectedCombination: LegacyColorCombination | null;
  setSelectedCombination: (combination: LegacyColorCombination) => void;
  selectedProduct: "pot" | "vase";
  setSelectedProduct: (product: "pot" | "vase") => void;
  combinations: LegacyColorCombination[];
  setCombinations: (combinations: LegacyColorCombination[]) => void;
  selectedVaseColor: LegacyVaseColor | null;
  setSelectedVaseColor: (color: LegacyVaseColor) => void;
  potColors: any[];
  vaseColors: LegacyVaseColor[];
  setVaseColors: (colors: LegacyVaseColor[]) => void;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const { data: session, status } = useSession();
  const [selectedCombination, setSelectedCombination] =
    useState<LegacyColorCombination | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<"pot" | "vase">("pot");
  const [combinations, setCombinations] = useState<LegacyColorCombination[]>(
    []
  );
  const [selectedVaseColor, setSelectedVaseColor] =
    useState<LegacyVaseColor | null>(null);
  const [potColors, setPotColors] = useState<any[]>([]);
  const [vaseColors, setVaseColors] = useState<LegacyVaseColor[]>([]);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!session;
  const isAdmin = (session?.user as any)?.role === "admin";

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
    isAuthenticated,
    isAdmin,
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
