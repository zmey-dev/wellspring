
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Heart, Star, Share2, Info, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

// Import the products data
import { products } from "../data/products";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = products.find(p => p.id === Number(id));
  
  useEffect(() => {
    if (!product) {
      navigate("/marketplace");
      toast({
        title: "Product not found",
        description: "The product you're looking for doesn't exist.",
        variant: "destructive"
      });
    }
  }, [product, navigate, toast]);
  
  if (!product) {
    return null;
  }
  
  // Mock related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.tags.some(t => product.tags.includes(t))))
    .slice(0, 4);
  
  // Mock product images (using the main image plus placeholders)
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1602928298849-325cec8771c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1576671414121-aa7c5400ec83?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  ];
  
  return (
    <>
      <Header />
      
      <main className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-400">
              <Link to="/" className="hover:text-wellspring-teal">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/marketplace" className="hover:text-wellspring-teal">Marketplace</Link>
              <span className="mx-2">/</span>
              <Link to={`/marketplace/product/${product.id}`} className="text-wellspring-teal">
                {product.name}
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Product Images */}
            <div className="lg:w-1/2">
              <div className="wellspring-card overflow-hidden mb-4">
                <img 
                  src={productImages[selectedImage]} 
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {productImages.map((img, i) => (
                  <div 
                    key={i} 
                    className={`wellspring-card overflow-hidden cursor-pointer ${selectedImage === i ? 'ring-2 ring-wellspring-teal' : ''}`}
                    onClick={() => setSelectedImage(i)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} - view ${i+1}`}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="lg:w-1/2">
              <div className="mb-2 flex items-center justify-between">
                <Badge className="bg-wellspring-gray text-white">
                  {product.category}
                </Badge>
                
                <div className="flex items-center">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        size={16} 
                        className={`${i < Math.floor(product.rating) ? 'text-wellspring-gold' : 'text-gray-500'}`} 
                        fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
              
              <p className="text-xl font-bold text-wellspring-teal mb-4">
                ${product.price.toFixed(2)}
              </p>
              
              <div className="text-gray-300 mb-6">
                <p>{product.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Brand</h3>
                <p className="text-gray-300">{product.brand}</p>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-6">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs border-wellspring-gray bg-wellspring-gray">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-wellspring-gray rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-none text-wellspring-teal"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="px-4 py-2 text-lg">
                    {quantity}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-none text-wellspring-teal"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                
                <Button 
                  className="wellspring-button wellspring-button-primary flex-grow"
                  onClick={() => toast({ 
                    title: "Added to cart",
                    description: `${quantity} x ${product.name} added to your cart` 
                  })}
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Add to Cart
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="wellspring-button wellspring-button-outline h-10 w-10"
                  onClick={() => toast({ title: "Added to favorites" })}
                >
                  <Heart size={16} />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="wellspring-button wellspring-button-outline h-10 w-10"
                  onClick={() => toast({ title: "Product link copied to clipboard" })}
                >
                  <Share2 size={16} />
                </Button>
              </div>
              
              <div className="bg-wellspring-darkgray rounded-lg p-4 flex items-start space-x-3">
                <Info size={20} className="text-wellspring-teal mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Important Information</h3>
                  <p className="text-sm text-gray-300">
                    All products come with a 30-day satisfaction guarantee. For specific usage instructions and precautions, please refer to the product label or included documentation.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mb-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Product Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <div className="wellspring-card p-6">
                  <h2 className="text-xl font-bold mb-4">Product Description</h2>
                  <p className="mb-4">
                    {product.description} Our premium {product.name.toLowerCase()} is designed with your wellness journey in mind, providing exceptional quality and results.
                  </p>
                  <p>
                    At {product.brand}, we believe in creating products that enhance your daily wellness routine. This {product.name.toLowerCase()} was developed after years of research to ensure it meets the highest standards of quality and effectiveness.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="details">
                <div className="wellspring-card p-6">
                  <h2 className="text-xl font-bold mb-4">Product Specifications</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-b border-wellspring-gray pb-2">
                      <span className="text-gray-400">Brand</span>
                      <p>{product.brand}</p>
                    </div>
                    <div className="border-b border-wellspring-gray pb-2">
                      <span className="text-gray-400">Category</span>
                      <p>{product.category}</p>
                    </div>
                    <div className="border-b border-wellspring-gray pb-2">
                      <span className="text-gray-400">Rating</span>
                      <p>{product.rating} out of 5</p>
                    </div>
                    <div className="border-b border-wellspring-gray pb-2">
                      <span className="text-gray-400">Reviews</span>
                      <p>{product.reviews} customer reviews</p>
                    </div>
                    <div className="border-b border-wellspring-gray pb-2">
                      <span className="text-gray-400">SKU</span>
                      <p>WS-{product.id.toString().padStart(6, '0')}</p>
                    </div>
                    <div className="border-b border-wellspring-gray pb-2">
                      <span className="text-gray-400">Availability</span>
                      <p className="text-green-500">In Stock</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews">
                <div className="wellspring-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Customer Reviews</h2>
                    <Button className="wellspring-button wellspring-button-primary">
                      Write a Review
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="border-b border-wellspring-gray pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-wellspring-gray mr-3 flex items-center justify-center">
                              <span className="font-bold">{String.fromCharCode(65 + i)}</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Customer {String.fromCharCode(65 + i)}</h4>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, j) => (
                                  <Star 
                                    key={j}
                                    size={12} 
                                    className={`${j < 5 - i ? 'text-wellspring-gold' : 'text-gray-500'}`} 
                                    fill={j < 5 - i ? 'currentColor' : 'none'}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-gray-400 text-sm">2 weeks ago</span>
                        </div>
                        <p className="text-gray-300">
                          {i === 0 && "I've been using this product for about a month now and I'm very impressed with the results. Highly recommended for anyone looking to improve their wellness routine."}
                          {i === 1 && "Great quality product that delivers on its promises. The packaging is also environmentally friendly which I appreciate."}
                          {i === 2 && "Good product overall, though I think it's a bit overpriced for what you get. Still, the quality is there and it works as advertised."}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <Link to={`/marketplace/product/${relatedProduct.id}`} key={relatedProduct.id}>
                    <div className="wellspring-card overflow-hidden group">
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={relatedProduct.image} 
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-wellspring-teal mb-1">{relatedProduct.brand}</p>
                        <h3 className="font-medium group-hover:text-wellspring-teal transition-colors line-clamp-2 mb-2">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">${relatedProduct.price.toFixed(2)}</span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i}
                                size={12} 
                                className={`${i < Math.floor(relatedProduct.rating) ? 'text-wellspring-gold' : 'text-gray-500'}`} 
                                fill={i < Math.floor(relatedProduct.rating) ? 'currentColor' : 'none'}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ProductDetailPage;
