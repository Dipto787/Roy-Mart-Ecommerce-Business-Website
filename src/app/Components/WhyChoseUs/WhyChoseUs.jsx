import { Truck, RotateCcw, Wallet, Star } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Truck size={36} />,
      title: "Free Delivery",
      desc: "Free home delivery available across Bangladesh",
    },
    {
      icon: <RotateCcw size={36} />,
      title: "Easy Return",
      desc: "Hassle-free return within 7 days of delivery",
    },
    {
      icon: <Wallet size={36} />,
      title: "Cash on Delivery",
      desc: "Pay only after receiving your product",
    },
    {
      icon: <Star size={36} />,
      title: "Premium Quality",
      desc: "High-quality products with premium materials",
    },
  ];

  return (
    <section className="bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Why Choose Us
          </h2>
          <p className="text-gray-500 mt-2">
            The benefits that make us stand out
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-black text-white mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
