import React, { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";

interface VaseColor {
  id: string;
  name: string;
  hex: string;
  rgb: [number, number, number];
  description: string;
}

const initialVaseColors: VaseColor[] = [
  {
    id: "1",
    name: "Klasická Bílá",
    hex: "#FFFFFF",
    rgb: [255, 255, 255],
    description: "Čistá bílá pro minimalistický vzhled",
  },
  {
    id: "2",
    name: "Elegantní Černá",
    hex: "#2C2C2C",
    rgb: [44, 44, 44],
    description: "Hluboká černá pro moderní design",
  },
  {
    id: "3",
    name: "Teplá Terakota",
    hex: "#B85C38",
    rgb: [184, 92, 56],
    description: "Přírodní terakotová barva",
  },
  {
    id: "4",
    name: "Měkká Krémová",
    hex: "#F5F5DC",
    rgb: [245, 245, 220],
    description: "Jemná krémová pro útulný prostor",
  },
  {
    id: "5",
    name: "Sytá Bordó",
    hex: "#800020",
    rgb: [128, 0, 32],
    description: "Bohatá bordó pro luxusní vzhled",
  },
  {
    id: "6",
    name: "Přírodní Hnědá",
    hex: "#8B4513",
    rgb: [139, 69, 19],
    description: "Zemité hnědé tóny",
  },
  {
    id: "7",
    name: "Světle Šedá",
    hex: "#D3D3D3",
    rgb: [211, 211, 211],
    description: "Neutrální šedá pro univerzální použití",
  },
  {
    id: "8",
    name: "Tmavě Modrá",
    hex: "#191970",
    rgb: [25, 25, 112],
    description: "Hluboká modř pro elegantní kontrast",
  },
];

interface VaseColorListProps {
  selectedVaseColor: VaseColor;
  onVaseColorSelect: (color: VaseColor) => void;
}

export default function VaseColorList({
  selectedVaseColor,
  onVaseColorSelect,
}: VaseColorListProps) {
  const [vaseColors, setVaseColors] = useState<VaseColor[]>(initialVaseColors);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newColor, setNewColor] = useState({
    name: "",
    hex: "#FFFFFF",
    description: "",
  });

  // Pomocné funkce
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

  // Nastavení barvy nové barvy na aktuálně vybranou při otevření formuláře
  const handleShowAddForm = () => {
    if (!showAddForm) {
      setNewColor({
        ...newColor,
        hex: selectedVaseColor.hex,
      });
    }
    setShowAddForm(!showAddForm);
  };

  // Načtení barev z localStorage při startu
  useEffect(() => {
    const savedColors = localStorage.getItem("vaseColors");
    if (savedColors) {
      const parsed = JSON.parse(savedColors);
      setVaseColors(parsed);
    }
  }, []);

  // Uložení barev do localStorage při změně
  useEffect(() => {
    localStorage.setItem("vaseColors", JSON.stringify(vaseColors));
  }, [vaseColors]);

  const addNewColor = () => {
    if (!newColor.name || !newColor.description) {
      alert("Vyplňte všechna pole!");
      return;
    }

    const newVaseColor: VaseColor = {
      id: Date.now().toString(),
      name: newColor.name,
      hex: newColor.hex,
      rgb: hexToRgb(newColor.hex),
      description: newColor.description,
    };

    setVaseColors([...vaseColors, newVaseColor]);
    onVaseColorSelect(newVaseColor);
    setShowAddForm(false);
    setNewColor({
      name: "",
      hex: "#FFFFFF",
      description: "",
    });
  };

  const deleteColor = (id: string) => {
    if (vaseColors.length <= 1) {
      alert("Nemůžete smazat poslední barvu!");
      return;
    }

    const updatedColors = vaseColors.filter((color) => color.id !== id);
    setVaseColors(updatedColors);

    if (selectedVaseColor.id === id) {
      onVaseColorSelect(updatedColors[0]);
    }
  };

  const resetToDefault = () => {
    setVaseColors(initialVaseColors);
    onVaseColorSelect(initialVaseColors[0]);
    localStorage.removeItem("vaseColors");
  };

  return (
    <div className="lg:col-span-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Dostupné barvy vázy
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handleShowAddForm}
            className="px-3 py-1 text-sm text-white bg-green-500 rounded-lg transition-colors hover:bg-green-600"
          >
            {showAddForm ? "Zrušit" : "+ Přidat"}
          </button>
          <button
            onClick={resetToDefault}
            className="px-3 py-1 text-sm text-white bg-gray-500 rounded-lg transition-colors hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Formulář pro novou barvu */}
      {showAddForm && (
        <div className="p-4 mb-4 bg-white rounded-lg border-2 border-green-200">
          <h3 className="mb-3 font-medium text-gray-800">Nová barva</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Název barvy"
              value={newColor.name}
              onChange={(e) =>
                setNewColor({
                  ...newColor,
                  name: e.target.value,
                })
              }
              className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Popis barvy"
              value={newColor.description}
              onChange={(e) =>
                setNewColor({
                  ...newColor,
                  description: e.target.value,
                })
              }
              className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex items-center space-x-2">
              <div
                className="w-8 h-8 rounded border-2 border-white shadow-sm"
                style={{ backgroundColor: newColor.hex }}
              ></div>
              <span className="font-mono text-sm text-gray-600">
                {newColor.hex}
              </span>
            </div>
            <button
              onClick={addNewColor}
              className="px-4 py-2 w-full text-white bg-green-500 rounded-lg transition-colors hover:bg-green-600"
            >
              Přidat barvu
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {vaseColors.map((color) => (
          <div
            key={color.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedVaseColor.id === color.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
            onClick={() => onVaseColorSelect(color)}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                </div>
                <h3 className="font-medium text-gray-800">{color.name}</h3>
                <p className="text-sm text-gray-600">{color.description}</p>
                <p className="font-mono text-xs text-gray-500">{color.hex}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color.id);
                }}
                className="px-2 py-1 text-xs text-white bg-red-500 rounded transition-colors hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
