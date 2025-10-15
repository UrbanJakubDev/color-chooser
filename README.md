# Color Chooser - Kombinace barev květináčů

Mini aplikace pro vizualizaci a úpravu kombinací barev květináčů.

## Funkce

- 📋 Seznam všech přednastavených kombinací barev
- 🎨 Velká vizualizační karta s oběma barvami
- 🖱️ Interaktivní color picker pro úpravu barev
- 📱 Responzivní design pro všechna zařízení
- 🔄 Real-time aktualizace při změně barev

## Instalace a spuštění

1. Nainstaluj závislosti:

```bash
npm install
```

2. Spusť aplikaci:

```bash
npm start
```

3. Otevři [http://localhost:3000](http://localhost:3000) v prohlížeči

## Použití

1. **Výběr kombinace**: Klikni na libovolnou kombinaci v levém panelu
2. **Vizualizace**: Podívej se na velkou kartu s oběma barvami
3. **Úprava barev**: Klikni na barvu misky nebo těla pro otevření color pickeru
4. **Změna**: Použij color picker pro změnu barvy v reálném čase

## Technologie

- React 18 + TypeScript
- Tailwind CSS pro styling
- react-colorful pro color picker
- Responzivní design

## Struktura dat

Každá kombinace obsahuje:

- Název misky a těla
- HEX a RGB hodnoty
- Téma kombinace
- Jedinečné ID
