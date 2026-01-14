"use client";
import { Mail } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-gray-900 to-black p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Content */}
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold">
              Get 10% Off Your First Order
            </h2>
            <p className="text-gray-300 mt-3">
              Subscribe to our newsletter and receive exclusive deals,
              early access to new collections, and style updates.
            </p>
          </div>

          {/* Right Form */}
          <form className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-72">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full pl-11 pr-4 py-3 bg-white rounded-full text-black focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
