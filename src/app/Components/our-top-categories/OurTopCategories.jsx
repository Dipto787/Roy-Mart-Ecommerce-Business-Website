import React from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    category: "Denim",
    image: "https://i.ibb.co.com/VcfqKdKh/AOPJacket-1-1.jpg",
  },
  {
    id: 2,
    category: "Sweater",
    image: "https://i.ibb.co.com/d4SQ1GZB/mhl-sweater-bananarepublic-451-3-6903bffbea77b.avif",
  },
  {
    id: 3,
    category: "Hoodie",
    image: "https://i.ibb.co.com/Xr2hF5ft/Men-Multi-Colors-Hooded-Sweatshirt-Men-Hoodies-Color-Gold-4-X-Large-Size-ef45d2ad-dcd3-4112-b48c-180e.avif",
  },
  {
    id: 4,
    category: "Rashguard",
    image: "https://i.ibb.co.com/kV1WWxd4/ultra-warm-baselayer-set-men-thermic.webp",
  },
  {
    id: 5,
    category: "Jacket",
    image: "https://i.ibb.co.com/chSjKsyQ/3492.jpg",
  },
];

const OurTopCategories = () => {
  return (
    <div className="container mx-auto px-4  pt-40 lg:pt-20 pb-5">


      <div className="flex justify-between lg:px-16  gap-6 overflow-x-auto scrollbar-hide">
        {categories.map((item) => (
          <Link href={`/category/${item.category}`}
            key={item.id}
            className="flex flex-col items-center     cursor-pointer"
          >
            <div className="relative lg:w-28 lg:h-28 w-12 h-12 rounded-full overflow-hidden border shadow-sm hover:scale-105 transition">
              <Image
                src={item.image}
                alt={item.category}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-sm font-medium text-center">
              {item.category}
            </p>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default OurTopCategories;
