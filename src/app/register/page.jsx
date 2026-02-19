'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import registerUser from "../actions/auth/registerUser";
import toast from "react-hot-toast";

export default function SignUpPage() {
    const [base64Image, setBase64Image] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    let searchParams = useSearchParams();

    const redirect = searchParams.get("redirect") || "/";
    console.log(searchParams.get("redirect"))
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
            setBase64Image(reader.result.split(",")[1]);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const imageFile = e.target.profileImage.files[0];
        const role = 'user';

        if (!imageFile) {
            alert("Please select an image!");
            setLoading(false);
            return;
        }

        try {
            // Upload image to imgbb
            const formData = new FormData();
            formData.append("image", imageFile);
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                { method: "POST", body: formData }
            );
            const data = await res.json();
            const imageUrl = data.data.url;

            // Register user in MongoDB
            const registerRes = await registerUser({ name, email, password, profileImage: imageUrl, role });

            if (registerRes.success) {
                // Auto login after registration
                const loginRes = await signIn("credentials", { email, password, redirect: false });
                if (loginRes.ok) {
                    toast.success('success to registered')
                    router.push(redirect);// redirect to homepage
                } else {
                    toast.error("Registered successfully, but login failed. Please login manually.");
                }
            } else {
                toast.error(registerRes.message || "Registration failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong during registration.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-md bg-neutral-900 border border-white/10 shadow-lg p-8 rounded-xl">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-semibold text-white">Create your account</h1>
                    <p className="mt-2 text-sm text-gray-400">Join us today. Fill in your details to get started.</p>
                </div>

                <form onSubmit={handleSubmitForm} className="space-y-5">
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Full Name</label>
                        <input type="text" name="name" placeholder="John Doe"
                            className="w-full px-4 py-2 rounded-md bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Email</label>
                        <input type="email" name="email" placeholder="you@example.com"
                            className="w-full px-4 py-2 rounded-md bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Password</label>
                        <input type="password" name="password" placeholder="••••••••"
                            className="w-full px-4 py-2 rounded-md bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Profile Image</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} name="profileImage"
                            className="w-full px-4 py-2 rounded-md bg-black border border-white/20 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30"
                        />
                        {preview && (
                            <img src={preview} alt="Preview"
                                className="mt-3 w-24 h-24 rounded-full object-cover border border-white/20"
                            />
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <input type="checkbox" className="accent-white" />
                        I agree to the <a href="#" className="text-white hover:underline">Terms & Conditions</a>
                    </div>

                    <button type="submit"
                        className="w-full py-2.5 rounded-md bg-white text-black font-medium hover:bg-gray-200 transition-colors duration-200"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Sign Up"}
                    </button>
                </form>

                <div className="mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="flex-1 h-px bg-white/20"></span>
                        <span className="text-gray-400 text-sm">or sign up with</span>
                        <span className="flex-1 h-px bg-white/20"></span>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md border border-white/20 bg-black text-white hover:bg-white/10 transition-colors duration-200">
                            <FaGoogle /> Sign up with Google
                        </button>

                        <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md border border-white/20 bg-black text-white hover:bg-white/10 transition-colors duration-200">
                            <FaGithub /> Sign up with GitHub
                        </button>
                    </div>
                </div>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <a href="/login" className="text-white hover:underline">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}
