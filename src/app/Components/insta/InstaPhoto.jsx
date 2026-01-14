import Image from "next/image";

const InstagramSection = () => {
  const images = [
    "/insta/1.jpg",
    "/insta/2.jpg",
    "/insta/3.jpg",
    "/insta/4.jpg",
    "/insta/5.jpg",
    "/insta/6.jpg",
    "/insta/7.jpg",
    "/insta/8.jpg",
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Styled by Our Customers
          </h2>
          <p className="text-gray-500 mt-2">
            Real people. Real style. Real confidence.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl"
            >
              <Image
                src={img}
                alt="Customer style"
                width={400}
                height={500}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <button className="bg-white text-black px-5 py-2 text-sm font-semibold rounded-full">
                  Shop the Look
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Button */}
        <div className="text-center mt-10">
          <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition">
            Follow Us on Instagram
          </button>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
