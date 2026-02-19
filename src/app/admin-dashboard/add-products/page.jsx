"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddProductPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        category: "",
        brand: "",
        price: "",
        currency: "BDT",
        sizes: [],
        color: "",
        material: "",
        title: "",
        images: "",
        sold: 0,
    });

    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSizes = (size) => {
        setForm((prev) => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter((s) => s !== size)
                : [...prev.sizes, size],
        }));
    };

    // 🔹 Image Upload to ImgBB
    const handleImageUpload = async (file) => {
        setUploading(true);
        setSubmitting(true);
        const fd = new FormData();
        fd.append("image", file);

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
            { method: "POST", body: fd }
        );

        const data = await res.json();
        const imageUrl = data.data.display_url;

        setForm((prev) => ({ ...prev, images: imageUrl }));
        setPreview(imageUrl);
        setSubmitting(false);
        setUploading(false);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;

        try {
            setSubmitting(true);

            const res = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                throw new Error("Failed to add product");
            }

            toast.success("Product added successfully 🎉");

            setForm({
                category: "",
                brand: "",
                price: "",
                currency: "BDT",
                sizes: [],
                color: "",
                material: "",
                title: "",
                images: "",
                sold: 0,
            });
            setPreview("");

            setTimeout(() => {
                router.push("/admin-dashboard/products");
            }, 1200);
        } catch (err) {
            toast.error("Something went wrong ❌");
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-8">
            <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6">➕ Add New Product</h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Title */}
                    <div className="md:col-span-2">
                        <label className="font-semibold">Product Title</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-3 border rounded-xl"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="font-semibold">Category</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-3 border rounded-xl"
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="Denim">Denim</option>
                            <option value="Sweater">Sweater</option>
                            <option value="Hoodie">Hoodie</option>
                            <option value="Rashguard">Rashguard</option>
                            <option value="Jacket">Jacket</option>
                        </select>
                    </div>

                    {/* Brand */}
                    <div>
                        <label className="font-semibold">Brand</label>
                        <input name="brand" value={form.brand} onChange={handleChange} className="w-full mt-1 p-3 border rounded-xl" />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="font-semibold">Price</label>
                        <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full mt-1 p-3 border rounded-xl" />
                    </div>

                    {/* Color */}
                    <div>
                        <label className="font-semibold">Color</label>
                        <input name="color" value={form.color} onChange={handleChange} className="w-full mt-1 p-3 border rounded-xl" />
                    </div>

                    {/* Material */}
                    <div className="md:col-span-2">
                        <label className="font-semibold">Material</label>
                        <input name="material" value={form.material} onChange={handleChange} className="w-full mt-1 p-3 border rounded-xl" />
                    </div>

                    {/* Sizes */}
                    <div className="md:col-span-2">
                        <label className="font-semibold">Sizes</label>
                        <div className="flex gap-3 mt-2 flex-wrap">
                            {["M", "L", "XL", "XXL"].map((s) => (
                                <button
                                    type="button"
                                    key={s}
                                    onClick={() => handleSizes(s)}
                                    className={`px-4 py-2 rounded-full border ${form.sizes.includes(s)
                                        ? "bg-black text-white"
                                        : "bg-gray-100"
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="md:col-span-2">
                        <label className="font-semibold">Product Image</label>

                        <div className="mt-3 flex items-center gap-4">
                            <label
                                htmlFor="imageUpload"
                                className="cursor-pointer inline-flex items-center gap-2 
                 bg-gradient-to-r from-indigo-600 to-purple-600 
                 text-white px-6 py-3 rounded-xl shadow-lg 
                 hover:opacity-90 transition"
                            >
                                📤 Upload Image
                            </label>

                            <input
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e.target.files[0])}
                                className="hidden"
                            />

                            {uploading && (
                                <span className="text-sm text-blue-600 animate-pulse">
                                    Uploading...
                                </span>
                            )}
                        </div>

                        {preview && (
                            <Image
                                src={preview}
                                alt="Preview"
                                width={220}
                                height={220}
                                className="mt-5 rounded-2xl shadow-xl border"
                            />
                        )}
                    </div>


                    {/* Submit */}
                    <div className="md:col-span-2 text-right">
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`px-8 py-3 rounded-xl transition text-white
    ${submitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-black hover:opacity-90"
                                }`}
                        >
                            {submitting ? "Adding..." : "Add Product"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}
