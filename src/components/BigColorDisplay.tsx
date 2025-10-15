import React, { useState, useEffect } from "react";
import { ColorCombination } from "../App";
import { useAppContext } from "../contexts/AppContext";
import { ColorPaletteItem } from "../lib/colorPalette";

interface BigColorDisplayProps {
  handleDrop: (e: React.DragEvent, type: "miska" | "telo" | "vase") => void;
  handleDragOver: (e: React.DragEvent) => void;
  kind: "miska" | "telo" | "vase";
  onColorChange: (type: "miska" | "telo" | "vase", color: string) => void;
}

export default function BigColorDisplay({
  handleDrop,
  handleDragOver,
  kind,
  onColorChange,
}: BigColorDisplayProps) {
  const { selectedProduct, selectedCombination, selectedVaseColor } =
    useAppContext();
  const [colorPalette, setColorPalette] = useState<ColorPaletteItem[]>([]);

  useEffect(() => {
    // Načíst barvy palety z localStorage
    const storedPalette = localStorage.getItem("paletteColors");
    if (storedPalette) {
      setColorPalette(JSON.parse(storedPalette));
    }
  }, []);

  // Pomocné funkce pro získání správných hodnot
  const getColorValue = () => {
    if (kind === "vase") {
      return selectedVaseColor?.hex || "#FFFFFF";
    }
    return kind === "miska"
      ? selectedCombination?.hexMiska || "#FFFFFF"
      : selectedCombination?.hexTelo || "#FFFFFF";
  };

  const getRgbValue = () => {
    if (kind === "vase") {
      return selectedVaseColor?.rgb.join(", ") || "255, 255, 255";
    }
    const rgb =
      kind === "miska"
        ? selectedCombination?.rgbMiska
        : selectedCombination?.rgbTelo;
    return rgb?.join(", ") || "255, 255, 255";
  };

  const getColorName = () => {
    if (kind === "vase") {
      return selectedVaseColor?.name || "";
    }

    const currentHex =
      kind === "miska"
        ? selectedCombination?.hexMiska
        : selectedCombination?.hexTelo;

    if (currentHex) {
      const colorInPalette = colorPalette.find(
        (color) => color.hex === currentHex
      );
      return colorInPalette ? colorInPalette.name : "";
    }

    return "";
  };

  const getLabel = () => {
    if (kind === "vase") {
      return "Barva vázy";
    }
    if (kind === "miska") {
      return selectedProduct === "pot" ? "Miska (Pruhy)" : "Spodní část";
    } else {
      return selectedProduct === "pot" ? "Tělo (Hladké/Fuzzy)" : "Horní část";
    }
  };

  const handleColorClick = () => {
    // Color picker je vypnutý - barvy se mění pouze přes drag & drop z palety
    // setShowColorPicker(showColorPicker === kind ? null : kind);
  };

  return (
    <div className="text-center">
      <h3 className="mb-4 text-lg font-medium text-gray-700">{getLabel()}</h3>
      <div
        className="mb-4 w-full h-32 rounded-lg border-4 border-white shadow-lg transition-all cursor-pointer hover:scale-105"
        style={{ backgroundColor: getColorValue() }}
        onClick={handleColorClick}
        onDrop={(e) => handleDrop(e, kind)}
        onDragOver={handleDragOver}
        draggable={false}
      />
      <div className="space-y-1">
        <p className="font-mono text-sm text-gray-600">{getColorValue()}</p>
        <p className="text-sm text-gray-500">RGB: {getRgbValue()}</p>
        {getColorName() && (
          <p className="text-sm text-gray-500">{getColorName()}</p>
        )}
      </div>
    </div>
  );
}
