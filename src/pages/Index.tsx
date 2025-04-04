
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Store, Users, Award } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import AuthForm from "@/components/auth/AuthForm";
import { products } from "@/data/products";

const EventCard = ({ 
  id,
  title, 
  date, 
  location, 
  imageSrc
}: { 
  id: number;
  title: string; 
  date: string; 
  location: string;
  imageSrc: string; 
}) => {
  return (
    <div className="wellspring-card overflow-hidden group">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-gray-400 text-sm mb-2">{date}</p>
        <p className="text-gray-300 text-sm">{location}</p>
        <Link to={`/events/${id}`} className="mt-3 inline-block text-wellspring-teal text-sm font-medium flex items-center hover:underline">
          Learn more
          <ArrowRight size={14} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

const ProductCard = ({
  id,
  title,
  price,
  brand,
  imageSrc
}: {
  id: number;
  title: string;
  price: string;
  brand: string;
  imageSrc: string;
}) => {
  return (
    <div className="wellspring-card overflow-hidden group">
      <div className="h-40 overflow-hidden">
        <img 
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-wellspring-teal">{brand}</p>
        <h3 className="font-bold mb-1">{title}</h3>
        <p className="text-gray-300">{price}</p>
        <Link to={`/marketplace/product/${id}`} className="mt-2 inline-block text-wellspring-teal text-sm font-medium flex items-center hover:underline">
          View product
          <ArrowRight size={14} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

const FeatureCard = ({
  title,
  description,
  icon: Icon
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) => {
  return (
    <div className="wellspring-card p-6 flex flex-col items-center text-center">
      <div className="p-3 rounded-full bg-wellspring-teal bg-opacity-20 mb-4">
        <Icon className="h-6 w-6 text-wellspring-teal" />
      </div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

// Mock event data
const events = [
  {
    id: 1,
    title: "Global Health Summit 2025",
    date: "April 15-17, 2025",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    title: "Wellness Workshop Series",
    date: "May 5, 2025",
    location: "Online Event",
    image: "https://images.unsplash.com/photo-1517637382994-f02da38c6728?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 3,
    title: "Nutrition & Fitness Expo",
    date: "June 12-14, 2025",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];

const Index = () => {
  const [showAuth, setShowAuth] = React.useState(false);

  const closeAuthModal = () => {
    setShowAuth(false);
  };

  // Get 4 featured products
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-24 px-4">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-wellspring-black to-wellspring-darkgray"
          ></div>
          
          <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Your <span className="text-wellspring-teal">Wellness</span> Journey <br />Starts Here
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-lg">
                Discover premium health products, connect with experts, and attend transformative wellness events in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="wellspring-button wellspring-button-primary"
                  onClick={() => setShowAuth(true)}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  className="wellspring-button wellspring-button-outline"
                  asChild
                >
                  <Link to="/events">Explore Events</Link>
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative">
                <div className="bg-wellspring-darkgray rounded-lg p-2 md:p-6 shadow-xl">
                  <AuthForm onSuccess={closeAuthModal} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-wellspring-darkgray">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="wellspring-heading">Why Choose <span className="text-wellspring-teal">Wellspring</span></h2>
              <p className="text-gray-400 max-w-xl mx-auto">All your wellness needs in one premium platform</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard 
                title="Curated Events"
                description="Access to exclusive health summits, workshops, and wellness experiences"
                icon={Calendar}
              />
              <FeatureCard 
                title="Premium Marketplace"
                description="Discover and shop top-quality wellness products from trusted brands"
                icon={Store}
              />
              <FeatureCard 
                title="Expert Community"
                description="Connect with leading wellness practitioners and like-minded individuals"
                icon={Users}
              />
            </div>
          </div>
        </section>

        {/* Featured Events Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Featured Events</h2>
              <Link to="/events" className="text-wellspring-teal flex items-center hover:underline">
                View all events
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  location={event.location}
                  imageSrc={event.image}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Marketplace Preview */}
        <section className="py-16 px-4 bg-wellspring-darkgray">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Featured Products</h2>
              <Link to="/marketplace" className="text-wellspring-teal flex items-center hover:underline">
                Browse marketplace
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  price={`$${product.price}`}
                  brand={product.brand}
                  imageSrc={product.image}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="bg-gradient-to-r from-wellspring-gray to-wellspring-darkgray rounded-xl p-8 md:p-12">
              <div className="max-w-2xl mx-auto text-center">
                <Award className="h-16 w-16 text-wellspring-gold mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your wellness journey?</h2>
                <p className="text-gray-300 mb-8">
                  Join thousands of health enthusiasts and professionals on the Wellspring platform.
                </p>
                <Button 
                  className="wellspring-button wellspring-button-primary"
                  onClick={() => setShowAuth(true)}
                >
                  Sign Up Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
