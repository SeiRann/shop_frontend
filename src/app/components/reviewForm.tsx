import { Constants } from "../constants";
import { redirect, useRouter } from "next/navigation";
import { useGlobalContext } from "../context/globalContext";

interface ReviewFormProps {
    product_id: string;
    refetchReviews: () => void;
}

export default function ReviewForm(props: ReviewFormProps) {
    const globalContext = useGlobalContext();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        formData.append("product_id", props.product_id);
        console.log(formData);

        const data = {
            review_title: formData.get("review_title"),
            review_score: formData.get("review_score"),
            review_text: formData.get("review_text"),
            product_id: formData.get("product_id"),
        };

        const result = await fetch(`${Constants.server_url}/review/`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });

        if (result.ok) {
            console.log("Review created");
            console.log(Constants.client_url);
            props.refetchReviews();
        } else {
            console.error("Failed creating the review");
        }
    };

    if (globalContext.isLoggedIn) {
        return (
            <div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 w-1/3"
                >
                    <h1 className="text-2xl">Write a review!</h1>
                    <label htmlFor="review_title" className="text-xl">
                        Title
                    </label>
                    <input
                        type="text"
                        name="review_title"
                        className="bg-amber-200"
                    />
                    <label htmlFor="review_text">Text</label>
                    <input
                        type="text"
                        name="review_text"
                        className="h-20 bg-amber-200"
                    />
                    <label htmlFor="review_score">Score</label>
                    <input
                        type="number"
                        name="review_score"
                        className=" bg-amber-200"
                    />
                    <button
                        type="submit"
                        className="rounded-sm bg-blue-400 p-2 "
                        onClick={props.refetchReviews}
                    >
                        Post Review
                    </button>
                </form>
            </div>
        );
    } else {
        return (
            <div>
                <button
                    onClick={() => router.push("/account/")}
                    className="bg-yellow-400 p-2 rounded-md"
                >
                    Log in to write a review !
                </button>
            </div>
        );
    }
}
