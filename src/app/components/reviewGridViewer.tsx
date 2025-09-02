"use client";
import { useState } from "react";
import { Constants } from "../constants";

interface ReviewGridViewerProps {
    product_id: string;
}

export default function ReviewGridViewer(props: ReviewGridViewerProps) {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const result = await fetch(
            `${Constants.server_url}/review/${props.product_id}`,
            {
                method: "GET",
                credentials: "include",
            },
        );
    };

    return <div></div>;
}
