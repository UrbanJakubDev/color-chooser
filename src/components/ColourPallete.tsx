import React, { useState, useEffect } from "react";
import { ColorPaletteItem } from "../lib/colorPalette";

export default function ColourPallete({
  selectedProduct,
  handleDragStart,
  handleDragEnd,
}: {
  selectedProduct: string;
  handleDragStart: (color: string) => void;
  handleDragEnd: () => void;
}) {
  const [colorPalette, setColorPalette] = useState<ColorPaletteItem[]>([]);

  useEffect(() => {
    // Načíst barvy palety z localStorage (které se načte z API v AppContext)
    const storedPalette = localStorage.getItem("paletteColors");
    if (storedPalette) {
      setColorPalette(JSON.parse(storedPalette));
    } else {
      // Fallback na statické barvy, pokud není localStorage dostupné
      const fallbackPalette = [
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
      setColorPalette(fallbackPalette);
    }
  }, []);
  return (
    <div className="p-6 mb-6 bg-white rounded-xl shadow-lg lg:col-span-1">
      <h3 className="mb-4 text-lg font-medium text-gray-700">
        🎨 Paleta barev - Přetáhněte barvu na{" "}
        {selectedProduct === "pot"
          ? "misku nebo tělo"
          : "spodní nebo horní část"}
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {colorPalette.map((color) => (
          <div
            key={color.hex}
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
        ))}
      </div>
    </div>
  );
}
