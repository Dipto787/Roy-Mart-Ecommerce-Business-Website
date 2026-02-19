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
      "Step into the season with premium winter fashion for men. Comfort, warmth, and confidence in every outfit.",
  },
  {
    src: "/banner-img/banner-2.jpg",
    alt: "banner img 2",
    title: "New Arrivals Just For You",
    description:
      "Explore the latest men’s fashion. Modern styles, quality fabrics, and perfect everyday fits.",
  },
  {
    src: "/banner-img/banner-3.jpg",
    alt: "banner img 3",
    title: "Upgrade Your Wardrobe Today",
    description:
      "Versatile outfits that move with your lifestyle. Day to night. Comfort meets style.",
  },
];

const ShopNowBanner = () => {
  return (
    <div className="w-full">
      <Swiper
        navigation
        modules={[Navigation, Autoplay]}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full h-[280px] sm:h-[380px] md:h-[500px] lg:h-[600px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {/* Background Image */}
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority
              className="object-cover object-center"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content Card */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="bg-black/50 backdrop-blur-md text-white max-w-xl w-full p-6 sm:p-8 rounded-xl text-center shadow-xl">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg opacity-90 mb-5">
                  {slide.description}
                </p>
                <Link
                  href="/category/Sweater"
                  className="inline-block bg-orange-500 hover:bg-orange-400 text-black font-semibold px-5 py-2.5 rounded-md transition"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShopNowBanner;
