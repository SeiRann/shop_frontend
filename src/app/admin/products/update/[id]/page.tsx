"use client";
import { Constants } from "@/app/constants";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { IProduct } from "@/app/components/productViewCard";
import UpdateProductForm from "@/app/components/updateProductForm";

export default function AUpdateProductByIDPage() {
    const params = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<IProduct | null>(null);

    const fetchProduct = async () => {
        try {
            const result = await fetch(
                `${Constants.server_url}/product/${params.id}`,
                {
                    method: "GET",
                    credentials: "include",
                },
            );

            if (result.ok) {
                const data: IProduct = await result.json();
                setProduct(data);
            } else {
                console.error("Failed to fetch product");
            }
        } catch (err) {
            console.error("Error fetching product:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchProduct();
        }
    }, [params.id]);

    useEffect(() => {
        if (product) {
            console.log("Updated product:", product);
        }
    }, [product]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <UpdateProductForm product={product} />
        </div>
    );
}
