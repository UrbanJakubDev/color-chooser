import React from "react";
import LoginButton from "./LoginButton";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-sm text-gray-600">
          © 2024 Color Chooser - Kombinace barev květináčů
        </div>
        <LoginButton />
      </div>
    </footer>
  );
}
