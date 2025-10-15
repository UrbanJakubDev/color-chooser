import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import Toast, { useToast } from "./Toast";

interface AddColorSideoverProps {
  isOpen: boolean;
  onClose: () => void;
  onColorAdded: () => void;
}

export default function AddColorSideover({
  isOpen,
  onClose,
  onColorAdded,
}: AddColorSideoverProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#3B82F6");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast, showToast, hideToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validace hex kódu
      if (!/^#[0-9A-F]{6}$/i.test(color)) {
        throw new Error("Neplatný hex kód barvy");
      }

      // Kontrola duplicit
      const checkResponse = await fetch("/api/palette-colors");
      if (checkResponse.ok) {
        const existingColors = await checkResponse.json();
        const isDuplicate = existingColors.some(
          (c: any) => c.hex.toLowerCase() === color.toLowerCase()
        );
        if (isDuplicate) {
          throw new Error("Barva s tímto hex kódem již existuje");
        }
      }

      const response = await fetch("/api/palette-colors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          hex: color,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Nepodařilo se přidat barvu");
      }

      onColorAdded();
      onClose();
      setName("");
      setColor("#3B82F6");
      showToast("Barva byla úspěšně přidána!", "success");
    } catch (error: any) {
      setError(error.message || "Došlo k chybě při přidávání barvy");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-4 max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Přidat barvu</h2>
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

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}
