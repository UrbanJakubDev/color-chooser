"use client";

import { useAppContext } from "../contexts/AppContext";

export default function DisplayPot() {
  const { selectedCombination } = useAppContext();

  if (!selectedCombination) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-[800px] h-[400px]">
      {/* Základní obrázek květináče */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/V2_screw_v4-removebg-preview.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
        }}
      ></div>

      {/* Překryvná vrstva pro tělo (horní část) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: selectedCombination.hexTelo,
          maskImage: "url('/V2_screw_v4-removebg-preview.png')",
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskImage: "url('/V2_screw_v4-removebg-preview.png')",
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          clipPath: "polygon(0% 0%, 100% 0%, 100% 49.3%, 0% 49.3%)",
          mixBlendMode: "multiply",
        }}
      ></div>

      {/* Překryvná vrstva pro misku (spodní část) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: selectedCombination.hexMiska,
          maskImage: "url('/V2_screw_v4-removebg-preview.png')",
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskImage: "url('/V2_screw_v4-removebg-preview.png')",
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          clipPath: "polygon(0% 49.3%, 100% 49.3%, 100% 100%, 0% 100%)",
          mixBlendMode: "screen",
          opacity: 0.8,
        }}
      ></div>
    </div>
  );
}
