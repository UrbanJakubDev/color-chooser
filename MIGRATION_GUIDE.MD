Samozřejmě! Zde je kompletní migrační guide v Markdown formátu:

```markdown
# 🔄 **Migrace stávajícího projektu na Next.js**

## 📋 **Přehled migrace**

Migrujeme současnou React aplikaci na Next.js App Router s databází, zachováme všechny komponenty a funkcionality.

---

## 🎯 **Fáze 1: Přidání Next.js do stávajícího projektu**

### **1.1 Instalace Next.js závislostí**
```bash
# V současném projektu
npm install next@latest react@latest react-dom@latest
npm install prisma @prisma/client
npm install @types/node

# Odstranění react-scripts
npm uninstall react-scripts
```

### **1.2 Aktualizace package.json**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:seed": "tsx prisma/seed.ts"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "prisma": "^5.0.0",
    "@prisma/client": "^5.0.0",
    "react-colorful": "^5.6.1",
    "typescript": "^5.0.0"
  }
}
```

---

## 🏗️ **Fáze 2: Restrukturalizace pro Next.js**

### **2.1 Nová struktura složek**
```
color-chooser/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── globals.css        # Tailwind CSS
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/            # Stávající komponenty (zachovat)
│   ├── contexts/             # Stávající contexty (zachovat)
│   ├── lib/                  # Nové utility
│   └── types/                # TypeScript typy
├── prisma/                   # Database schema
├── public/                   # Statické soubory
└── next.config.js           # Next.js konfigurace
```

### **2.2 Next.js konfigurace**
**`next.config.js`:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
```

---

## 🗄️ **Fáze 3: Database Setup**

### **3.1 Prisma inicializace**
```bash
# V root složce projektu
npx prisma init
```

### **3.2 Prisma schema**
**`prisma/schema.prisma`:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model PotColor {
  id          Int      @id @default(autoincrement())
  name        String
  hex         String   @db.VarChar(7)
  rgb         Int[]
  description String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  
  @@map("pot_colors")
}

model VaseColor {
  id          Int      @id @default(autoincrement())
  name        String
  hex         String   @db.VarChar(7)
  rgb         Int[]
  description String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  
  @@map("vase_colors")
}

model ColorCombination {
  id        Int      @id @default(autoincrement())
  tema      String
  miska     String
  telo      String
  hexMiska  String   @db.VarChar(7)
  hexTelo   String   @db.VarChar(7)
  rgbMiska  Int[]
  rgbTelo   Int[]
  userId    String?
  isPublic  Boolean  @default(false)
  createdAt DateTime @default(now())
  
  @@map("color_combinations")
}
```

### **3.3 Environment proměnné**
**`.env.local`:**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/color_chooser"
```

---

## 🌐 **Fáze 4: Next.js App Router Setup**

### **4.1 Root Layout**
**`src/app/layout.tsx`:**
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Color Chooser - Kombinace barev květináčů',
  description: 'Aplikace pro vizualizaci kombinací barev květináčů',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
```

### **4.2 Home Page**
**`src/app/page.tsx`:**
```typescript
'use client'

import { AppProvider } from '@/contexts/AppContext'
import AppContent from '@/components/AppContent'

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
```

### **4.3 Globals CSS**
**`src/app/globals.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Zachovat stávající styly z App.css */
```

---

## 🔧 **Fáze 5: Migrace komponent**

### **5.1 AppContent komponenta**
**`src/components/AppContent.tsx`:**
```typescript
'use client'

import React, { useState } from "react";
import ColourPallete from "./ColourPallete";
import CombinationList from "./CombinationList";
import VaseColorList from "./VaseColorList";
import ProductSwitch from "./ProductSwitch";
import DisplayCard from "./DisplayCard";
import { useAppContext } from "../contexts/AppContext";
import ChangeColorsButton from "./ChangeColorsButton";

export default function AppContent() {
  const {
    selectedCombination,
    setSelectedCombination,
    selectedProduct,
    setSelectedProduct,
    combinations,
    setCombinations,
    selectedVaseColor,
    setSelectedVaseColor,
    loading
  } = useAppContext();
  
  const [draggedColor, setDraggedColor] = useState<string | null>(null);

  // Zachovat všechny stávající funkce...
  const updateColor = (type: "miska" | "telo" | "vase", color: string) => {
    // Stávající logika...
  };

  const hexToRgb = (hex: string): [number, number, number] => {
    // Stávající logika...
  };

  const swapColors = () => {
    // Stávající logika...
  };

  // Drag & Drop funkce...
  const handleDragStart = (color: string) => {
    setDraggedColor(color);
  };

  const handleDragEnd = () => {
    setDraggedColor(null);
  };

  const handleDrop = (e: React.DragEvent, targetType: "miska" | "telo" | "vase") => {
    e.preventDefault();
    if (draggedColor) {
      updateColor(targetType, draggedColor);
      setDraggedColor(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
          <p className="mt-4 text-gray-600">Načítání...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-4xl font-bold text-center text-gray-800">
          🎨 Color Chooser - Kombinace barev
        </h1>

        <ProductSwitch />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Stávající logika pro zobrazení komponent... */}
        </div>
      </div>
    </div>
  );
}
```

