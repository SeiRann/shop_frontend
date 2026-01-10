import Link from "next/link";

export default function ClientsAdminPage() {
    return (
        <div>
            <h1>Clients Admin Page</h1>
            <Link href="/admin/clients/create">Create</Link>
            <Link href="/admin/clients/delete">Delete</Link>
            <Link href="/admin/clients/update">Update</Link>
        </div>
    );
}
