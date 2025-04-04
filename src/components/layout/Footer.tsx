
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-wellspring-darkgray mt-20 border-t border-wellspring-gray">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-wellspring-teal to-wellspring-gold bg-clip-text text-transparent">
                Wellspring
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Your premier destination for health and wellness events, products, and expert connections.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-wellspring-teal transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-wellspring-teal transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-wellspring-teal transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-wellspring-teal transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Marketplace</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/marketplace/products" className="text-gray-400 hover:text-wellspring-teal">All Products</Link></li>
              <li><Link to="/marketplace/categories" className="text-gray-400 hover:text-wellspring-teal">Categories</Link></li>
              <li><Link to="/marketplace/vendors" className="text-gray-400 hover:text-wellspring-teal">Vendors</Link></li>
              <li><Link to="/marketplace/deals" className="text-gray-400 hover:text-wellspring-teal">Special Offers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Events</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/events/upcoming" className="text-gray-400 hover:text-wellspring-teal">Upcoming Events</Link></li>
              <li><Link to="/events/summit" className="text-gray-400 hover:text-wellspring-teal">Health Summit</Link></li>
              <li><Link to="/events/workshops" className="text-gray-400 hover:text-wellspring-teal">Workshops</Link></li>
              <li><Link to="/events/calendar" className="text-gray-400 hover:text-wellspring-teal">Event Calendar</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-gray-400 hover:text-wellspring-teal">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-wellspring-teal">FAQ</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-wellspring-teal">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-wellspring-teal">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-wellspring-gray mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Wellspring. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0">
            <a href="mailto:info@wellspring-events.com" className="flex items-center space-x-2 text-sm text-gray-400 hover:text-wellspring-teal">
              <Mail size={16} />
              <span>info@wellspring-events.com</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
