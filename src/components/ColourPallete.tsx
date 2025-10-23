"use client";

import React, { useState, useEffect } from "react";
import { ColorPaletteItem } from "../lib/colorPalette";
import { useAppContext } from "../contexts/AppContext";
import AddColorSideover from "./AddColorSideover";
import { trpc } from "@/lib/trpc";

export default function ColourPallete({
  selectedProduct,
  handleDragStart,
  handleDragEnd,
}: {
  selectedProduct: string;
  handleDragStart: (color: string) => void;
  handleDragEnd: () => void;
}) {
  const { isAdmin } = useAppContext();
  const [isAddColorOpen, setIsAddColorOpen] = useState(false);
  const [deletingColor, setDeletingColor] = useState<string | null>(null);

  // tRPC queries
  const {
    data: paletteColors,
    isLoading,
    refetch,
  } = trpc.paletteColor.getAll.useQuery();
  const deleteColorMutation = trpc.paletteColor.delete.useMutation({
    onSuccess: () => {
      refetch(); // Refresh the data after successful deletion
    },
  });

  // Fallback palette for when tRPC data is not available
  const fallbackPalette: ColorPaletteItem[] = [
    { hex: "#D3D3D3", name: "Světle Šedá" },
    { hex: "#003E33", name: "Hluboká Tmavě Zelená" },
    { hex: "#CC5500", name: "Spálená Oranžová" },
    { hex: "#694931", name: "Třpytivá Hnědá" },
    { hex: "#F5F5DC", name: "Krémová" },
    { hex: "#D4A017", name: "Matná Hořčicová" },
    { hex: "#B85C38", name: "Teplá Terakota" },
    { hex: "#004D40", name: "Hluboká Petrolejová Zelená" },
    { hex: "#800020", name: "Sytá Bordó" },
    { hex: "#36454F", name: "Studená Tmavě Šedá" },
    { hex: "#E3BC3F", name: "Hořčicově Žlutá" },
    { hex: "#222222", name: "Uhlově Černá" },
    { hex: "#B87333", name: "Zlatá Metalíza" },
    { hex: "#5F456E", name: "Tmavá Švestková" },
    { hex: "#FF6B6B", name: "Korálová Červená" },
    { hex: "#4ECDC4", name: "Mátová Zelená" },
    { hex: "#45B7D1", name: "Nebeská Modrá" },
    { hex: "#96CEB4", name: "Světle Zelená" },
    { hex: "#FFEAA7", name: "Slunečná Žlutá" },
    { hex: "#DDA0DD", name: "Levandulová" },
    { hex: "#98D8C8", name: "Mátová" },
    { hex: "#F7DC6F", name: "Zlatá Žlutá" },
    { hex: "#BB8FCE", name: "Světle Fialová" },
    { hex: "#85C1E9", name: "Světle Modrá" },
    { hex: "#F8C471", name: "Broskvová" },
    { hex: "#82E0AA", name: "Světle Zelená" },
    { hex: "#F1948A", name: "Lososová" },
    { hex: "#D7BDE2", name: "Světle Fialová" },
    { hex: "#A9DFBF", name: "Mátová Zelená" },
    { hex: "#FFFFFF", name: "Klasická Bílá" },
    { hex: "#2C2C2C", name: "Elegantní Černá" },
    { hex: "#8B4513", name: "Přírodní Hnědá" },
    { hex: "#191970", name: "Tmavě Modrá" },
  ];

  // Convert tRPC data to ColorPaletteItem format
  const colorPalette: ColorPaletteItem[] = paletteColors
    ? paletteColors.map((color) => ({ hex: color.hex, name: color.name }))
    : fallbackPalette;

  const handleDeleteColor = async (colorHex: string) => {
    if (!confirm("Opravdu chcete smazat tuto barvu?")) return;

    setDeletingColor(colorHex);
    try {
      // Find the color by hex to get its ID
      const colorToDelete = paletteColors?.find((c) => c.hex === colorHex);

      if (colorToDelete) {
        await deleteColorMutation.mutateAsync({ id: colorToDelete.id });
      } else {
        alert("Barva nebyla nalezena");
      }
    } catch (error) {
      console.error("Error deleting color:", error);
      alert("Nepodařilo se smazat barvu");
    } finally {
      setDeletingColor(null);
    }
  };

  const handleColorAdded = () => {
    // Refresh the tRPC query to get updated data
    refetch();
  };
  return (
    <div className="p-6 mb-6 bg-white rounded-xl shadow-lg lg:col-span-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">
          🎨 Paleta barev - Přetáhněte barvu na{" "}
          {selectedProduct === "pot"
            ? "misku nebo tělo"
            : "spodní nebo horní část"}
        </h3>
        {isAdmin && (
          <button
            onClick={() => setIsAddColorOpen(true)}
            className="px-3 py-1 text-sm text-white bg-green-500 rounded-lg transition-colors hover:bg-green-600"
          >
            + Přidat barvu
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Načítání barev...</div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {colorPalette.map((color) => (
            <div key={color.hex} className="relative group">
              <div
                className="w-16 h-16 rounded-lg border-2 border-white shadow-sm transition-transform cursor-grab hover:scale-110"
                style={{ backgroundColor: color.hex }}
                draggable
                onDragStart={() => handleDragStart(color.hex)}
                onDragEnd={handleDragEnd}
                title={`${color.name} (${color.hex}) - Přetáhněte na ${
                  selectedProduct === "pot"
                    ? "misku nebo tělo"
                    : "spodní nebo horní část"
                }`}
              ></div>
              {isAdmin && (
                <button
                  onClick={() => handleDeleteColor(color.hex)}
                  className="absolute -top-2 -right-2 w-6 h-6 text-xs text-white bg-red-500 rounded-full opacity-0 transition-colors hover:bg-red-600 group-hover:opacity-100 disabled:opacity-50"
                  title="Smazat barvu"
                  disabled={deletingColor === color.hex}
                >
                  {deletingColor === color.hex ? "..." : "×"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <AddColorSideover
        isOpen={isAddColorOpen}
        onClose={() => setIsAddColorOpen(false)}
        onColorAdded={handleColorAdded}
      />
    </div>
  );
}
