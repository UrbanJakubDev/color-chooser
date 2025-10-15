export interface ColorCombination {
  id: string;
  miska: string;
  telo: string;
  hexMiska: string;
  hexTelo: string;
  rgbMiska: [number, number, number];
  rgbTelo: [number, number, number];
  tema: string;
}

export interface PotColor {
  id: string;
  name: string;
  hex: string;
  rgb: [number, number, number];
  description: string;
}

export interface VaseColor {
  id: string;
  name: string;
  hex: string;
  rgb: [number, number, number];
  description: string;
}

export interface PaletteColor {
  id: string;
  hex: string;
  name?: string;
}
