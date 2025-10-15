export interface ColorPaletteItem {
  hex: string;
  name: string;
}

export const colorPalette: ColorPaletteItem[] = [
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

// Pomocná funkce pro získání názvu barvy podle hex kódu
export const getColorName = (hex: string): string => {
  const color = colorPalette.find((color) => color.hex === hex);
  return color ? color.name : "";
};

// Pomocná funkce pro ověření, zda je barva v paletě
export const isColorInPalette = (hex: string): boolean => {
  return colorPalette.some((color) => color.hex === hex);
};
