import Link from "next/link";
export default function ProductsAdminPage() {
  return (
    <div>
      <h1>Products Admin Page</h1>
      <Link href="/admin/products/create">Create</Link>
    </div>
  );
}
