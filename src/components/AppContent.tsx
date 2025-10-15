"use client";
import React, { useState } from "react";
import ColourPallete from "./ColourPallete";
import CombinationList from "./CombinationList";
import VaseColorList from "./VaseColorList";
import ProductSwitch from "./ProductSwitch";
import DisplayCard from "./DisplayCard";
import { useAppContext } from "../contexts/AppContext";
import ChangeColorsButton from "./ChangeColorsButton";
import Footer from "./Footer";

export default function AppContent() {
  const {
    selectedCombination,
    setSelectedCombination,
    selectedProduct,
    setSelectedProduct,
    combinations,
    setCombinations,
    selectedVaseColor,
    setSelectedVaseColor,
    loading,
  } = useAppContext();

  const [draggedColor, setDraggedColor] = useState<string | null>(null);

  const updateColor = (type: "miska" | "telo" | "vase", color: string) => {
    if (type === "vase") {
      if (selectedVaseColor) {
        const newVaseColor = {
          ...selectedVaseColor,
          hex: color,
          rgb: hexToRgb(color),
        };
        setSelectedVaseColor(newVaseColor);
      }
    } else {
      if (selectedCombination) {
        const newCombination = {
          ...selectedCombination,
          [type === "miska" ? "hexMiska" : "hexTelo"]: color,
          [type === "miska" ? "rgbMiska" : "rgbTelo"]: hexToRgb(color),
        };
        setSelectedCombination(newCombination);
      }
    }
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
    if (selectedCombination) {
      const newCombination = {
        ...selectedCombination,
        hexMiska: selectedCombination.hexTelo,
        hexTelo: selectedCombination.hexMiska,
        rgbMiska: selectedCombination.rgbTelo,
        rgbTelo: selectedCombination.rgbMiska,
        miska: selectedCombination.telo,
        telo: selectedCombination.miska,
      };
      setSelectedCombination(newCombination);
    }
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-32 h-32 rounded-full border-b-2 border-green-500 animate-spin"></div>
          <p className="mt-4 text-gray-600">Načítání...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container flex-1 px-4 py-8 mx-auto">
        <h1 className="mb-4 text-4xl font-bold text-center text-gray-800">
          🎨 Color Chooser - Kombinace barev
        </h1>

        <ProductSwitch />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Seznam kombinací/barev podle produktu */}
          {selectedProduct === "pot" && selectedCombination ? (
            <CombinationList
              selectedCombination={selectedCombination}
              onCombinationSelect={setSelectedCombination}
              onCombinationsChange={setCombinations}
            />
          ) : selectedProduct === "vase" && selectedVaseColor ? (
            <VaseColorList
              selectedVaseColor={selectedVaseColor}
              onVaseColorSelect={setSelectedVaseColor}
            />
          ) : (
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <p className="text-gray-500">Načítání...</p>
            </div>
          )}

          {/* Hlavní vizualizační karta */}
          <div className="lg:col-span-2">
            {/* Tlačítko pro prohození barev se zobrazuje pouze pro květináče */}
            {selectedProduct === "pot" && selectedCombination && (
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

      <Footer />
    </div>
  );
}
