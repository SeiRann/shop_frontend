interface ReviewViewCardProps {
    review_title: string;
    review_text: string;
    review_score: number;
    key: string;
}

export default function ReviewViewCard(props: ReviewViewCardProps) {
    return (
        <div className="flex flex-col gap-1 bg-blue-300 rounded-md p-4">
            <h1 className="text-3xl">{props.review_title}</h1>
            <p className="text-xl text-pink-700">{props.review_score}</p>
            <p>{props.review_text}</p>
        </div>
    );
}
