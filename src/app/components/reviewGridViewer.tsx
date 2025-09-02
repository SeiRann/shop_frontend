"use client";
import { useState, useEffect } from "react";
import { Constants } from "../constants";
import ReviewViewCard from "./reviewViewCard";

interface ReviewGridViewerProps {
    product_id: string;
}

interface ReviewProperties {
    review_id: string;
    produdct_id: string;
    author_id: string;
    review_text: string;
    review_score: number;
    review_title: string;
}

export default function ReviewGridViewer(props: ReviewGridViewerProps) {
    const [reviews, setReviews] = useState<ReviewProperties[] | undefined>();
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        const result = await fetch(
            `${Constants.server_url}/review/product/${props.product_id}`,
            {
                method: "GET",
                credentials: "include",
            },
        );

        if (result.ok) {
            console.log("Fetched Reviews");
            setReviews(await result.json());
        } else {
            console.error("Failed fetching reviews");
        }
    };

    useEffect(() => {
        fetchReviews().finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-5xl">Reviews</h1>
            {reviews?.map((review) => (
                <ReviewViewCard
                    key={review.review_id}
                    review_score={review.review_score}
                    review_title={review.review_title}
                    review_text={review.review_text}
                />
            ))}
        </div>
    );
}
