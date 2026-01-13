"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    src: "/banner-img/banner1.jpg",
    alt: "banner img 1",
    title: "Stylish Winter Collection",
    description:
      "Step into the season with our stylish winter collection for men, crafted with premium fabrics and modern designs. Each piece is made to provide warmth, comfort, and a confident look, perfect for everyday wear as well as special occasions. Experience fashion that blends functionality with timeless style.",
  },
  {
    src: "/banner-img/banner-2.jpg",
    alt: "banner img 2",
    title: "New Arrivals Just For You",
    description:
      "Explore our latest arrivals in men’s fashion, designed to match today’s lifestyle and trends. From casual essentials to refined statement pieces, every item reflects quality craftsmanship and attention to detail. Refresh your wardrobe with styles that keep you looking sharp and feeling comfortable.",
  },
  {
    src: "/banner-img/banner-3.jpg",
    alt: "banner img 3",
    title: "Upgrade Your Wardrobe Today",
    description:
      "Upgrade your wardrobe with versatile men’s outfits that transition effortlessly from day to night. Our collection combines classic elegance with modern aesthetics, offering clothing that enhances your personality and confidence. Discover fashion that fits your style, comfort, and everyday needs.",
  },
];


const ShopNowBanner = () => {
  return (
    <div className="w-full relative lg:pt-0 pt-32 ">
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full h-[300px] sm:h-[400px] md:h-[600px] lg:h-screen"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full  h-full">
            {/* Image */}
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            /> 
            {/* Overlay */}
            <div className="absolute inset-0   h-80 flex justify-center lg:top-26 bg-black/40 max-w-lg rounded-lg mx-auto "></div> 
            {/* Content */}
            <div className="absolute  max-w-md mx-auto inset-0 flex flex-col items-center justify-center text-center px-4 md:px-0">
              <h2 className=" text-white text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-white ">{slide.description}</p>
              <Link href={'/shop'} className="bg-orange-400 mt-4 text-black font-semibold px-5 py-2 sm:px-6 sm:py-3 rounded-md shadow-lg hover:bg-gray-200 transition">
                Shop Now
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShopNowBanner;
