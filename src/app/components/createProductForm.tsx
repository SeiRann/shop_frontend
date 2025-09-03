"use client"; // make this a client component
import { useRouter } from "next/navigation";

// interface ICreateProduct {
//   file:
//   description: string;
//   title: string;
//   stock: number;
//   sizes: string;
// }

export default function CreateProductForm() {
    const router = useRouter();
    const onProductCreateSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault(); // prevent page reload

        const formData = new FormData(e.currentTarget);
        const rawSizes = formData.get("sizes");
        let parsedSizes: string | undefined;

        if (typeof rawSizes === "string") {
            parsedSizes = parseSizes(rawSizes);
            if (parsedSizes) {
                formData.set("sizes", parsedSizes);
            }
        }

        console.log(formData.get("file"));
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/`, {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        if (res.ok) {
            console.log("Product created successfully!");
            router.back();
        } else {
            console.log(formData);
            console.error("Error creating product");
        }
    };

    const parseSizes = (sizes: string) => {
        if (sizes) {
            const clothesSizeRegex =
                /^(?:\d{1,2}|XS|S|M|L|XL|XXL|XXXL|MXS|MS|MM|ML|MXL|WXS|WS|WM|WL|WXL|YXS|YS|YM|YL|YXL)(?:,(?:\d{1,2}|XS|S|M|L|XL|XXL|XXXL|MXS|MS|MM|ML|MXL|WXS|WS|WM|WL|WXL|YXS|YS|YM|YL|YXL))*$/;

            sizes = sizes.toUpperCase();
            console.log(sizes);
            if (clothesSizeRegex.test(sizes)) {
                const sizesArray = sizes.split(",");
                return JSON.stringify(sizesArray);
            } else {
                console.error("Improper format");
                return "";
            }
        }
    };

    return (
        <div className="w-1/3">
            <form onSubmit={onProductCreateSubmit}>
                <div className="flex flex-col gap-3">
                    <h1 className="text-3xl">Product Creation Form</h1>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" className="bg-amber-200" />
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        className="bg-amber-200"
                    />
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name="description"
                        className="bg-amber-200"
                    />
                    <label htmlFor="stock">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        className="bg-amber-200"
                    />
                    <label htmlFor="sizes">Sizes</label>
                    <input type="text" name="sizes" className="bg-amber-200" />
                    <label htmlFor="sizes">Product Image</label>
                    <input type="file" name="file" className="bg-amber-200" />
                    <button type="submit" className="bg-blue-500 rounded-sm">
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
}
