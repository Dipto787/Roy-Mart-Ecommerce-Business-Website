import Image from "next/image";
import Link from "next/link";

const WinterHighlight = () => {
    return (
        <div>
            <section className="w-full py-14 px-4 md:px-10">
                <div className="relative container mx-auto rounded-3xl overflow-hidden">

                    {/* Background Image */}
                    <Image
                        src="/banner-img/winter-banner.jpg"
                        alt="Winter Collection"
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-14 py-16 md:py-24 text-white">

                        {/* Text */}
                        <div className="max-w-xl text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                                Stay Warm, <br className="hidden md:block" />
                                Stay Stylish ❄️
                            </h2>

                            <p className="mt-4 text-gray-200 text-base md:text-lg">
                                Discover premium winter wear designed for comfort and style.
                                Jackets, hoodies, sweaters & more.
                            </p>
                            <Link href={'/category/Hoodie'}>
                                <button className="mt-6 cursor-pointer px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition">
                                    Explore Winter Collection
                                </button>
                            </Link>
                        </div>

                        {/* Feature Tags */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl">
                                ❄️ Premium Fabric
                            </div>
                            <div className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl">
                                🔥 Extra Warm
                            </div>
                            <div className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl">
                                💯 Trendy Design
                            </div>
                            <div className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl">
                                🚚 Fast Delivery
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default WinterHighlight;
