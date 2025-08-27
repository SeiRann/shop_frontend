export interface IProduct {
    product_id: string;
    title: string;
    image: string;
    description: string;
    sizes: string[];
    stock: number;
}

import Image from "next/image";
import { useRouter } from "next/navigation";

export function ProductViewCard(product: IProduct) {
    const router = useRouter();
    const parseSizes = (sizes: Array<string>) => {
        let sizesString = "";

        sizes.forEach((size) => (sizesString += size + ", "));
        return sizesString;
    };

    return (
        <div className="bg-amber-200 rounded-md w-2xs p-2">
            <Image
                className="rounded-md"
                width={300}
                height={300}
                src={product.image}
                alt=""
            />
            <p className="text-xs">{product.product_id}</p>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>{product.stock}</p>
            <p>{parseSizes(product.sizes)}</p>
            <div className="flex gap-2">
                <button
                    className="p-2 rounded-md bg-blue-400"
                    onClick={() =>
                        router.push(
                            "/admin/products/update/" + product.product_id,
                        )
                    }
                >
                    Update
                </button>
                <button
                    className="p-2 rounded-md bg-red-400"
                    onClick={() =>
                        router.push(
                            "/admin/products/delete/" + product.product_id,
                        )
                    }
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
