"use client";
import DeleteProductForm from "@/app/components/deleteProductForm";
import { useParams } from "next/navigation";

export default function ADeleteProductByIDPage() {
    const product_id = useParams<{ id: string }>().id;

    return (
        <div>
            <DeleteProductForm props={{ product_id }} />
        </div>
    );
}
