import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Foodie</h2>
          <p className="text-gray-400">
            Delicious meals delivered to your door. Explore our menu and order your favorite food today!
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-orange-500 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-orange-500 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-orange-500 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-orange-500 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-orange-500 transition">Home</Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-orange-500 transition">Categories</Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-orange-500 transition">Menu</Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-orange-500 transition">Cart</Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/user/profile" className="hover:text-orange-500 transition">Profile</Link>
            </li>
            <li>
              <Link to="/user/orders" className="hover:text-orange-500 transition">Orders</Link>
            </li>
            <li>
              <Link to="/user/settings" className="hover:text-orange-500 transition">Settings</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <p>
            GoheerStreet No:2 , bahawalpur, Pakistan
          </p>
          <p>+92 300 1234567</p>
          <p>support@foodie.com</p>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Foodie. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;