### **5.2 Aktualizovaný AppContext**
**`src/contexts/AppContext.tsx`:**
```typescript
'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { ColorCombination, PotColor, VaseColor } from "@/types"

interface AppContextType {
  selectedCombination: ColorCombination | null
  setSelectedCombination: (combination: ColorCombination) => void
  selectedProduct: "pot" | "vase"
  setSelectedProduct: (product: "pot" | "vase") => void
  combinations: ColorCombination[]
  setCombinations: (combinations: ColorCombination[]) => void
  selectedVaseColor: VaseColor | null
  setSelectedVaseColor: (color: VaseColor) => void
  potColors: PotColor[]
  vaseColors: VaseColor[]
  loading: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [selectedCombination, setSelectedCombination] = useState<ColorCombination | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<"pot" | "vase">("pot")
  const [combinations, setCombinations] = useState<ColorCombination[]>([])
  const [selectedVaseColor, setSelectedVaseColor] = useState<VaseColor | null>(null)
  const [potColors, setPotColors] = useState<PotColor[]>([])
  const [vaseColors, setVaseColors] = useState<VaseColor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Načtení dat z API místo localStorage
    Promise.all([
      fetch('/api/combinations').then(res => res.json()),
      fetch('/api/colors/pot').then(res => res.json()),
      fetch('/api/colors/vase').then(res => res.json())
    ]).then(([combinations, potColors, vaseColors]) => {
      setCombinations(combinations)
      setPotColors(potColors)
      setVaseColors(vaseColors)
      
      if (combinations.length > 0) {
        setSelectedCombination(combinations[0])
      }
      if (vaseColors.length > 0) {
        setSelectedVaseColor(vaseColors[0])
      }
      
      setLoading(false)
    }).catch(error => {
      console.error('Failed to load data:', error)
      setLoading(false)
    })
  }, [])

  const value: AppContextType = {
    selectedCombination,
    setSelectedCombination,
    selectedProduct,
    setSelectedProduct,
    combinations,
    setCombinations,
    selectedVaseColor,
    setSelectedVaseColor,
    potColors,
    vaseColors,
    loading
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
```

---

## 🌐 **Fáze 6: API Routes**

### **6.1 Barvy API**
**`src/app/api/colors/pot/route.ts`:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const colors = await prisma.potColor.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(colors)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch colors' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, hex, rgb, description } = body

    const color = await prisma.potColor.create({
      data: { name, hex, rgb, description }
    })

    return NextResponse.json(color, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create color' }, { status: 500 })
  }
}
```

**`src/app/api/colors/vase/route.ts`:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const colors = await prisma.vaseColor.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(colors)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch colors' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, hex, rgb, description } = body

    const color = await prisma.vaseColor.create({
      data: { name, hex, rgb, description }
    })

    return NextResponse.json(color, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create color' }, { status: 500 })
  }
}
```

### **6.2 Kombinace API**
**`src/app/api/combinations/route.ts`:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const combinations = await prisma.colorCombination.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(combinations)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch combinations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tema, miska, telo, hexMiska, hexTelo, rgbMiska, rgbTelo } = body

    const combination = await prisma.colorCombination.create({
      data: { tema, miska, telo, hexMiska, hexTelo, rgbMiska, rgbTelo }
    })

    return NextResponse.json(combination, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create combination' }, { status: 500 })
  }
}
```

---

## 🔄 **Fáze 7: Aktualizace komponent pro API**

### **7.1 CombinationList - nahradit localStorage za API**
```typescript
// V CombinationList.tsx nahradit:
const addNewCombination = async () => {
  if (!newCombination.tema || !newCombination.miska || !newCombination.telo) {
    alert("Vyplňte všechna pole!");
    return;
  }

  try {
    const response = await fetch('/api/combinations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tema: newCombination.tema,
        miska: newCombination.miska,
        telo: newCombination.telo,
        hexMiska: newCombination.hexMiska,
        hexTelo: newCombination.hexTelo,
        rgbMiska: hexToRgb(newCombination.hexMiska),
        rgbTelo: hexToRgb(newCombination.hexTelo)
      })
    });

    if (response.ok) {
      const newCombo = await response.json();
      setCombinations([...combinations, newCombo]);
      onCombinationSelect(newCombo);
      setShowAddForm(false);
      // Reset formuláře...
    }
  } catch (error) {
    console.error('Failed to save combination:', error);
  }
};
```

### **7.2 VaseColorList - podobně**
```typescript
// V VaseColorList.tsx nahradit localStorage logiku za API calls
const addNewColor = async () => {
  // Podobná logika jako výše...
};
```

---

## 🚀 **Fáze 8: Deployment**

### **8.1 Vercel Postgres**
1. Vercel Dashboard → Storage → Create Database
2. Zkopírovat connection string
3. Přidat do Environment Variables

### **8.2 Build a deploy**
```bash
# Test build
npm run build

# Deploy
vercel --prod
```

---

## ✅ **Výhody této migrace**

- **Zachování** všech stávajících komponent
- **Postupná migrace** - můžeš migrovat po částech
- **Zachování** designu a funkcionalit
- **Přidání** databáze a API
- **Lepší** performance a SEO
- **Škálovatelnost** pro budoucí rozšíření

---

## 📝 **Checklist pro dokončení**

- [ ] Next.js závislosti nainstalovány
- [ ] Package.json aktualizován
- [ ] Struktura složek přeorganizována
- [ ] Prisma schema vytvořeno
- [ ] API routes implementovány
- [ ] Komponenty migrovány
- [ ] Context aktualizován
- [ ] Database připojena
- [ ] Aplikace deployována
- [ ] Testování funkcionalit

---

## 🎯 **Výsledek**

Po dokončení budeš mít:
- **Centralizovanou databázi** barev a kombinací
- **API pro správu** dat
- **Admin možnosti** pro přidávání barev
- **Perzistentní ukládání** kombinací
- **Škálovatelné řešení** pro budoucí rozšíření
- **Zachování** všech stávajících funkcionalit
```

Můžeš si to zkopírovat do souboru `MIGRATION_GUIDE.md` v root složce tvého projektu! 📝