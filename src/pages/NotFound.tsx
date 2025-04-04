
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Header />
      
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-wellspring-darkgray p-6 rounded-full inline-block mb-6">
            <FileQuestion size={64} className="text-wellspring-teal" />
          </div>
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            We couldn't find the page you were looking for. It might have been moved, deleted, or never existed in the first place.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="wellspring-button wellspring-button-outline"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </Button>
            <Button 
              className="wellspring-button wellspring-button-primary"
              asChild
            >
              <Link to="/">
                <Home size={16} className="mr-2" />
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default NotFound;
