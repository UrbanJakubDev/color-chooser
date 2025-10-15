import React, { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";

interface ColorCombination {
  id: string;
  miska: string;
  telo: string;
  hexMiska: string;
  hexTelo: string;
  rgbMiska: [number, number, number];
  rgbTelo: [number, number, number];
  tema: string;
}

interface CombinationListProps {
  selectedCombination: ColorCombination;
  onCombinationSelect: (combination: ColorCombination) => void;
  onCombinationsChange: (combinations: ColorCombination[]) => void;
}

const initialCombinations: ColorCombination[] = [
  {
    id: "1",
    miska: "Mramorová",
    telo: "Hluboká Tmavě Zelená (Jedlová)",
    hexMiska: "#D3D3D3",
    hexTelo: "#003E33",
    rgbMiska: [211, 211, 211],
    rgbTelo: [0, 62, 51],
    tema: "Elegance Lesa",
  },
  {
    id: "2",
    miska: "Mramorová",
    telo: "Spálená Oranžová / Terakota",
    hexMiska: "#D3D3D3",
    hexTelo: "#CC5500",
    rgbMiska: [211, 211, 211],
    rgbTelo: [204, 85, 0],
    tema: "Klasický Podzim",
  },
  {
    id: "3",
    miska: "Třpytivá Hnědá",
    telo: "Krémová / Světle Béžová",
    hexMiska: "#694931",
    hexTelo: "#F5F5DC",
    rgbMiska: [105, 73, 49],
    rgbTelo: [245, 245, 220],
    tema: "Teplý Kontrast",
  },
  {
    id: "4",
    miska: "Třpytivá Hnědá",
    telo: "Matná Hořčicová",
    hexMiska: "#694931",
    hexTelo: "#D4A017",
    rgbMiska: [105, 73, 49],
    rgbTelo: [212, 160, 23],
    tema: "Zlatý List",
  },
  {
    id: "5",
    miska: "Spálená Oranžová / Rezavá",
    telo: "Hluboká Petrolejová Zelená",
    hexMiska: "#B85C38",
    hexTelo: "#004D40",
    rgbMiska: [184, 92, 56],
    rgbTelo: [0, 77, 64],
    tema: "Dýňový Latté",
  },
  {
    id: "6",
    miska: "Sytá Bordó / Vínová",
    telo: "Studená Tmavě Šedá (Antracit)",
    hexMiska: "#800020",
    hexTelo: "#36454F",
    rgbMiska: [128, 0, 32],
    rgbTelo: [54, 69, 79],
    tema: "Šedý Vřes",
  },
  {
    id: "7",
    miska: "Hořčicově Žlutá / Okrová",
    telo: "Uhlově Černá (Matná)",
    hexMiska: "#E3BC3F",
    hexTelo: "#222222",
    rgbMiska: [227, 188, 63],
    rgbTelo: [34, 34, 34],
    tema: "Moderní Energická",
  },
  {
    id: "8",
    miska: "Zlatá / Měděná Metalíza",
    telo: "Tmavá Švestková / Fialová",
    hexMiska: "#B87333",
    hexTelo: "#5F456E",
    rgbMiska: [184, 115, 51],
    rgbTelo: [95, 69, 110],
    tema: "Královský Kov",
  },
];

export default function CombinationList({
  selectedCombination,
  onCombinationSelect,
  onCombinationsChange,
}: CombinationListProps) {
  const [combinations, setCombinations] =
    useState<ColorCombination[]>(initialCombinations);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [newCombination, setNewCombination] = useState({
    miska: "",
    telo: "",
    hexMiska: "#FFFFFF",
    hexTelo: "#FFFFFF",
    tema: "",
  });
  const [saveCombinationName, setSaveCombinationName] = useState("");

  const { selectedProduct } = useAppContext();

  // Nastavení barev nové kombinace na aktuálně vybrané při otevření formuláře
  const handleShowAddForm = () => {
    if (!showAddForm) {
      setNewCombination({
        ...newCombination,
        hexMiska: selectedCombination.hexMiska,
        hexTelo: selectedCombination.hexTelo,
      });
    }
    setShowAddForm(!showAddForm);
  };

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

  // Načtení kombinací z localStorage při startu
  useEffect(() => {
    const savedCombinations = localStorage.getItem("colorCombinations");
    if (savedCombinations) {
      const parsed = JSON.parse(savedCombinations);
      setCombinations(parsed);
    }
  }, []);

  // Uložení kombinací do localStorage při změně
  useEffect(() => {
    localStorage.setItem("colorCombinations", JSON.stringify(combinations));
    onCombinationsChange(combinations);
  }, [combinations, onCombinationsChange]);

  // Aktualizace barev v formuláři při změně selectedCombination
  useEffect(() => {
    if (showAddForm) {
      setNewCombination((prev) => ({
        ...prev,
        hexMiska: selectedCombination.hexMiska,
        hexTelo: selectedCombination.hexTelo,
      }));
    }
  }, [selectedCombination.hexMiska, selectedCombination.hexTelo, showAddForm]);

  const addNewCombination = () => {
    if (!newCombination.tema || !newCombination.miska || !newCombination.telo) {
      alert("Vyplňte všechna pole!");
      return;
    }

    const newCombo: ColorCombination = {
      id: Date.now().toString(),
      miska: newCombination.miska,
      telo: newCombination.telo,
      hexMiska: newCombination.hexMiska,
      hexTelo: newCombination.hexTelo,
      rgbMiska: hexToRgb(newCombination.hexMiska),
      rgbTelo: hexToRgb(newCombination.hexTelo),
      tema: newCombination.tema,
    };

    setCombinations([...combinations, newCombo]);
    onCombinationSelect(newCombo);
    setShowAddForm(false);
    setNewCombination({
      miska: "",
      telo: "",
      hexMiska: "#FFFFFF",
      hexTelo: "#FFFFFF",
      tema: "",
    });
  };

  const deleteCombination = (id: string) => {
    if (combinations.length <= 1) {
      alert("Nemůžete smazat poslední kombinaci!");
      return;
    }

    const updatedCombinations = combinations.filter((combo) => combo.id !== id);
    setCombinations(updatedCombinations);

    if (selectedCombination.id === id) {
      onCombinationSelect(updatedCombinations[0]);
    }
  };

  const resetToDefault = () => {
    setCombinations(initialCombinations);
    onCombinationSelect(initialCombinations[0]);
    localStorage.removeItem("colorCombinations");
  };

  const saveCurrentCombination = () => {
    // Kontrola, zda se aktuální kombinace liší od původních defaultních
    const isDefaultCombination = initialCombinations.some(
      (defaultCombo) =>
        defaultCombo.hexMiska === selectedCombination.hexMiska &&
        defaultCombo.hexTelo === selectedCombination.hexTelo
    );

    if (isDefaultCombination) {
      alert("Tato kombinace je již mezi defaultními kombinacemi!");
      return;
    }

    // Kontrola, zda už není stejná kombinace uložena
    const existingCombination = combinations.find(
      (combo) =>
        combo.hexMiska === selectedCombination.hexMiska &&
        combo.hexTelo === selectedCombination.hexTelo &&
        combo.id !== selectedCombination.id
    );

    if (existingCombination) {
      alert("Tato kombinace je již uložena!");
      return;
    }

    // Zobrazit formulář pro zadání názvu
    setShowSaveForm(true);
  };

  const confirmSaveCombination = () => {
    if (!saveCombinationName.trim()) {
      alert("Zadejte název kombinace!");
      return;
    }

    // Pokud je to upravená kombinace, vytvoříme novou
    const newCombo: ColorCombination = {
      id: Date.now().toString(),
      miska: selectedCombination.miska,
      telo: selectedCombination.telo,
      hexMiska: selectedCombination.hexMiska,
      hexTelo: selectedCombination.hexTelo,
      rgbMiska: selectedCombination.rgbMiska,
      rgbTelo: selectedCombination.rgbTelo,
      tema: saveCombinationName.trim(),
    };

    setCombinations([...combinations, newCombo]);
    onCombinationSelect(newCombo);
    setShowSaveForm(false);
    setSaveCombinationName("");
    alert("Kombinace byla úspěšně uložena!");
  };

  return (
    <div className={`lg:col-span-1`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Dostupné kombinace
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handleShowAddForm}
            className="px-3 py-1 text-sm text-white bg-green-500 rounded-lg transition-colors hover:bg-green-600"
          >
            {showAddForm ? "Zrušit" : "+ Přidat"}
          </button>
          <button
            onClick={resetToDefault}
            className="px-3 py-1 text-sm text-white bg-gray-500 rounded-lg transition-colors hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Formulář pro novou kombinaci */}
      {showAddForm && (
        <div className="p-4 mb-4 bg-white rounded-lg border-2 border-green-200">
          <h3 className="mb-3 font-medium text-gray-800">Nová kombinace</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Název tématu"
              value={newCombination.tema}
              onChange={(e) =>
                setNewCombination({
                  ...newCombination,
                  tema: e.target.value,
                })
              }
              className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Název misky"
              value={newCombination.miska}
              onChange={(e) =>
                setNewCombination({
                  ...newCombination,
                  miska: e.target.value,
                })
              }
              className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Název těla"
              value={newCombination.telo}
              onChange={(e) =>
                setNewCombination({
                  ...newCombination,
                  telo: e.target.value,
                })
              }
              className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex space-x-2">
              <div className="flex-1">
                <label className="block mb-1 text-sm text-gray-600">
                  Barva misky
                </label>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded border-2 border-white shadow-sm"
                    style={{ backgroundColor: newCombination.hexMiska }}
                  ></div>
                  <span className="font-mono text-sm text-gray-600">
                    {newCombination.hexMiska}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <label className="block mb-1 text-sm text-gray-600">
                  Barva těla
                </label>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded border-2 border-white shadow-sm"
                    style={{ backgroundColor: newCombination.hexTelo }}
                  ></div>
                  <span className="font-mono text-sm text-gray-600">
                    {newCombination.hexTelo}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={addNewCombination}
              className="px-4 py-2 w-full text-white bg-green-500 rounded-lg transition-colors hover:bg-green-600"
            >
              Přidat kombinaci
            </button>
          </div>
        </div>
      )}

      {/* Formulář pro uložení aktuální kombinace */}
      {showSaveForm && (
        <div className="p-4 mb-4 bg-white rounded-lg border-2 border-blue-200">
          <h3 className="mb-3 font-medium text-gray-800">
            Uložit aktuální kombinaci
          </h3>
          <div className="space-y-3">
            <div className="flex items-center mb-3 space-x-3">
              <div
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: selectedCombination.hexMiska }}
              ></div>
              <div
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: selectedCombination.hexTelo }}
              ></div>
              <span className="text-sm text-gray-600">
                {selectedCombination.hexMiska} + {selectedCombination.hexTelo}
              </span>
            </div>
            <input
              type="text"
              placeholder="Zadejte název kombinace"
              value={saveCombinationName}
              onChange={(e) => setSaveCombinationName(e.target.value)}
              className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-2">
              <button
                onClick={confirmSaveCombination}
                className="flex-1 px-4 py-2 text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600"
              >
                Uložit
              </button>
              <button
                onClick={() => {
                  setShowSaveForm(false);
                  setSaveCombinationName("");
                }}
                className="flex-1 px-4 py-2 text-white bg-gray-500 rounded-lg transition-colors hover:bg-gray-600"
              >
                Zrušit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {combinations.map((combo) => (
          <div
            key={combo.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedCombination.id === combo.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <div
                className="flex-1"
                onClick={() => onCombinationSelect(combo)}
              >
                <div className="flex items-center mb-2 space-x-3">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: combo.hexMiska }}
                  ></div>
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: combo.hexTelo }}
                  ></div>
                </div>
                <h3 className="font-medium text-gray-800">{combo.tema}</h3>
                <p className="text-sm text-gray-600">
                  {combo.miska} + {combo.telo}
                </p>
              </div>
              <button
                onClick={() => deleteCombination(combo.id)}
                className="px-2 py-1 text-xs text-white bg-red-500 rounded transition-colors hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
