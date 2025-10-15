export default function ColourPallete({
  selectedProduct,
  handleDragStart,
  handleDragEnd,
}: {
  selectedProduct: string;
  handleDragStart: (color: string) => void;
  handleDragEnd: () => void;
}) {

    // Seznam všech dostupných barev
    const colorPalette = [
      "#D3D3D3",
      "#003E33",
      "#CC5500",
      "#694931",
      "#F5F5DC",
      "#D4A017",
      "#B85C38",
      "#004D40",
      "#800020",
      "#36454F",
      "#E3BC3F",
      "#222222",
      "#B87333",
      "#5F456E",
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E9",
      "#F8C471",
      "#82E0AA",
      "#F1948A",
      "#85C1E9",
      "#D7BDE2",
      "#A9DFBF",
    ];

    
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
            key={color}
            className="w-16 h-16 rounded-lg border-2 border-white shadow-sm transition-transform cursor-grab hover:scale-110"
            style={{ backgroundColor: color }}
            draggable
            onDragStart={() => handleDragStart(color)}
            onDragEnd={handleDragEnd}
            title={`Přetáhněte ${color} na ${
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
