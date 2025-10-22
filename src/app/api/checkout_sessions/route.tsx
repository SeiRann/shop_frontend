import { NextResponse } from "next/server";
import { stripe } from "@/app/lib/stripe";
import { Constants } from "@/app/constants";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const productsRaw = formData.get("products");
        if (!productsRaw) {
            throw new Error("No products found in request body.");
        }

        const products = JSON.parse(productsRaw as string);
        if (!Array.isArray(products) || products.length === 0) {
            throw new Error("Products list is empty or invalid.");
        }

        const line_items = products.map((item: any) => {
            const p = item.product;
            if (!p?.title) {
                throw new Error(`Invalid product data: missing title`);
            }

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: p.title, // ✅ use title instead of name
                        images: p.image ? [p.image] : [],
                        description: p.description || "",
                    },
                    unit_amount: Math.round(p.price * 100),
                },
                quantity: item.product_amount,
            };
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${Constants.client_url}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${Constants.client_url}/cancel`,
        });

        return NextResponse.redirect(session.url, 303);
    } catch (err: any) {
        console.error("Stripe checkout error:", err);
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 },
        );
    }
}
