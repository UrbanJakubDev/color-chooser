import BigColorDisplay from "./BigColorDisplay";
import DisplayPot from "./DisplayPot";
import DisplayVase from "./DisplayVase";
import { useAppContext } from "../contexts/AppContext";

interface DisplayCardProps {
  handleDrop: (e: React.DragEvent, type: "miska" | "telo" | "vase") => void;
  handleDragOver: (e: React.DragEvent) => void;
  updateColor: (type: "miska" | "telo" | "vase", color: string) => void;
}

export default function DisplayCard({
  handleDrop,
  handleDragOver,
  updateColor,
}: DisplayCardProps) {
  const { selectedProduct } = useAppContext();
  return (
    <div className="p-8 mb-6 bg-white rounded-xl shadow-lg">
      <div
        className={`grid gap-6 ${
          selectedProduct === "pot" ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {/* Pro květináče: Miska a Tělo */}
        {selectedProduct === "pot" ? (
          <>
            <BigColorDisplay
              handleDrop={handleDrop}
              handleDragOver={handleDragOver}
              kind="miska"
              onColorChange={updateColor}
            />
            <BigColorDisplay
              handleDrop={handleDrop}
              handleDragOver={handleDragOver}
              kind="telo"
              onColorChange={updateColor}
            />
          </>
        ) : (
          /* Pro vázy: Pouze barva vázy */
          <BigColorDisplay
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            kind="vase"
            onColorChange={updateColor}
          />
        )}
      </div>

      {/* Kombinovaný náhled s obrázkem produktu */}
      <div className="mt-8 text-center">
        <h3 className="mb-4 text-lg font-medium text-gray-700">
          Kombinovaný náhled
        </h3>
        <div className="flex justify-center">
          {selectedProduct === "pot" && <DisplayPot />}
          {selectedProduct === "vase" && <DisplayVase />}
        </div>
      </div>
    </div>
  );
}
