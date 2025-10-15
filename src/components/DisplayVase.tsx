import { useAppContext } from "../contexts/AppContext";

export default function DisplayVase() {
  const { selectedVaseColor } = useAppContext();

  return (
    <div className="relative w-[800px] h-[400px]">
      {/* Základní obrázek vázy */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/vase.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
        }}
      ></div>

      {/* Váza s vybranou barvou */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: selectedVaseColor.hex,
          maskImage: "url('/vase.png')",
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskImage: "url('/vase.png')",
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          mixBlendMode: "multiply",
        }}
      ></div>
    </div>
  );
}
