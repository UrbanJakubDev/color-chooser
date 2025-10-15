import React, { useState } from "react";
import { ColorCombination } from "../App";
import ColorPicker from "./ColourPicker";
import { useAppContext } from "../contexts/AppContext";

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
  const [showColorPicker, setShowColorPicker] = useState<
    "miska" | "telo" | "vase" | null
  >(null);

  // Pomocné funkce pro získání správných hodnot
  const getColorValue = () => {
    if (kind === "vase") {
      return selectedVaseColor.hex;
    }
    return kind === "miska"
      ? selectedCombination.hexMiska
      : selectedCombination.hexTelo;
  };

  const getRgbValue = () => {
    if (kind === "vase") {
      return selectedVaseColor.rgb.join(", ");
    }
    const rgb =
      kind === "miska"
        ? selectedCombination.rgbMiska
        : selectedCombination.rgbTelo;
    return rgb.join(", ");
  };

  const getColorName = () => {
    if (kind === "vase") {
      return selectedVaseColor.name;
    }
    return kind === "miska"
      ? selectedCombination.miska
      : selectedCombination.telo;
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
    setShowColorPicker(showColorPicker === kind ? null : kind);
  };

  const handleColorChange = (
    type: "miska" | "telo" | "vase",
    color: string
  ) => {
    onColorChange(type, color);
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
        <p className="text-sm text-gray-500">{getColorName()}</p>
      </div>

      {/* Color picker */}
      <ColorPicker
        showColorPicker={showColorPicker}
        selectedCombination={selectedCombination}
        selectedProduct={selectedProduct}
        onColorChange={handleColorChange}
        onClose={() => setShowColorPicker(null)}
      />
    </div>
  );
}
