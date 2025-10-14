import { IProduct } from "./productViewCard";
import Image from "next/image";

interface IProductListViewProps {
    key: string;
    product: IProduct;
    product_amount: number;
}

export default function ProductListView(props: IProductListViewProps) {
    return (
        <div className="flex justify-between" key={props.key}>
            <Image width={200} height={200} src={props.product.image} alt="" />
            <div className="flex flex-col gap-0.5">
                <p>{props.product.title}</p>
                <p>{props.product.description}</p>
                <p>{props.product.stock}</p>
                <p>{props.product.price}</p>
            </div>
            <p>Amount:{props.product_amount}</p>
        </div>
    );
}
