"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/globalContext";
import ProductListView from "./productListView";
import { IProduct } from "./productViewCard";

interface CartItem {
    product: IProduct;
    product_amount: number;
}

export default function CartPage() {
    const { fetchCartProducts, cart } = useGlobalContext();
    const [products, setProducts] = useState<CartItem[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            const result = await fetchCartProducts();
            console.log("Fetched products:", result);

            const productsArray: CartItem[] = Object.values(result).map(
                (cartItem: any) => ({
                    product: cartItem.product ?? cartItem, // handle different backend shapes
                    product_amount: cart.has(cartItem.product_id)
                        ? cart.get(cartItem.product_id)
                        : 0,
                }),
            );

            setProducts(productsArray);
        };

        loadProducts();
    }, []);

    return (
        <div>
            {products.map((cartItem) => (
                <ProductListView
                    key={cartItem.product.product_id}
                    product={cartItem.product}
                    product_amount={cartItem.product_amount}
                />
            ))}

            <form action="/api/checkout_sessions" method="POST">
                <section>
                    <button type="submit" role="link">
                        Checkout
                    </button>
                </section>
            </form>
        </div>
    );
}
