import { NextResponse } from "next/server";
import { stripe } from "@/app/lib/stripe";
import { Constants } from "@/app/constants";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const productsRaw = formData.get("products");
        if (!productsRaw) {
            throw new Error("No products found in request body.");
        }

        const products = JSON.parse(productsRaw);
        if (!Array.isArray(products) || products.length === 0) {
            throw new Error("Products list is empty or invalid.");
        }

        console.log(products);
        const productAmounts = products.map((product) => ({
            id: product.product.product,
            amount: product.product_amount,
        }));

        const line_items = products.map((item) => {
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
                    },
                    unit_amount: Math.round(p.price * 100),
                },
                quantity: item.product_amount,
            };
        });

        const createOrder = await fetch(`${Constants.server_url}/order/`, {
            method: "POST",
            body: {
                status: "waiting payment",
                address: "",
            },
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${Constants.client_url}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${Constants.client_url}/cancel`,
            shipping_address_collection: {
                allowed_countries: ["US", "CA", "GB"], // only allow these countries
            },
            metadata: {
                //send user id
            },
        });

        const res = NextResponse.redirect(session.url, 303);
        res.cookies.set("orderData", JSON.stringify(productAmounts));
        return res;
    } catch (err) {
        console.error("Stripe checkout error:", err);
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 },
        );
    }
}
