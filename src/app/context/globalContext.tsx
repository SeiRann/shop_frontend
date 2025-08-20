"use client";

import { createContext, useContext } from "react";

export const GlobalContext = createContext<{ isLoggedIn: false }>({
  isLoggedIn: false,
});

export function useGlobalContext() {
  return useContext(GlobalContext);
}
