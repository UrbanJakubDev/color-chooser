import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Seed Color Combinations
  const combinations = [
    {
      tema: "Elegance Lesa",
      miska: "Mramorová",
      telo: "Hluboká Tmavě Zelená (Jedlová)",
      hexMiska: "#D3D3D3",
      hexTelo: "#003E33",
      rgbMiska: JSON.stringify([211, 211, 211]),
      rgbTelo: JSON.stringify([0, 62, 51]),
      isPublic: true,
    },
    {
      tema: "Klasický Podzim",
      miska: "Mramorová",
      telo: "Spálená Oranžová / Terakota",
      hexMiska: "#D3D3D3",
      hexTelo: "#CC5500",
      rgbMiska: JSON.stringify([211, 211, 211]),
      rgbTelo: JSON.stringify([204, 85, 0]),
      isPublic: true,
    },
    {
      tema: "Teplý Kontrast",
      miska: "Třpytivá Hnědá",
      telo: "Krémová / Světle Béžová",
      hexMiska: "#694931",
      hexTelo: "#F5F5DC",
      rgbMiska: JSON.stringify([105, 73, 49]),
      rgbTelo: JSON.stringify([245, 245, 220]),
      isPublic: true,
    },
    {
      tema: "Zlatý List",
      miska: "Třpytivá Hnědá",
      telo: "Matná Hořčicová",
      hexMiska: "#694931",
      hexTelo: "#D4A017",
      rgbMiska: JSON.stringify([105, 73, 49]),
      rgbTelo: JSON.stringify([212, 160, 23]),
      isPublic: true,
    },
    {
      tema: "Dýňový Latté",
      miska: "Spálená Oranžová / Rezavá",
      telo: "Hluboká Petrolejová Zelená",
      hexMiska: "#B85C38",
      hexTelo: "#004D40",
      rgbMiska: JSON.stringify([184, 92, 56]),
      rgbTelo: JSON.stringify([0, 77, 64]),
      isPublic: true,
    },
    {
      tema: "Šedý Vřes",
      miska: "Sytá Bordó / Vínová",
      telo: "Studená Tmavě Šedá (Antracit)",
      hexMiska: "#800020",
      hexTelo: "#36454F",
      rgbMiska: JSON.stringify([128, 0, 32]),
      rgbTelo: JSON.stringify([54, 69, 79]),
      isPublic: true,
    },
    {
      tema: "Moderní Energická",
      miska: "Hořčicově Žlutá / Okrová",
      telo: "Uhlově Černá (Matná)",
      hexMiska: "#E3BC3F",
      hexTelo: "#222222",
      rgbMiska: JSON.stringify([227, 188, 63]),
      rgbTelo: JSON.stringify([34, 34, 34]),
      isPublic: true,
    },
    {
      tema: "Luxusní Elegance",
      miska: "Zlatá / Měděná Metalíza",
      telo: "Tmavá Švestková / Fialová",
      hexMiska: "#B87333",
      hexTelo: "#5F456E",
      rgbMiska: JSON.stringify([184, 115, 51]),
      rgbTelo: JSON.stringify([95, 69, 110]),
      isPublic: true,
    },
  ];

  for (const combination of combinations) {
    await prisma.colorCombination.create({
      data: combination,
    });
  }

  // Seed Vase Colors
  const vaseColors = [
    {
      name: "Klasická Bílá",
      hex: "#FFFFFF",
      rgb: JSON.stringify([255, 255, 255]),
      description: "Čistá bílá pro minimalistický vzhled",
    },
    {
      name: "Elegantní Černá",
      hex: "#2C2C2C",
      rgb: JSON.stringify([44, 44, 44]),
      description: "Hluboká černá pro moderní design",
    },
    {
      name: "Teplá Terakota",
      hex: "#B85C38",
      rgb: JSON.stringify([184, 92, 56]),
      description: "Přírodní terakotová barva",
    },
    {
      name: "Měkká Krémová",
      hex: "#F5F5DC",
      rgb: JSON.stringify([245, 245, 220]),
      description: "Jemná krémová pro útulný prostor",
    },
    {
      name: "Sytá Bordó",
      hex: "#800020",
      rgb: JSON.stringify([128, 0, 32]),
      description: "Bohatá bordó pro luxusní vzhled",
    },
    {
      name: "Přírodní Hnědá",
      hex: "#8B4513",
      rgb: JSON.stringify([139, 69, 19]),
      description: "Zemité hnědé tóny",
    },
    {
      name: "Světle Šedá",
      hex: "#D3D3D3",
      rgb: JSON.stringify([211, 211, 211]),
      description: "Neutrální šedá pro univerzální použití",
    },
    {
      name: "Tmavě Modrá",
      hex: "#191970",
      rgb: JSON.stringify([25, 25, 112]),
      description: "Hluboká modř pro elegantní kontrast",
    },
  ];

  for (const vaseColor of vaseColors) {
    await prisma.vaseColor.create({
      data: vaseColor,
    });
  }

  // Seed Palette Colors
  const paletteColors = [
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
    "#D7BDE2",
    "#A9DFBF",
  ];

  for (const hex of paletteColors) {
    await prisma.paletteColor.create({
      data: {
        hex,
        name: `Color ${hex}`,
      },
    });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
