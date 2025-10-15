import { useAppContext } from "../contexts/AppContext";

export default function ProductSwitch() {
  const { selectedProduct, setSelectedProduct } = useAppContext();

  return (
    <div className="flex justify-center mb-8">
      <div className="p-1 bg-white rounded-lg border-2 border-gray-200 shadow-lg">
        <button
          onClick={() => setSelectedProduct("pot")}
          className={`px-6 py-3 rounded-md font-medium transition-all ${
            selectedProduct === "pot"
              ? "bg-green-500 text-white shadow-md"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          🪴 Květináč
        </button>
        <button
          onClick={() => setSelectedProduct("vase")}
          className={`px-6 py-3 rounded-md font-medium transition-all ${
            selectedProduct === "vase"
              ? "bg-green-500 text-white shadow-md"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          🏺 Váza
        </button>
      </div>
    </div>
  );
}
