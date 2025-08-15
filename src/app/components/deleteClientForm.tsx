"use client";

export default function DeleteClientForm() {
  const onDeleteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      client_id: formData.get("client_id"),
    };

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/client/${data.client_id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (result.ok) {
      console.log("Client Successfully deleted");
    } else {
      console.error("Failed Deleteing Client");
    }
  };

  return (
    <div className="w-1/3">
      <form onSubmit={onDeleteSubmit}>
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl">Client Deletion Form</h1>
          <label htmlFor="clientid">Client ID</label>
          <input type="text" name="client_id" className="bg-amber-200" />
          <button className="bg-red-500 rounded-sm">
            Delete Client Account
          </button>
        </div>
      </form>
    </div>
  );
}
