"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/globalContext";
import ProductListView from "./productListView";
import { IProduct } from "./productViewCard";

export interface CartItem {
    product: IProduct;
    product_amount: number;
}

export default function CartPage() {
    const { fetchCartProducts, cart } = useGlobalContext();
    const [products, setProducts] = useState<CartItem[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            const result = await fetchCartProducts();

            const productsArray: CartItem[] = Object.values(result).map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (cartItem: any) => ({
                    product: cartItem.product ?? cartItem,
                    product_amount: cart.get(cartItem.product_id) ?? 0,
                }),
            );

            setProducts(productsArray);
        };

        loadProducts();
    }, [fetchCartProducts, cart]);

    // Wait until products are loaded
    if (products.length === 0) {
        return <div>Loading cart...</div>;
    }

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
                {/* Only render this once products are ready */}
                <input
                    type="hidden"
                    name="products"
                    value={JSON.stringify(products)}
                />
                <section>
                    <button type="submit" role="link">
                        Checkout
                    </button>
                </section>
            </form>
        </div>
    );
}
