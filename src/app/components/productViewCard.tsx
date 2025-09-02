import Image from "next/image";
import { useRouter } from "next/navigation";

export interface IProduct {
    product_id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    sizes: string[];
    stock: number;
}

export function ProductViewCard(product: IProduct) {
    const router = useRouter();
    const parseSizes = (sizes: Array<string>) => {
        let sizesString = "";

        sizes.forEach((size) => (sizesString += size + ", "));
        return sizesString;
    };

    return (
        <div className="bg-amber-200 rounded-md w-2xs p-2 hover:cursor-pointer">
            <div
                onClick={() => {
                    router.push(`/admin/products/${product.product_id}`);
                }}
            >
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
                <p>{product.price}</p>
                <p>{parseSizes(product.sizes)}</p>
            </div>
            <div className="flex justify-evenly gap-1 w-full ">
                <button
                    className="p-2 rounded-md w-full bg-blue-400 hover:cursor-pointer"
                    onClick={() =>
                        router.push(
                            "/admin/products/update/" + product.product_id,
                        )
                    }
                >
                    Update
                </button>
                <button
                    className="p-2 rounded-md w-full bg-red-400 hover:cursor-pointer"
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
