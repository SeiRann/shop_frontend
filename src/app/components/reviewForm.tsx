interface ReviewFormProps {
    product_id: string;
}

export default function ReviewForm(props: ReviewFormProps) {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/3">
                <h1 className="text-2xl">Write a review!</h1>
                <label htmlFor="title" className="text-xl">
                    Title
                </label>
                <input type="text" name="title" className="bg-amber-200" />
                <label htmlFor="reviewText">Text</label>
                <input
                    type="text"
                    name="reviewText"
                    className="h-20 bg-amber-200"
                />
                <label htmlFor="reviewScore">Score</label>
                <input
                    type="number"
                    name="reviewScore"
                    className=" bg-amber-200"
                />
                <button type="submit" className="rounded-sm bg-blue-400 p-2 ">
                    Post Review
                </button>
            </form>
        </div>
    );
}
