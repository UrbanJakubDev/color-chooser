"use client";

import React, { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import AddVaseColorSideover from "./AddVaseColorSideover";

interface VaseColor {
  id: string;
  name: string;
  hex: string;
  rgb: [number, number, number];
  description: string;
}

interface VaseColorListProps {
  selectedVaseColor: VaseColor;
  onVaseColorSelect: (color: VaseColor) => void;
}

export default function VaseColorList({
  selectedVaseColor,
  onVaseColorSelect,
}: VaseColorListProps) {
  const { vaseColors, setVaseColors, isAdmin } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAddVaseColorOpen, setIsAddVaseColorOpen] = useState(false);
  const [deletingVaseColor, setDeletingVaseColor] = useState<string | null>(
    null
  );
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
    // Reset na prázdné pole - barvy se načtou z databáze
    setVaseColors([]);
    localStorage.removeItem("vaseColors");
  };

  const handleDeleteVaseColor = async (vaseColorId: string) => {
    if (!confirm("Opravdu chcete smazat tuto barvu vázy?")) return;

    setDeletingVaseColor(vaseColorId);
    try {
      const deleteResponse = await fetch(`/api/vase-colors/${vaseColorId}`, {
        method: "DELETE",
      });

      if (deleteResponse.ok) {
        // Aktualizovat lokální state
        const updatedVaseColors = vaseColors.filter(
          (c: VaseColor) => c.id !== vaseColorId
        );
        setVaseColors(updatedVaseColors);
        // Pokud byla smazána vybraná barva, vybrat první dostupnou
        if (selectedVaseColor.id === vaseColorId) {
          const remainingColors = vaseColors.filter(
            (c) => c.id !== vaseColorId
          );
          if (remainingColors.length > 0) {
            onVaseColorSelect(remainingColors[0]);
          }
        }
      } else {
        const errorData = await deleteResponse.json();
        alert(
          `Nepodařilo se smazat barvu vázy: ${
            errorData.error || "Neznámá chyba"
          }`
        );
      }
    } catch (error) {
      console.error("Error deleting vase color:", error);
      alert("Nepodařilo se smazat barvu vázy");
    } finally {
      setDeletingVaseColor(null);
    }
  };

  const handleVaseColorAdded = () => {
    // Znovu načíst barvy váží z API
    const loadVaseColors = async () => {
      try {
        const response = await fetch("/api/vase-colors");
        if (response.ok) {
          const data = await response.json();
          setVaseColors(data);
        }
      } catch (error) {
        console.error("Error loading vase colors:", error);
      }
    };
    loadVaseColors();
  };

  return (
    <div className="lg:col-span-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Dostupné barvy vázy
        </h2>
        <div className="flex space-x-2">
          {isAdmin && (
            <button
              onClick={() => setIsAddVaseColorOpen(true)}
              className="px-3 py-1 text-sm text-white bg-green-500 rounded-lg transition-colors hover:bg-green-600"
            >
              + Přidat barvu vázy
            </button>
          )}
          {isAdmin && (
            <button
              onClick={handleShowAddForm}
              className="px-3 py-1 text-sm text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600"
            >
              {showAddForm ? "Zrušit" : "Uložit aktuální"}
            </button>
          )}
          <button
            onClick={resetToDefault}
            className="px-3 py-1 text-sm text-white bg-gray-500 rounded-lg transition-colors hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Formulář pro novou barvu */}
      {showAddForm && isAdmin && (
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
              {isAdmin && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteVaseColor(color.id);
                  }}
                  className="px-2 py-1 text-xs text-white bg-red-500 rounded transition-colors hover:bg-red-600 disabled:opacity-50"
                  title="Smazat barvu vázy"
                  disabled={deletingVaseColor === color.id}
                >
                  {deletingVaseColor === color.id ? "..." : "✕"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <AddVaseColorSideover
        isOpen={isAddVaseColorOpen}
        onClose={() => setIsAddVaseColorOpen(false)}
        onVaseColorAdded={handleVaseColorAdded}
      />
    </div>
  );
}
