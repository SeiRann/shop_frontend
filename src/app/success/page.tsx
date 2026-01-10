import { redirect } from "next/navigation";

import { stripe } from "../lib/stripe";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Success({ searchParams }: { searchParams: any }) {
    const { session_id } = await searchParams;

    if (!session_id)
        throw new Error("Please provide a valid session_id (`cs_test_...`)");

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items", "payment_intent"],
    });

    const productsOrdered = session.line_items;
    const address = session.collected_information?.shipping_details?.address;

    console.log(session.line_items?.data);

    if (session.status === "open") {
        return redirect("/");
    }

    if (session.status === "complete") {
        return (
            <section id="success">
                <p>
                    We appreciate your business! A confirmation email will be
                    sent to . If you have any questions, please email{" "}
                </p>
            </section>
        );
    }
}
