"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("theme");

    const shouldUseDark =
      storedTheme === "dark" ||
      (!storedTheme && root.classList.contains("dark"));

    root.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;

    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
    setIsDark(nextDark);
  };

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={
        mounted
          ? isDark
            ? "Aktifkan light mode"
            : "Aktifkan dark mode"
          : "Toggle theme"
      }
      suppressHydrationWarning
    >
      {!mounted ? (
        <MoonStar className="h-4 w-4" />
      ) : isDark ? (
        <SunMedium className="h-4 w-4" />
      ) : (
        <MoonStar className="h-4 w-4" />
      )}
    </Button>
  );
}
