"use client";

import { createContext, useContext } from "react";

type ColorModeContextType = {
  mode: "light" | "dark";
  toggle: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>({
  mode: "dark",
  toggle: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);
