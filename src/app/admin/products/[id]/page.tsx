"use client";
import ProductPage from "@/app/components/productPage";
import { Constants } from "@/app/constants";
import { useParams } from "next/navigation";
import { IProduct } from "@/app/components/productViewCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AProductPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProduct>();
    const [loading, setLoading] = useState(true);

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
        fetchProduct().finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    if (product) {
        return (
            <div>
                <ProductPage product={product} />
            </div>
        );
    } else {
        router.push("/not_found");
    }
}
