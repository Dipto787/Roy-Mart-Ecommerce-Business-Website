"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

const UpdateProductForm = ({ product }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: product?.title || "",
    category: product?.category || "",
    brand: product?.brand || "",
    price: product?.price || "",
    currency: product?.currency || "BDT",
    color: product?.color || "",
    material: product?.material || "",
    sizes: product?.sizes || [],
    images: product?.images || "",
    sold: product?.sold || 0,
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Sizes toggle
  const handleSizes = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  // Image upload
  const handleImageUpload = async () => {
    if (!imageFile) return toast.error("Please select an image first");

    setUploading(true);
    const fd = new FormData();
    fd.append("image", imageFile);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: fd }
      );

      const data = await res.json();

      if (data?.success) {
        setFormData((prev) => ({ ...prev, images: data.data.url }));
        toast.success("📸 Image uploaded!");
      } else {
        toast.error("Image upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload error");
    }

    setUploading(false);
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/products/${product._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update product");
      }

      toast.success(`✨ ${formData.title} updated successfully!`);

      // Redirect + refresh products page
      router.push("/admin-dashboard/products");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "❌ Update failed!");
    }

    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center tracking-wide">
          ✨ Edit Product Details
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10"
        >
          {/* LEFT */}
          <div className="space-y-4 sm:space-y-5">
            {[
              ["title", "Product Title"],
              ["category", "Category"],
              ["brand", "Brand"],
              ["color", "Color"],
              ["material", "Material"],
            ].map(([name, placeholder]) => (
              <input
                key={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
              />
              <input
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                placeholder="Currency"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>

            {/* Sizes */}
            <div>
              <p className="text-sm font-semibold text-gray-300 mb-2">
                Available Sizes
              </p>
              <div className="flex gap-2 flex-wrap">
                {sizeOptions.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => handleSizes(s)}
                    className={`px-4 py-1.5 rounded-full border text-sm transition ${
                      formData.sizes.includes(s)
                        ? "bg-indigo-600 text-white border-indigo-500"
                        : "border-white/20 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-5 sm:space-y-6">
            {/* Image preview with blur overlay */}
            <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden border border-white/10">
              {formData.images ? (
                <Image
                  src={formData.images}
                  alt="preview"
                  fill
                  className={`object-cover transition duration-300 ${
                    uploading ? "blur-sm scale-105" : ""
                  }`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5 text-gray-300">
                  No Image
                </div>
              )}

              {uploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-white text-sm animate-pulse">
                    Uploading image...
                  </div>
                </div>
              )}
            </div>

            {/* Upload Image */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label
                  htmlFor="imageUpload"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 transition text-center"
                >
                  Change Image
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="hidden"
                />
                <span className="text-sm text-gray-300 truncate max-w-full sm:max-w-[220px]">
                  {imageFile?.name || "No file chosen"}
                </span>
              </div>

              <button
                type="button"
                onClick={handleImageUpload}
                disabled={uploading}
                className="w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Upload New Image"}
              </button>
            </div>

            <input
              name="sold"
              type="number"
              value={formData.sold}
              onChange={handleChange}
              placeholder="Sold Count"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
            />

            {/* Save changes */}
            <button
              type="submit"
              disabled={saving || uploading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-base sm:text-lg hover:scale-105 transition disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductForm;
