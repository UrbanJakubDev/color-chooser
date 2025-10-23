// Database types matching Prisma schema
export interface ColorCombination {
  id: number;
  tema: string;
  miska: string;
  telo: string;
  hexMiska: string;
  hexTelo: string;
  rgbMiska: string; // JSON string
  rgbTelo: string; // JSON string
  userId: string | null;
  isPublic: boolean;
  createdAt: Date;
}

export interface PotColor {
  id: number;
  name: string;
  hex: string;
  rgb: string; // JSON string
  description: string | null;
  isActive: boolean;
  createdAt: Date;
}

export interface VaseColor {
  id: number;
  name: string;
  hex: string;
  rgb: string; // JSON string
  description: string | null;
  isActive: boolean;
  createdAt: Date;
}

export interface PaletteColor {
  id: number;
  hex: string;
  name: string;
  createdAt: Date;
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  createdAt: Date;
}

// Legacy types for backward compatibility with existing components
export interface LegacyColorCombination {
  id: string;
  miska: string;
  telo: string;
  hexMiska: string;
  hexTelo: string;
  rgbMiska: [number, number, number];
  rgbTelo: [number, number, number];
  tema: string;
}

export interface LegacyPotColor {
  id: string;
  name: string;
  hex: string;
  rgb: [number, number, number];
  description: string;
}

export interface LegacyVaseColor {
  id: string;
  name: string;
  hex: string;
  rgb: [number, number, number];
  description: string;
}

export interface LegacyPaletteColor {
  id: string;
  hex: string;
  name?: string;
}

// Helper functions to convert between new and legacy types
export const convertToLegacyColorCombination = (
  combination: ColorCombination
): LegacyColorCombination => ({
  id: combination.id.toString(),
  miska: combination.miska,
  telo: combination.telo,
  hexMiska: combination.hexMiska,
  hexTelo: combination.hexTelo,
  rgbMiska: JSON.parse(combination.rgbMiska),
  rgbTelo: JSON.parse(combination.rgbTelo),
  tema: combination.tema,
});

export const convertToLegacyVaseColor = (
  color: VaseColor
): LegacyVaseColor => ({
  id: color.id.toString(),
  name: color.name,
  hex: color.hex,
  rgb: JSON.parse(color.rgb),
  description: color.description || "",
});

export const convertToLegacyPotColor = (color: PotColor): LegacyPotColor => ({
  id: color.id.toString(),
  name: color.name,
  hex: color.hex,
  rgb: JSON.parse(color.rgb),
  description: color.description || "",
});

export const convertToLegacyPaletteColor = (
  color: PaletteColor
): LegacyPaletteColor => ({
  id: color.id.toString(),
  hex: color.hex,
  name: color.name,
});

// tRPC types
export type { AppRouter } from "@/server";
