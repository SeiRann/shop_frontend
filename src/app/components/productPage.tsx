import { IProduct } from "@/app/components/productViewCard";
import Image from "next/image";

interface productPageProps {
    product: IProduct;
}

export default function ProductPage({ product }: productPageProps) {
    return (
        <div>
            <div className="flex">
                <Image height={700} width={700} src={product.image} alt="" />
                <div className="flex flex-col">
                    <h1>{product.title}</h1>
                    <p>{product.price}</p>
                    <p>{product.stock}</p>
                    <p>{product.sizes}</p>
                    <button className="p-1 bg-green-400 rounded-md">
                        Buy Now
                    </button>
                </div>
            </div>
            <div>
                <h1>Description</h1>
                <p>{product.description}</p>
            </div>
            <div>
                <h1>ReviewPart</h1>
            </div>
        </div>
    );
}
