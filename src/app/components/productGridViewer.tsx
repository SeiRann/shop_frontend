"use client";
import { useEffect, useState } from "react";
import { Constants } from "../constants";
import { IProduct, ProductViewCard } from "./productViewCard";
import PageSelector from "./pageSelector";

export default function ProductGridViewer() {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [lastPage, setLastPage] = useState<number>();
    const fetchProducts = async (page: number) => {
        const result = await fetch(
            `${Constants.server_url}/product/page/${page}`,
            {
                method: "GET",
                credentials: "include",
            },
        );

        if (result.ok) {
            setProducts(await result.json());
        }
    };

    useEffect(() => {
        fetchProducts(page).finally(() => setLoading(false));
    }, [page]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full p-5">
            <h1>Products Viewer</h1>
            <div className="grid grid-cols-6 gap-2">
                {products.map((product: IProduct) => (
                    <ProductViewCard
                        key={product.product_id}
                        image={product.image}
                        title={product.title}
                        description={product.description}
                        sizes={product.sizes}
                        stock={product.stock}
                        price={product.price}
                        product_id={product.product_id}
                    />
                ))}
            </div>
            <PageSelector
                currentPage={page}
                length={products.length}
                setPage={setPage}
                setLoading={setLoading}
                lastPage={lastPage}
            />
        </div>
    );
}
