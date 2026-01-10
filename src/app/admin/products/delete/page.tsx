import ProductDeleteForm from "@/app/components/deleteProductForm";

export default function AProductDeletePage() {
    return (
        <div>
            <ProductDeleteForm props={{ product_id: "" }} />
        </div>
    );
}
