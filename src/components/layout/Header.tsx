
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Menu, X, Search, User, ShoppingCart, Calendar, Store, Bell, Settings 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-wellspring-black border-b border-wellspring-gray">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-wellspring-teal to-wellspring-gold bg-clip-text text-transparent">
              Wellspring
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6 ml-8">
            <Link to="/events" className="text-gray-300 hover:text-white transition-colors">Events</Link>
            <Link to="/marketplace" className="text-gray-300 hover:text-white transition-colors">Marketplace</Link>
            <Link to="/experts" className="text-gray-300 hover:text-white transition-colors">Experts</Link>
            <Link to="/community" className="text-gray-300 hover:text-white transition-colors">Community</Link>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button className="text-gray-300 hover:text-white transition-colors">
            <Search size={20} />
          </button>
          <Link to="/notifications" className="text-gray-300 hover:text-white transition-colors">
            <Bell size={20} />
          </Link>
          <Link to="/my-orders" className="text-gray-300 hover:text-white transition-colors">
            <ShoppingCart size={20} />
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" alt="User" />
                <AvatarFallback className="bg-wellspring-gray">
                  <User size={16} />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile" className="flex items-center w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/my-events" className="flex items-center w-full">My Events</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/my-orders" className="flex items-center w-full">My Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings" className="flex items-center w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/admin" className="flex items-center w-full">Admin Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/logout" className="flex items-center w-full">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button className="md:hidden text-gray-300" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 top-14 bg-wellspring-black z-40 animate-fade-in">
          <div className="container mx-auto p-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/events" 
                className="flex items-center space-x-2 p-3 hover:bg-wellspring-darkgray rounded-md"
                onClick={toggleMenu}
              >
                <Calendar size={20} />
                <span>Events</span>
              </Link>
              <Link 
                to="/marketplace" 
                className="flex items-center space-x-2 p-3 hover:bg-wellspring-darkgray rounded-md"
                onClick={toggleMenu}
              >
                <Store size={20} />
                <span>Marketplace</span>
              </Link>
              <Link 
                to="/experts" 
                className="flex items-center space-x-2 p-3 hover:bg-wellspring-darkgray rounded-md"
                onClick={toggleMenu}
              >
                <User size={20} />
                <span>Experts</span>
              </Link>
              <Link 
                to="/community" 
                className="flex items-center space-x-2 p-3 hover:bg-wellspring-darkgray rounded-md"
                onClick={toggleMenu}
              >
                <User size={20} />
                <span>Community</span>
              </Link>
              <div className="h-px bg-wellspring-gray my-2"></div>
              <Link 
                to="/profile" 
                className="flex items-center space-x-2 p-3 hover:bg-wellspring-darkgray rounded-md"
                onClick={toggleMenu}
              >
                <User size={20} />
                <span>Profile</span>
              </Link>
              <Link 
                to="/my-events" 
                className="flex items-center space-x-2 p-3 hover:bg-wellspring-darkgray rounded-md"
                onClick={toggleMenu}
              >
                <Calendar size={20} />
                <span>My Events</span>
              </Link>
              <Link 
                to="/my-orders" 
                className="flex items-center space-x-2 p-3 hover:bg-wellspring-darkgray rounded-md"
                onClick={toggleMenu}
              >
                <ShoppingCart size={20} />
                <span>My Orders</span>
              </Link>
              <Link 
                to="/settings" 
                className="flex items-center space-x-2 p-3 hover:bg-wellspring-darkgray rounded-md"
                onClick={toggleMenu}
              >
                <Settings size={20} />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
