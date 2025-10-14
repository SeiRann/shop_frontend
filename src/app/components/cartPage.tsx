"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/globalContext";
import ProductListView from "./productListView";

export default function CartPage() {
    const { cart, fetchCartProducts } = useGlobalContext();
    const [products, setProducts] = useState<{}>();

    useEffect(() => {
        console.log(fetchCartProducts());
    }, []);

    return <div></div>;
}
