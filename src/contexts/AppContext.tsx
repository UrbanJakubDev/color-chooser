"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ColorCombination, VaseColor } from "@/types";

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
    // For now, use mock data until API routes are implemented
    const mockCombinations: ColorCombination[] = [
      {
        id: "1",
        miska: "Mramorová",
        telo: "Hluboká Tmavě Zelená (Jedlová)",
        hexMiska: "#D3D3D3",
        hexTelo: "#003E33",
        rgbMiska: [211, 211, 211],
        rgbTelo: [0, 62, 51],
        tema: "Elegance Lesa",
      },
      {
        id: "2",
        miska: "Mramorová",
        telo: "Spálená Oranžová / Terakota",
        hexMiska: "#D3D3D3",
        hexTelo: "#CC5500",
        rgbMiska: [211, 211, 211],
        rgbTelo: [204, 85, 0],
        tema: "Klasický Podzim",
      },
    ];

    const mockVaseColors: VaseColor[] = [
      {
        id: "1",
        name: "Klasická Bílá",
        hex: "#FFFFFF",
        rgb: [255, 255, 255],
        description: "Čistá bílá pro minimalistický vzhled",
      },
      {
        id: "2",
        name: "Elegantní Černá",
        hex: "#2C2C2C",
        rgb: [44, 44, 44],
        description: "Hluboká černá pro moderní design",
      },
    ];

    setCombinations(mockCombinations);
    setVaseColors(mockVaseColors);

    if (mockCombinations.length > 0) {
      setSelectedCombination(mockCombinations[0]);
    }
    if (mockVaseColors.length > 0) {
      setSelectedVaseColor(mockVaseColors[0]);
    }

    setLoading(false);
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
