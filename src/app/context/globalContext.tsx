"use client";
import { createContext, useContext, useState } from "react";

type GlobalContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (val: boolean) => void;
    isAdmin: boolean;
    setIsAdmin: (val: boolean) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <GlobalContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context)
        throw new Error("useGlobalContext must be used inside GlobalProvider");
    return context;
}
