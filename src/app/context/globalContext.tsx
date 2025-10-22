"use client";
import { useEffect, createContext, useContext, useState } from "react";
import { Constants } from "../constants";
import NavBar from "../components/navBar";

type GlobalContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (val: boolean) => void;
    isAdmin: boolean;
    setIsAdmin: (val: boolean) => void;
    cart: Map<string, number>;
    addToCart: (product_id: string) => void;
    fetchCartProducts: () => {};
    cartTotalQuantity: number;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState<Map<string, number>>(new Map());
    const [cartTotalQuantity, setCartQuantity] = useState(0);

    const addToCart = (product_id: string) => {
        setCart((prev) => {
            const newCart = new Map(prev);
            const qty = newCart.get(product_id) ?? 0; // fallback to 0 if undefined
            newCart.set(product_id, qty + 1);
            setCartQuantity(cartTotalQuantity + 1);
            return newCart;
        });
    };

    // console.log(cart);

    const fetchCartProducts = async () => {
        const ids = cart.keys().toArray();

        if (ids.length == 0) {
            return console.error("Cart is empty");
        } else {
            const products = await fetch(
                `${Constants.server_url}/product/many`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        ids: ids,
                    }),
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            return await products.json();
        }
    };

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
            value={{
                isLoggedIn,
                setIsLoggedIn,
                isAdmin,
                setIsAdmin,
                cart,
                addToCart,
                fetchCartProducts,
                cartTotalQuantity,
            }}
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
