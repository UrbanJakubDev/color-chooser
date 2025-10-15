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
