import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-14">
        {/* Top Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              WinterWear
            </h2>
            <p className="text-sm leading-relaxed">
              Premium winter fashion designed for comfort, style, and
              confidence. Discover hoodies, jackets, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Shop</li>
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">FAQs</li>
              <li className="hover:text-white cursor-pointer">Return Policy</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} /> +880 1XXX-XXXXXX
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> support@winterwear.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} /> Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Social Icons */}
          <div className="flex gap-4">
            <a className="p-2 rounded-full bg-gray-800 hover:bg-white hover:text-black transition cursor-pointer">
              <Facebook size={18} />
            </a>
            <a className="p-2 rounded-full bg-gray-800 hover:bg-white hover:text-black transition cursor-pointer">
              <Instagram size={18} />
            </a>
            <a className="p-2 rounded-full bg-gray-800 hover:bg-white hover:text-black transition cursor-pointer">
              <Twitter size={18} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} WinterWear. All rights reserved.
          </p>

          {/* Payment */}
          <div className="text-sm text-gray-400">
            Cash on Delivery Available
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
