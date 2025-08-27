export interface IProduct {
    product_id: string;
    title: string;
    image: string;
    description: string;
    sizes: string[];
    stock: number;
}

import Image from "next/image";

export function ProductViewCard(product: IProduct) {
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
            <p>{product.product_id}</p>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>{product.stock}</p>
            <p>{parseSizes(product.sizes)}</p>
        </div>
    );
}
