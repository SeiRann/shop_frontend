import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../lib/stripe";
import { Constants } from "@/app/constants";

export async function POST() {
    try {
        const headersList = await headers();
        const origin = headersList.get("origin");

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Test",
                            description: "product.description",
                            // optional: images: [product.imageUrl],
                        },
                        unit_amount: Math.round(5 * 100), // convert $ to cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${Constants.client_url}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${Constants.client_url}/cancel`,
            metadata: {
                productId: 1, // helpful for your webhook
            },
        });
        return NextResponse.redirect(session.url, 303);
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 },
        );
    }
}
