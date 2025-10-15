"use client";

import { AppProvider } from "../contexts/AppContext";
import AppContent from "../components/AppContent";

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
