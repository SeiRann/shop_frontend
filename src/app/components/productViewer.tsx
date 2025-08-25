"use client";
import { useEffect, useState } from "react";
import { Constants } from "../constants";
import { IProduct, ProductViewCard } from "./productViewCard";

export default function ProductViewer() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const result = await fetch(`${Constants.server_url}/product/${page}`, {
      method: "GET",
      credentials: "include",
    });

    if (result.ok) {
      setProducts(await result.json());
    }
  };

  useEffect(() => {
    fetchProducts().finally(() => setLoading(false));
  }, []);

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
            product_id={product.product_id}
          />
        ))}
      </div>
    </div>
  );
}
