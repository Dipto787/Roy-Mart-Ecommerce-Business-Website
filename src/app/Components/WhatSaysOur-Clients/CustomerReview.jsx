"use client";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Arif Hasan",
    role: "Verified Buyer",
    review:
      "The quality of the hoodie is amazing and delivery was super fast. Highly recommended!",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "Verified Buyer",
    review:
      "Loved the jacket! Perfect fit and premium quality. Will definitely order again.",
    rating: 5,
  },
  {
    name: "Rakib Ahmed",
    role: "Verified Buyer",
    review:
      "Very comfortable winter wear and excellent customer service. Totally worth it.",
    rating: 4,
  },
];

const CustomerReviews = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 mt-2">
            Real reviews from real customers
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
            >
              {/* Stars */}
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < item.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                “{item.review}”
              </p>

              {/* User Info */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-800">
                  {item.name}
                </h4>
                <span className="text-xs text-gray-500">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
