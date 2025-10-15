import React from "react";
import { HexColorPicker } from "react-colorful";
import { useAppContext } from "../contexts/AppContext";

interface ColorCombination {
  id: string;
  miska: string;
  telo: string;
  hexMiska: string;
  hexTelo: string;
  rgbMiska: [number, number, number];
  rgbTelo: [number, number, number];
  tema: string;
}

interface ColorPickerProps {
  showColorPicker: "miska" | "telo" | "vase" | null;
  selectedCombination: ColorCombination;
  selectedProduct: "pot" | "vase";
  onColorChange: (type: "miska" | "telo" | "vase", color: string) => void;
  onClose: () => void;
}

export default function ColorPicker({
  showColorPicker,
  selectedCombination,
  selectedProduct,
  onColorChange,
  onClose,
}: ColorPickerProps) {
  const { selectedVaseColor } = useAppContext();

  if (!showColorPicker) return null;

  const getCurrentColor = () => {
    if (showColorPicker === "vase") {
      return selectedVaseColor.hex;
    }
    return showColorPicker === "miska"
      ? selectedCombination.hexMiska
      : selectedCombination.hexTelo;
  };

  const getColorLabel = () => {
    if (showColorPicker === "vase") {
      return "vázy";
    }
    if (showColorPicker === "miska") {
      return selectedProduct === "pot" ? "misky" : "spodní části";
    } else {
      return selectedProduct === "pot" ? "těla" : "horní části";
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h3 className="mb-4 text-lg font-medium text-gray-700">
        Změnit barvu {getColorLabel()}
      </h3>
      <div className="flex justify-center mb-4">
        <HexColorPicker
          color={getCurrentColor()}
          onChange={(color) => onColorChange(showColorPicker, color)}
        />
      </div>
      <div className="text-center">
        <button
          onClick={onClose}
          className="px-6 py-2 text-white bg-gray-500 rounded-lg transition-colors hover:bg-gray-600"
        >
          Zavřít
        </button>
      </div>
    </div>
  );
}
