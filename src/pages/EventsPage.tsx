
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, Search, Filter, MapPin, Clock, Tag, ChevronDown, AlertCircle 
} from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock event data
const events = [
  {
    id: 1,
    title: "Global Health Summit 2025",
    date: "April 15-17, 2025",
    time: "8:00 AM - 5:00 PM",
    location: "San Francisco Convention Center",
    price: "$299",
    category: "Conference",
    image: "/placeholder.svg",
    featured: true,
    description: "Join world-renowned health experts for a three-day summit focused on the latest advances in holistic health practices and wellness technologies."
  },
  {
    id: 2,
    title: "Wellness Workshop Series",
    date: "May 5, 2025",
    time: "10:00 AM - 2:00 PM",
    location: "Online Event",
    price: "$49",
    category: "Workshop",
    image: "/placeholder.svg",
    featured: false,
    description: "A virtual series of interactive workshops covering meditation, nutrition, and stress management techniques for everyday wellness."
  },
  {
    id: 3,
    title: "Nutrition & Fitness Expo",
    date: "June 12-14, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Chicago Convention Center",
    price: "$149",
    category: "Expo",
    image: "/placeholder.svg",
    featured: true,
    description: "Explore the latest in nutrition science, fitness equipment, and wellness products at this industry-leading expo."
  },
  {
    id: 4,
    title: "Meditation Retreat Weekend",
    date: "July 8-10, 2025",
    time: "All Day",
    location: "Serenity Mountain Resort, Colorado",
    price: "$599",
    category: "Retreat",
    image: "/placeholder.svg",
    featured: false,
    description: "Escape the daily grind with this immersive meditation retreat in the beautiful mountains of Colorado."
  },
  {
    id: 5,
    title: "Women's Wellness Conference",
    date: "August 22, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Atlanta Wellness Center",
    price: "$199",
    category: "Conference",
    image: "/placeholder.svg",
    featured: false,
    description: "A day dedicated to women's health topics, featuring expert panels, health screenings, and networking opportunities."
  },
  {
    id: 6,
    title: "Plant-Based Nutrition Certificate",
    date: "September 5-6, 2025",
    time: "8:30 AM - 5:30 PM",
    location: "Online Event",
    price: "$399",
    category: "Certification",
    image: "/placeholder.svg",
    featured: false,
    description: "Earn your certification in plant-based nutrition with this comprehensive two-day online program."
  }
];

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 600]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);

  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "" || event.category === selectedCategory;
    
    const matchesLocation = selectedLocation === "" || 
                            (selectedLocation === "Online" && event.location.includes("Online")) ||
                            (selectedLocation === "In Person" && !event.location.includes("Online"));
    
    const price = parseInt(event.price.replace(/[^0-9]/g, ''));
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Banner */}
        <section className="bg-wellspring-darkgray py-12 px-4">
          <div className="container mx-auto">
            <div className="text-center">
              <h1 className="wellspring-heading">
                Discover Wellness <span className="text-wellspring-teal">Events</span>
              </h1>
              <p className="text-gray-300 max-w-xl mx-auto mb-8">
                Find and register for transformative health summits, workshops, retreats and more
              </p>
              
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search events..."
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
                            id="conference" 
                            name="category"
                            checked={selectedCategory === "Conference"}
                            onChange={() => setSelectedCategory("Conference")}
                            className="wellspring-input" 
                          />
                          <label htmlFor="conference">Conference</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="workshop" 
                            name="category"
                            checked={selectedCategory === "Workshop"}
                            onChange={() => setSelectedCategory("Workshop")}
                            className="wellspring-input" 
                          />
                          <label htmlFor="workshop">Workshop</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="retreat" 
                            name="category"
                            checked={selectedCategory === "Retreat"}
                            onChange={() => setSelectedCategory("Retreat")} 
                            className="wellspring-input"
                          />
                          <label htmlFor="retreat">Retreat</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="expo" 
                            name="category"
                            checked={selectedCategory === "Expo"}
                            onChange={() => setSelectedCategory("Expo")}
                            className="wellspring-input" 
                          />
                          <label htmlFor="expo">Expo</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="certification" 
                            name="category"
                            checked={selectedCategory === "Certification"}
                            onChange={() => setSelectedCategory("Certification")}
                            className="wellspring-input" 
                          />
                          <label htmlFor="certification">Certification</label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="location">
                    <AccordionTrigger>Location</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="all-locations" 
                            name="location"
                            checked={selectedLocation === ""}
                            onChange={() => setSelectedLocation("")}
                            className="wellspring-input" 
                          />
                          <label htmlFor="all-locations">All Locations</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="online" 
                            name="location"
                            checked={selectedLocation === "Online"}
                            onChange={() => setSelectedLocation("Online")}
                            className="wellspring-input" 
                          />
                          <label htmlFor="online">Online</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="in-person" 
                            name="location"
                            checked={selectedLocation === "In Person"}
                            onChange={() => setSelectedLocation("In Person")}
                            className="wellspring-input" 
                          />
                          <label htmlFor="in-person">In Person</label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6 px-2">
                        <Slider
                          defaultValue={[0, 600]}
                          max={600}
                          step={10}
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
                  
                  <AccordionItem value="date">
                    <AccordionTrigger>Date</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="all-dates" name="date" defaultChecked className="wellspring-input" />
                          <label htmlFor="all-dates">All Dates</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="today" name="date" className="wellspring-input" />
                          <label htmlFor="today">Today</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="this-week" name="date" className="wellspring-input" />
                          <label htmlFor="this-week">This Week</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="this-month" name="date" className="wellspring-input" />
                          <label htmlFor="this-month">This Month</label>
                        </div>
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
                      setPriceRange([0, 600]);
                      setSelectedCategory("");
                      setSelectedLocation("");
                    }}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            )}
            
            {/* Events List */}
            <div className={`${filterVisible ? 'md:w-3/4' : 'w-full'}`}>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
                </h2>
                <div className="flex items-center gap-2">
                  <Select defaultValue="recommended">
                    <SelectTrigger className="w-[180px] bg-wellspring-gray border-wellspring-gray">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="date-asc">Date (Ascending)</SelectItem>
                      <SelectItem value="date-desc">Date (Descending)</SelectItem>
                      <SelectItem value="price-low">Price (Low to High)</SelectItem>
                      <SelectItem value="price-high">Price (High to Low)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Tabs defaultValue="list" className="mb-6">
                <TabsList className="grid w-[200px] grid-cols-2">
                  <TabsTrigger value="list">List</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                </TabsList>
                <TabsContent value="list" className="pt-4">
                  {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredEvents.map(event => (
                        <Card key={event.id} className="wellspring-card overflow-hidden group h-full">
                          <div className="h-40 overflow-hidden relative">
                            <div 
                              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                              style={{ backgroundImage: `url(${event.image})` }}
                            />
                            {event.featured && (
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-wellspring-gold text-black">Featured</Badge>
                              </div>
                            )}
                            <div className="absolute bottom-2 right-2">
                              <Badge className="bg-wellspring-black bg-opacity-70">{event.category}</Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-center text-sm text-wellspring-teal mb-2">
                              <Calendar size={14} className="mr-1" />
                              {event.date}
                            </div>
                            <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                            <div className="flex items-center text-sm text-gray-400 mb-2">
                              <Clock size={14} className="mr-1" />
                              {event.time}
                            </div>
                            <div className="flex items-center text-sm text-gray-400 mb-3">
                              <MapPin size={14} className="mr-1" />
                              {event.location}
                            </div>
                            <p className="text-gray-300 text-sm line-clamp-2 mb-3">{event.description}</p>
                          </CardContent>
                          <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between">
                            <span className="font-bold">{event.price}</span>
                            <Button asChild className="wellspring-button wellspring-button-primary">
                              <Link to={`/events/${event.id}`}>View Details</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="wellspring-card p-6 text-center">
                      <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">No events found</h3>
                      <p className="text-gray-400 mb-4">Try adjusting your filters or search criteria</p>
                      <Button 
                        variant="outline" 
                        className="wellspring-button wellspring-button-outline"
                        onClick={() => {
                          setSearchTerm("");
                          setPriceRange([0, 600]);
                          setSelectedCategory("");
                          setSelectedLocation("");
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="calendar" className="pt-4">
                  <div className="wellspring-card p-6">
                    <p className="text-center text-gray-400">
                      Calendar view coming soon! Stay tuned for interactive event scheduling.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default EventsPage;
