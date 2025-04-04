import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ShoppingCart, Heart, Star, Plus, Minus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Mock product data with real image URLs
const products = [
  {
    id: 1,
    name: "Organic Wellness Tea Blend",
    price: 24.99,
    rating: 4.8,
    reviews: 126,
    brand: "NaturaPure",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    featured: true,
    description: "A delicious blend of organic herbs designed to support your wellness journey and promote relaxation.",
    tags: ["Organic", "Tea", "Wellness"]
  },
  {
    id: 2,
    name: "Premium Yoga Mat",
    price: 89.00,
    rating: 4.7,
    reviews: 94,
    brand: "ZenFlex",
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1593810450967-f9c42742e4e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    featured: false,
    description: "Eco-friendly, non-slip yoga mat perfect for both beginners and experienced practitioners.",
    tags: ["Yoga", "Eco-friendly", "Non-slip"]
  },
  {
    id: 3,
    name: "Plant Protein Complex",
    price: 59.99,
    rating: 4.5,
    reviews: 218,
    brand: "VitalHerb",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1607707972895-7f994d8c2f3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    featured: true,
    description: "Complete plant-based protein with essential amino acids for optimal recovery and muscle health.",
    tags: ["Protein", "Plant-based", "Nutrition"]
  },
  {
    id: 4,
    name: "Meditation Cushion Set",
    price: 75.00,
    rating: 4.9,
    reviews: 63,
    brand: "MindfulSpace",
    category: "Meditation",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    featured: false,
    description: "Comfortable cushion set designed to support proper posture during extended meditation sessions.",
    tags: ["Meditation", "Comfort", "Posture"]
  },
  {
    id: 5,
    name: "Digital Wellness Tracker",
    price: 129.99,
    rating: 4.4,
    reviews: 175,
    brand: "HealthSync",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd962?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    featured: true,
    description: "Advanced tracker that monitors heart rate, sleep patterns, stress levels, and activity throughout the day.",
    tags: ["Tech", "Tracking", "Health"]
  },
  {
    id: 6,
    name: "Organic Essential Oil Set",
    price: 49.95,
    rating: 4.6,
    reviews: 87,
    brand: "PureEssence",
    category: "Aromatherapy",
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    featured: false,
    description: "Collection of 100% pure, organic essential oils for aromatherapy and natural wellness support.",
    tags: ["Essential Oils", "Organic", "Aromatherapy"]
  },
  {
    id: 7,
    name: "Wellness Journal",
    price: 22.50,
    rating: 4.7,
    reviews: 109,
    brand: "MindfulLiving",
    category: "Mindfulness",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    featured: false,
    description: "Guided journal with prompts to track gratitude, goals, habits, and daily reflections for mental wellbeing.",
    tags: ["Journal", "Mindfulness", "Mental Health"]
  },
  {
    id: 8,
    name: "Air Purification System",
    price: 249.99,
    rating: 4.8,
    reviews: 82,
    brand: "CleanAir",
    category: "Home",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    featured: true,
    description: "HEPA filtering system that removes allergens, pollutants, and improves overall air quality in your space.",
    tags: ["Air Quality", "Home", "Purification"]
  }
];

const MarketplacePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [filterVisible, setFilterVisible] = useState(false);
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([]);
  
  const { toast } = useToast();

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    const matchesRating = selectedRating === 0 || product.rating >= selectedRating;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  const addToCart = (productId: number) => {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { id: productId, quantity: 1 }]);
    }
    
    toast({
      title: "Added to cart",
      description: "This item has been added to your shopping cart",
    });
  };

  const removeFromCart = (productId: number) => {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      setCart(cart.filter(item => item.id !== productId));
    }
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Banner */}
        <section className="bg-wellspring-darkgray py-12 px-4">
          <div className="container mx-auto">
            <div className="text-center">
              <h1 className="wellspring-heading">
                Wellness <span className="text-wellspring-teal">Marketplace</span>
              </h1>
              <p className="text-gray-300 max-w-xl mx-auto mb-8">
                Discover premium products from trusted wellness brands
              </p>
              
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pl-10 wellspring-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 border-wellspring-gray bg-wellspring-gray"
                    onClick={() => setFilterVisible(!filterVisible)}
                  >
                    <Filter size={16} />
                    <span className="hidden md:inline">Filters</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            {filterVisible && (
              <div className="md:w-1/4 bg-wellspring-darkgray p-4 rounded-lg">
                <h2 className="font-semibold text-lg mb-4">Filters</h2>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="category">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="all-categories" 
                            name="category"
                            checked={selectedCategory === ""}
                            onChange={() => setSelectedCategory("")}
                            className="wellspring-input" 
                          />
                          <label htmlFor="all-categories">All Categories</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="nutrition" 
                            name="category"
                            checked={selectedCategory === "Nutrition"}
                            onChange={() => setSelectedCategory("Nutrition")}
                            className="wellspring-input" 
                          />
                          <label htmlFor="nutrition">Nutrition</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="fitness" 
                            name="category"
                            checked={selectedCategory === "Fitness"}
                            onChange={() => setSelectedCategory("Fitness")}
                            className="wellspring-input" 
                          />
                          <label htmlFor="fitness">Fitness</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="meditation" 
                            name="category"
                            checked={selectedCategory === "Meditation"}
                            onChange={() => setSelectedCategory("Meditation")} 
                            className="wellspring-input"
                          />
                          <label htmlFor="meditation">Meditation</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="technology" 
                            name="category"
                            checked={selectedCategory === "Technology"}
                            onChange={() => setSelectedCategory("Technology")}
                            className="wellspring-input" 
                          />
                          <label htmlFor="technology">Technology</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="aromatherapy" 
                            name="category"
                            checked={selectedCategory === "Aromatherapy"}
                            onChange={() => setSelectedCategory("Aromatherapy")}
                            className="wellspring-input" 
                          />
                          <label htmlFor="aromatherapy">Aromatherapy</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="mindfulness" 
                            name="category"
                            checked={selectedCategory === "Mindfulness"}
                            onChange={() => setSelectedCategory("Mindfulness")}
                            className="wellspring-input" 
                          />
                          <label htmlFor="mindfulness">Mindfulness</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="home" 
                            name="category"
                            checked={selectedCategory === "Home"}
                            onChange={() => setSelectedCategory("Home")}
                            className="wellspring-input" 
                          />
                          <label htmlFor="home">Home</label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6 px-2">
                        <Slider
                          defaultValue={[0, 300]}
                          max={300}
                          step={5}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex justify-between text-sm">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="rating">
                    <AccordionTrigger>Rating</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="any-rating" 
                            name="rating"
                            checked={selectedRating === 0}
                            onChange={() => setSelectedRating(0)}
                            className="wellspring-input" 
                          />
                          <label htmlFor="any-rating">Any Rating</label>
                        </div>
                        {[4, 3, 2, 1].map(rating => (
                          <div key={rating} className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              id={`rating-${rating}`} 
                              name="rating"
                              checked={selectedRating === rating}
                              onChange={() => setSelectedRating(rating)}
                              className="wellspring-input" 
                            />
                            <label htmlFor={`rating-${rating}`} className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i}
                                  size={14} 
                                  className={`${i < rating ? 'text-wellspring-gold' : 'text-gray-500'}`} 
                                  fill={i < rating ? 'currentColor' : 'none'}
                                />
                              ))}
                              <span className="ml-1">& Up</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="brand">
                    <AccordionTrigger>Brand</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {Array.from(new Set(products.map(product => product.brand))).map(brand => (
                          <div key={brand} className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              id={`brand-${brand}`} 
                              className="wellspring-input" 
                            />
                            <label htmlFor={`brand-${brand}`}>{brand}</label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="mt-6 flex flex-col gap-2">
                  <Button 
                    className="wellspring-button wellspring-button-primary"
                    onClick={() => {/* Apply filters logic */}}
                  >
                    Apply Filters
                  </Button>
                  <Button 
                    variant="outline" 
                    className="wellspring-button wellspring-button-outline"
                    onClick={() => {
                      setSearchTerm("");
                      setPriceRange([0, 300]);
                      setSelectedCategory("");
                      setSelectedRating(0);
                    }}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            )}
            
            {/* Products List */}
            <div className={`${filterVisible ? 'md:w-3/4' : 'w-full'}`}>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
                </h2>
                <div className="flex items-center gap-2">
                  <Select defaultValue="featured">
                    <SelectTrigger className="w-[180px] bg-wellspring-gray border-wellspring-gray">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price (Low to High)</SelectItem>
                      <SelectItem value="price-high">Price (High to Low)</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Tabs defaultValue="grid" className="mb-6">
                <TabsList className="grid w-[200px] grid-cols-2">
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
                <TabsContent value="grid" className="pt-4">
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredProducts.map(product => (
                        <Card key={product.id} className="wellspring-card overflow-hidden group h-full flex flex-col">
                          <div className="h-40 overflow-hidden relative">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {product.featured && (
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-wellspring-gold text-black">Featured</Badge>
                              </div>
                            )}
                            <button 
                              className="absolute top-2 right-2 p-1.5 bg-wellspring-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all"
                              onClick={() => toast({ title: "Added to favorites" })}
                            >
                              <Heart size={16} className="text-white" />
                            </button>
                          </div>
                          <CardContent className="p-4 flex-grow">
                            <div className="flex items-center mb-1">
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i}
                                    size={14} 
                                    className={`${i < Math.floor(product.rating) ? 'text-wellspring-gold' : 'text-gray-500'}`} 
                                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                            </div>
                            <p className="text-sm text-wellspring-teal mb-1">{product.brand}</p>
                            <Link to={`/marketplace/product/${product.id}`}>
                              <h3 className="font-medium hover:text-wellspring-teal transition-colors line-clamp-2 mb-2">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-gray-400 text-sm line-clamp-2 mb-2">{product.description}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {product.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs border-wellspring-gray bg-wellspring-gray">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="px-4 py-3 border-t border-wellspring-gray flex items-center justify-between">
                            <span className="font-bold">${product.price.toFixed(2)}</span>
                            <div className="flex items-center">
                              {cart.find(item => item.id === product.id) ? (
                                <div className="flex items-center">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-wellspring-teal"
                                    onClick={() => removeFromCart(product.id)}
                                  >
                                    <Minus size={14} />
                                  </Button>
                                  <span className="mx-2 text-sm">
                                    {cart.find(item => item.id === product.id)?.quantity || 0}
                                  </span>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-wellspring-teal"
                                    onClick={() => addToCart(product.id)}
                                  >
                                    <Plus size={14} />
                                  </Button>
                                </div>
                              ) : (
                                <Button 
                                  className="wellspring-button wellspring-button-primary h-8 px-3"
                                  onClick={() => addToCart(product.id)}
                                >
                                  <ShoppingCart size={14} className="mr-1" />
                                  Add
                                </Button>
                              )}
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="wellspring-card p-6 text-center">
                      <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">No products found</h3>
                      <p className="text-gray-400 mb-4">Try adjusting your filters or search criteria</p>
                      <Button 
                        variant="outline" 
                        className="wellspring-button wellspring-button-outline"
                        onClick={() => {
                          setSearchTerm("");
                          setPriceRange([0, 300]);
                          setSelectedCategory("");
                          setSelectedRating(0);
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="list" className="pt-4">
                  {filteredProducts.length > 0 ? (
                    <div className="space-y-4">
                      {filteredProducts.map(product => (
                        <Card key={product.id} className="wellspring-card overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 h-40 md:h-auto">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4 md:w-3/4 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <p className="text-sm text-wellspring-teal">{product.brand}</p>
                                  <div className="flex items-center">
                                    <div className="flex">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <Star 
                                          key={i}
                                          size={14} 
                                          className={`${i < Math.floor(product.rating) ? 'text-wellspring-gold' : 'text-gray-500'}`} 
                                          fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                                  </div>
                                </div>
                                <Link to={`/marketplace/product/${product.id}`}>
                                  <h3 className="font-medium text-lg hover:text-wellspring-teal transition-colors mb-2">
                                    {product.name}
                                  </h3>
                                </Link>
                                <p className="text-gray-400 text-sm mb-3">{product.description}</p>
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {product.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs border-wellspring-gray bg-wellspring-gray">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-4">
                                <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                                <div className="flex items-center gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="wellspring-button wellspring-button-outline"
                                    onClick={() => toast({ title: "Added to favorites" })}
                                  >
                                    <Heart size={14} className="mr-1" />
                                    Save
                                  </Button>
                                  {cart.find(item => item.id === product.id) ? (
                                    <div className="flex items-center border border-wellspring-gray rounded-md">
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-none text-wellspring-teal"
                                        onClick={() => removeFromCart(product.id)}
                                      >
                                        <Minus size={14} />
                                      </Button>
                                      <span className="mx-3 text-sm">
                                        {cart.find(item => item.id === product.id)?.quantity || 0}
                                      </span>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-none text-wellspring-teal"
                                        onClick={() => addToCart(product.id)}
                                      >
                                        <Plus size={14} />
                                      </Button>
                                    </div>
                                  ) : (
                                    <Button 
                                      className="wellspring-button wellspring-button-primary"
                                      onClick={() => addToCart(product.id)}
                                    >
                                      <ShoppingCart size={14} className="mr-1" />
                                      Add to Cart
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="wellspring-card p-6 text-center">
                      <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">No products found</h3>
                      <p className="text-gray-400 mb-4">Try adjusting your filters or search criteria</p>
                      <Button 
                        variant="outline" 
                        className="wellspring-button wellspring-button-outline"
                        onClick={() => {
                          setSearchTerm("");
                          setPriceRange([0, 300]);
                          setSelectedCategory("");
                          setSelectedRating(0);
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
              {filteredProducts.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      1
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      2
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      3
                    </Button>
                    <span className="mx-2">...</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      8
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default MarketplacePage;
