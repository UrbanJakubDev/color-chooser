import React, { useState, useEffect } from "react";
import "./App.css";
import ColourPallete from "./components/ColourPallete";
import CombinationList from "./components/CombinationList";
import VaseColorList from "./components/VaseColorList";
import ProductSwitch from "./components/ProductSwitch";
import DisplayCard from "./components/DisplayCard";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import ChangeColorsButton from "./components/ChangeColorsButton";

export interface ColorCombination {
  id: string;
  miska: string;
  telo: string;
  hexMiska: string;
  hexTelo: string;
  rgbMiska: [number, number, number];
  rgbTelo: [number, number, number];
  tema: string;
}

const initialCombinations: ColorCombination[] = [
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
  {
    id: "3",
    miska: "Třpytivá Hnědá",
    telo: "Krémová / Světle Béžová",
    hexMiska: "#694931",
    hexTelo: "#F5F5DC",
    rgbMiska: [105, 73, 49],
    rgbTelo: [245, 245, 220],
    tema: "Teplý Kontrast",
  },
  {
    id: "4",
    miska: "Třpytivá Hnědá",
    telo: "Matná Hořčicová",
    hexMiska: "#694931",
    hexTelo: "#D4A017",
    rgbMiska: [105, 73, 49],
    rgbTelo: [212, 160, 23],
    tema: "Zlatý List",
  },
  {
    id: "5",
    miska: "Spálená Oranžová / Rezavá",
    telo: "Hluboká Petrolejová Zelená",
    hexMiska: "#B85C38",
    hexTelo: "#004D40",
    rgbMiska: [184, 92, 56],
    rgbTelo: [0, 77, 64],
    tema: "Dýňový Latté",
  },
  {
    id: "6",
    miska: "Sytá Bordó / Vínová",
    telo: "Studená Tmavě Šedá (Antracit)",
    hexMiska: "#800020",
    hexTelo: "#36454F",
    rgbMiska: [128, 0, 32],
    rgbTelo: [54, 69, 79],
    tema: "Šedý Vřes",
  },
  {
    id: "7",
    miska: "Hořčicově Žlutá / Okrová",
    telo: "Uhlově Černá (Matná)",
    hexMiska: "#E3BC3F",
    hexTelo: "#222222",
    rgbMiska: [227, 188, 63],
    rgbTelo: [34, 34, 34],
    tema: "Moderní Energická",
  },
  {
    id: "8",
    miska: "Zlatá / Měděná Metalíza",
    telo: "Tmavá Švestková / Fialová",
    hexMiska: "#B87333",
    hexTelo: "#5F456E",
    rgbMiska: [184, 115, 51],
    rgbTelo: [95, 69, 110],
    tema: "Královský Kov",
  },
];

function AppContent() {
  const {
    selectedCombination,
    setSelectedCombination,
    selectedProduct,
    setSelectedProduct,
    combinations,
    setCombinations,
    selectedVaseColor,
    setSelectedVaseColor,
  } = useAppContext();
  const [draggedColor, setDraggedColor] = useState<string | null>(null);

  const updateColor = (type: "miska" | "telo" | "vase", color: string) => {
    if (type === "vase") {
      // Aktualizace barvy vázy
      const updatedVaseColor = {
        ...selectedVaseColor,
        hex: color,
        rgb: hexToRgb(color),
      };
      setSelectedVaseColor(updatedVaseColor);
      return;
    }

    // Aktualizace kombinace barev pro květináče
    const updatedCombinations = combinations.map((combo) =>
      combo.id === selectedCombination.id
        ? {
            ...combo,
            [`hex${type.charAt(0).toUpperCase() + type.slice(1)}`]: color,
            [`rgb${type.charAt(0).toUpperCase() + type.slice(1)}`]:
              hexToRgb(color),
          }
        : combo
    );
    setCombinations(updatedCombinations);
    setSelectedCombination(
      updatedCombinations.find((c) => c.id === selectedCombination.id)!
    );
  };

  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : [0, 0, 0];
  };

  const swapColors = () => {
    const updatedCombinations = combinations.map((combo) =>
      combo.id === selectedCombination.id
        ? {
            ...combo,
            hexMiska: combo.hexTelo,
            hexTelo: combo.hexMiska,
            rgbMiska: combo.rgbTelo,
            rgbTelo: combo.rgbMiska,
          }
        : combo
    );
    setCombinations(updatedCombinations);
    setSelectedCombination(
      updatedCombinations.find((c) => c.id === selectedCombination.id)!
    );
  };

  // Drag & Drop funkce
  const handleDragStart = (color: string) => {
    setDraggedColor(color);
  };

  const handleDragEnd = () => {
    setDraggedColor(null);
  };

  const handleDrop = (
    e: React.DragEvent,
    targetType: "miska" | "telo" | "vase"
  ) => {
    e.preventDefault();
    if (draggedColor) {
      updateColor(targetType, draggedColor);
      setDraggedColor(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-4 text-4xl font-bold text-center text-gray-800">
          🎨 Color Chooser - Kombinace barev
        </h1>

        {/* Přepínač produktů */}
        <ProductSwitch />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Seznam kombinací/barev podle produktu */}
          {selectedProduct === "pot" ? (
            <CombinationList
              selectedCombination={selectedCombination}
              onCombinationSelect={setSelectedCombination}
              onCombinationsChange={setCombinations}
            />
          ) : (
            <VaseColorList
              selectedVaseColor={selectedVaseColor}
              onVaseColorSelect={setSelectedVaseColor}
            />
          )}

          {/* Hlavní vizualizační karta */}
          <div className="lg:col-span-2">
            {/* Tlačítko pro prohození barev se zobrazuje pouze pro květináče */}
            {selectedProduct === "pot" && (
              <ChangeColorsButton
                selectedCombination={selectedCombination}
                swapColors={swapColors}
              />
            )}

            {/* Velká karta s barvami */}
            <DisplayCard
              handleDrop={handleDrop}
              handleDragOver={handleDragOver}
              updateColor={updateColor}
            />
          </div>

          {/* Paleta barev s drag & drop */}
          <ColourPallete
            selectedProduct={selectedProduct}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
          />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider initialCombinations={initialCombinations}>
      <AppContent />
    </AppProvider>
  );
}
