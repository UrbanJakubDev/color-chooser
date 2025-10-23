"use client";

import { LegacyColorCombination } from "../types";
import { useAppContext } from "../contexts/AppContext";

export default function ChangeColorsButton({
  selectedCombination,
  swapColors,
}: {
  selectedCombination: LegacyColorCombination;
  swapColors: () => void;
}) {
  const { selectedProduct } = useAppContext();
  return (
    <div
      className={`flex justify-between items-center mb-4 ${
        selectedProduct === "vase" ? "hidden" : ""
      }`}
    >
      <h2 className="text-2xl font-semibold text-gray-700">
        {selectedCombination.tema}
      </h2>
      <div className="flex space-x-2">
        <button
          onClick={swapColors}
          className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg transition-colors hover:bg-purple-600"
          title="Prohodit barvy misky a těla"
        >
          🔄 Prohodit barvy
        </button>
      </div>
    </div>
  );
}
