'use client';
import Image from "next/image";
import React, { useState, useEffect } from "react";

const DealsSection = () => {
  // Set the target date for the offer (e.g., 5 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 5);

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-12 px-4 md:px-8 lg:px-16  my-8 overflow-hidden bg-gray-900 text-white">
      {/* Stylish Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 opacity-70 -z-10"></div>
      {/* <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')] opacity-20 -z-10"></div> */}

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Text Content */}
        <div className="text-center md:text-left md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Limited Time Offer!
          </h2>
          <p className="text-lg md:text-xl mb-6">
            Get up to <span className="font-extrabold">50% OFF</span> on our winter collection. Hurry, offer ends soon!
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-center md:justify-start gap-4 mb-6 text-black">
            {["days", "hours", "minutes", "seconds"].map((unit) => (
              <div
                key={unit}
                className="bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-md min-w-[60px]"
              >
                <span className="block text-2xl font-bold">
                  {timeLeft[unit]}
                </span>
                <span className="text-sm capitalize">{unit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-purple-100 transition">
            Shop Now
          </button>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
         <Image src={'/banner-img/sub-banner.jpg'} width={500} height={500} alt="deal bg">

         </Image>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
