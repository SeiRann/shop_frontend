"use client";
import { useEffect, createContext, useContext, useState } from "react";
import { Constants } from "../constants";
import NavBar from "../components/navBar";

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
    const [loading, setLoading] = useState(true);

    const checkLoggedIn = async () => {
        const result = await fetch(`${Constants.server_url}/auth/isloggedin`, {
            credentials: "include",
            method: "GET",
        });

        if (result.ok) {
            setIsLoggedIn(true);
        }
    };

    const checkAdmin = async () => {
        const result = await fetch(`${Constants.server_url}/auth/admin`, {
            method: "GET",
            credentials: "include",
        });
        if (result.ok) {
            setIsAdmin(true);
        }
    };

    useEffect(() => {
        checkAdmin();
        checkLoggedIn().finally(() => setLoading(false));
    }, []);

    return (
        <GlobalContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }}
        >
            <NavBar />
            {loading ? <div>loading...</div> : children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context)
        throw new Error("useGlobalContext must be used inside GlobalProvider");
    return context;
}
