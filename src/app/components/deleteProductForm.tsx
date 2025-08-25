"use client";

export default function ProductDeleteForm() {
  const onDeleteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      product_id: formData.get("product_id"),
    };

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/${data.product_id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );

    if (result.ok) {
      console.log("Product Successfully deleted");
    } else {
      console.error("Failed Deleteing Product");
    }
  };

  return (
    <div className="w-1/3">
      <form onSubmit={onDeleteSubmit}>
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl">Product Deletion Form</h1>
          <label htmlFor="product_id">Product ID</label>
          <input type="text" name="product_id" className="bg-amber-200" />
          <button className="bg-red-500 rounded-sm">Delete Product</button>
        </div>
      </form>
    </div>
  );
}
