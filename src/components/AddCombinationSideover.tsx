import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface AddCombinationSideoverProps {
  isOpen: boolean;
  onClose: () => void;
  onCombinationAdded: () => void;
}

export default function AddCombinationSideover({
  isOpen,
  onClose,
  onCombinationAdded,
}: AddCombinationSideoverProps) {
  const [tema, setTema] = useState("");
  const [miska, setMiska] = useState("");
  const [telo, setTelo] = useState("");
  const [colorMiska, setColorMiska] = useState("#3B82F6");
  const [colorTelo, setColorTelo] = useState("#10B981");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validace hex kódů
      if (!/^#[0-9A-F]{6}$/i.test(colorMiska)) {
        throw new Error("Neplatný hex kód barvy misky");
      }
      if (!/^#[0-9A-F]{6}$/i.test(colorTelo)) {
        throw new Error("Neplatný hex kód barvy těla");
      }

      // Kontrola duplicit kombinací
      const checkResponse = await fetch("/api/combinations");
      if (checkResponse.ok) {
        const existingCombinations = await checkResponse.json();
        const isDuplicate = existingCombinations.some(
          (c: any) =>
            c.hexMiska.toLowerCase() === colorMiska.toLowerCase() &&
            c.hexTelo.toLowerCase() === colorTelo.toLowerCase()
        );
        if (isDuplicate) {
          throw new Error("Kombinace s těmito barvami již existuje");
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

      const response = await fetch("/api/combinations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tema,
          miska,
          telo,
          hexMiska: colorMiska,
          hexTelo: colorTelo,
          rgbMiska: hexToRgb(colorMiska),
          rgbTelo: hexToRgb(colorTelo),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Nepodařilo se přidat kombinaci");
      }

      onCombinationAdded();
      onClose();
      // Reset formuláře
      setTema("");
      setMiska("");
      setTelo("");
      setColorMiska("#3B82F6");
      setColorTelo("#10B981");
    } catch (error: any) {
      setError(error.message || "Došlo k chybě při přidávání kombinace");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl mx-4 max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Přidat kombinaci
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
              htmlFor="tema"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Téma kombinace
            </label>
            <input
              type="text"
              id="tema"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="miska"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Název misky
              </label>
              <input
                type="text"
                id="miska"
                value={miska}
                onChange={(e) => setMiska(e.target.value)}
                className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="telo"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Název těla
              </label>
              <input
                type="text"
                id="telo"
                value={telo}
                onChange={(e) => setTelo(e.target.value)}
                className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Barva misky
              </label>
              <div className="space-y-3">
                <div
                  className="w-full h-24 rounded-lg border-2 border-gray-300"
                  style={{ backgroundColor: colorMiska }}
                ></div>
                <HexColorPicker color={colorMiska} onChange={setColorMiska} />
                <input
                  type="text"
                  value={colorMiska}
                  onChange={(e) => setColorMiska(e.target.value)}
                  className="px-3 py-2 w-full font-mono text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="#000000"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Barva těla
              </label>
              <div className="space-y-3">
                <div
                  className="w-full h-24 rounded-lg border-2 border-gray-300"
                  style={{ backgroundColor: colorTelo }}
                ></div>
                <HexColorPicker color={colorTelo} onChange={setColorTelo} />
                <input
                  type="text"
                  value={colorTelo}
                  onChange={(e) => setColorTelo(e.target.value)}
                  className="px-3 py-2 w-full font-mono text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="#000000"
                />
              </div>
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
              {isLoading ? "Přidávání..." : "Přidat kombinaci"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
