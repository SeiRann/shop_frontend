import { IProduct } from "@/app/components/productViewCard";
import Image from "next/image";
import ReviewForm from "./reviewForm";

interface productPageProps {
    product: IProduct;
}

export default function ProductPage({ product }: productPageProps) {
    return (
        <div>
            <div className="flex justify-evenly gap-10 p-4 ">
                <Image
                    className="rounded-md"
                    height={400}
                    width={400}
                    src={product.image}
                    alt=""
                />
                <div className="flex flex-col">
                    <h1 className="text-3xl">Product Details</h1>
                    <h1>Title: {product.title}</h1>
                    <p>Price: {product.price}</p>
                    <p>Stock: {product.stock}</p>
                    <p>Sizes: {product.sizes}</p>
                    <button className="p-1 bg-green-400 rounded-md">
                        Buy Now
                    </button>
                </div>
            </div>
            <div>
                <h1 className="text-4xl">Description</h1>
                <p>{product.description}</p>
            </div>
            <div>
                <h1>ReviewPart</h1>
                <ReviewForm product_id={product.product_id} />
            </div>
        </div>
    );
}
