import Link from "next/link";
import ProductViewer from "@/app/components/productViewer";
export default function ProductsAdminPage() {
    return (
        <div>
            <h1>Products Admin Page</h1>
            <Link href="/admin/products/create">Create</Link>
            <Link href="/admin/products/delete">Delete</Link>
            <Link href="/admin/products/update">Update</Link>
            <ProductViewer />
        </div>
    );
}
