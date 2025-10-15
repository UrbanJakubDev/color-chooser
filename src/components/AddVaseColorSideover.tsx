import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface AddVaseColorSideoverProps {
  isOpen: boolean;
  onClose: () => void;
  onVaseColorAdded: () => void;
}

export default function AddVaseColorSideover({
  isOpen,
  onClose,
  onVaseColorAdded,
}: AddVaseColorSideoverProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#3B82F6");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validace hex kódu
      if (!/^#[0-9A-F]{6}$/i.test(color)) {
        throw new Error("Neplatný hex kód barvy");
      }

      // Kontrola duplicit barev váží
      const checkResponse = await fetch("/api/vase-colors");
      if (checkResponse.ok) {
        const existingColors = await checkResponse.json();
        const isDuplicate = existingColors.some(
          (c: any) => c.hex.toLowerCase() === color.toLowerCase()
        );
        if (isDuplicate) {
          throw new Error("Barva vázy s tímto hex kódem již existuje");
        }
      }

      // Konvertovat hex na RGB
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

      const response = await fetch("/api/vase-colors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          hex: color,
          rgb: hexToRgb(color),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Nepodařilo se přidat barvu vázy");
      }

      onVaseColorAdded();
      onClose();
      // Reset formuláře
      setName("");
      setDescription("");
      setColor("#3B82F6");
    } catch (error: any) {
      setError(error.message || "Došlo k chybě při přidávání barvy vázy");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-4 max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Přidat barvu vázy
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Název barvy
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Popis
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Barva
            </label>
            <div className="space-y-3">
              <div
                className="w-full h-32 rounded-lg border-2 border-gray-300"
                style={{ backgroundColor: color }}
              ></div>
              <HexColorPicker color={color} onChange={setColor} />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="px-3 py-2 w-full font-mono text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#000000"
              />
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 rounded-md border border-gray-300 hover:bg-gray-50"
            >
              Zrušit
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Přidávání..." : "Přidat barvu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
