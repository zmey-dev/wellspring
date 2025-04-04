
import React, { useState } from "react";
import { 
  Search, Filter, Star, MessageCircle, Calendar, ChevronDown, MapPin
} from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock experts data
const expertsList = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    profession: "Nutritional Scientist",
    specialty: "Plant-Based Nutrition",
    education: "Ph.D. in Nutritional Biochemistry, Stanford University",
    rating: 4.9,
    reviews: 128,
    availability: "Mon, Wed, Fri",
    location: "San Francisco, CA (Virtual Available)",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    bio: "Dr. Chen specializes in plant-based nutrition and preventative health. With over 15 years of research experience, she helps clients optimize their diet for longevity and wellness."
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    profession: "Fitness Coach",
    specialty: "Functional Training & Recovery",
    education: "M.S. in Exercise Physiology, UCLA",
    rating: 4.8,
    reviews: 97,
    availability: "Tue, Thu, Sat",
    location: "Los Angeles, CA (Virtual Available)",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    bio: "Former Olympic athlete turned wellness coach, Michael specializes in personalized training programs that focus on functional movement and proper recovery techniques."
  },
  {
    id: 3,
    name: "Dr. Aisha Johnson",
    profession: "Psychologist",
    specialty: "Mindfulness & Stress Management",
    education: "Psy.D. in Clinical Psychology, Harvard University",
    rating: 5.0,
    reviews: 156,
    availability: "Mon, Tue, Thu, Fri",
    location: "Boston, MA (Virtual Available)",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    bio: "Dr. Johnson is a renowned psychologist specializing in mindfulness techniques and stress management for busy professionals. Author of the bestselling book 'Mind-Body Integration'."
  },
  {
    id: 4,
    name: "Thomas Lee",
    profession: "Wellness Coach",
    specialty: "Holistic Wellness & Life Balance",
    education: "Certified Wellness Coach, Institute for Integrative Nutrition",
    rating: 4.7,
    reviews: 83,
    availability: "Mon, Wed, Fri, Sat",
    location: "Chicago, IL (Virtual Available)",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    bio: "Thomas takes a holistic approach to wellness, focusing on the integration of physical, mental, and spiritual health to achieve optimal wellbeing and life balance."
  },
  {
    id: 5,
    name: "Dr. Emma Patel",
    profession: "Integrative Medicine Physician",
    specialty: "Functional Medicine & Hormonal Health",
    education: "M.D., Yale University, Fellowship in Integrative Medicine",
    rating: 4.9,
    reviews: 112,
    availability: "Tue, Wed, Thu",
    location: "New York, NY (Virtual Available)",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    bio: "Dr. Patel combines conventional medicine with evidence-based complementary approaches to address the root causes of illness and optimize health, with a focus on hormonal balance."
  },
  {
    id: 6,
    name: "James Wilson",
    profession: "Sleep Specialist",
    specialty: "Sleep Optimization & Circadian Rhythms",
    education: "Ph.D. in Neuroscience, Johns Hopkins University",
    rating: 4.8,
    reviews: 65,
    availability: "Mon, Thu, Fri",
    location: "Seattle, WA (Virtual Available)",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    bio: "James specializes in helping clients optimize their sleep quality through evidence-based approaches to circadian rhythm adjustment and sleep environment optimization."
  }
];

// Specialties filter options
const specialties = [
  "All Specialties",
  "Plant-Based Nutrition",
  "Functional Training",
  "Mindfulness",
  "Holistic Wellness",
  "Functional Medicine",
  "Sleep Optimization"
];

const ExpertsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedAvailability, setSelectedAvailability] = useState("Any Availability");
  const [selectedLocation, setSelectedLocation] = useState("Any Location");
  const [filterVisible, setFilterVisible] = useState(false);

  // Filter experts based on search and filters
  const filteredExperts = expertsList.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === "All Specialties" || 
                            expert.specialty.includes(selectedSpecialty);
    
    return matchesSearch && matchesSpecialty;
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
                Wellness <span className="text-wellspring-teal">Experts</span>
              </h1>
              <p className="text-gray-300 max-w-xl mx-auto mb-8">
                Connect with certified professionals who can guide your wellness journey
              </p>
              
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search experts by name, specialty, or keyword..."
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
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Specialty</label>
                    <Select 
                      value={selectedSpecialty} 
                      onValueChange={setSelectedSpecialty}
                    >
                      <SelectTrigger className="bg-wellspring-gray border-wellspring-gray">
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((specialty, index) => (
                          <SelectItem key={index} value={specialty}>{specialty}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Availability</label>
                    <Select 
                      value={selectedAvailability} 
                      onValueChange={setSelectedAvailability}
                    >
                      <SelectTrigger className="bg-wellspring-gray border-wellspring-gray">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Any Availability">Any Availability</SelectItem>
                        <SelectItem value="Available Today">Available Today</SelectItem>
                        <SelectItem value="Available This Week">Available This Week</SelectItem>
                        <SelectItem value="Weekends Only">Weekends Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Select 
                      value={selectedLocation} 
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger className="bg-wellspring-gray border-wellspring-gray">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Any Location">Any Location</SelectItem>
                        <SelectItem value="Virtual Only">Virtual Only</SelectItem>
                        <SelectItem value="In-Person Only">In-Person Only</SelectItem>
                        <SelectItem value="New York">New York</SelectItem>
                        <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                        <SelectItem value="Chicago">Chicago</SelectItem>
                        <SelectItem value="San Francisco">San Francisco</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-4">
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="rating-5" className="wellspring-input" />
                      <label htmlFor="rating-5" className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="rating-4" className="wellspring-input" />
                      <label htmlFor="rating-4" className="flex items-center">
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                          ))}
                          <Star size={14} className="text-gray-400" />
                        </div>
                        <span className="ml-1 text-sm">& up</span>
                      </label>
                    </div>
                  </div>
                </div>
                
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
                      setSelectedSpecialty("All Specialties");
                      setSelectedAvailability("Any Availability");
                      setSelectedLocation("Any Location");
                    }}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            )}
            
            {/* Experts List */}
            <div className={`${filterVisible ? 'md:w-3/4' : 'w-full'}`}>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {filteredExperts.length} {filteredExperts.length === 1 ? 'Expert' : 'Experts'} Found
                </h2>
                <div className="flex items-center gap-2">
                  <Select defaultValue="recommended">
                    <SelectTrigger className="w-[180px] bg-wellspring-gray border-wellspring-gray">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="rating-high">Rating (Highest)</SelectItem>
                      <SelectItem value="reviews-most">Most Reviews</SelectItem>
                      <SelectItem value="name-asc">Name (A to Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Tabs defaultValue="all" className="mb-6">
                <TabsList className="grid w-[360px] grid-cols-3">
                  <TabsTrigger value="all">All Experts</TabsTrigger>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="available">Available Today</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="pt-4">
                  {filteredExperts.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {filteredExperts.map(expert => (
                        <Card key={expert.id} className="wellspring-card overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 p-4">
                              <div className="aspect-square rounded-md overflow-hidden mb-4">
                                <img 
                                  src={expert.image} 
                                  alt={expert.name}
                                  className="w-full h-full object-cover" 
                                />
                              </div>
                              <div className="flex items-center mb-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      size={14} 
                                      className={`${
                                        i < Math.floor(expert.rating) 
                                          ? "text-yellow-400 fill-yellow-400" 
                                          : "text-gray-400"
                                      }`} 
                                    />
                                  ))}
                                </div>
                                <span className="ml-1 text-sm">{expert.rating}</span>
                                <span className="ml-1 text-xs text-gray-400">({expert.reviews})</span>
                              </div>
                            </div>
                            <div className="md:w-2/3 p-4">
                              <h3 className="font-bold text-lg mb-1">{expert.name}</h3>
                              <p className="text-wellspring-teal text-sm mb-2">{expert.profession}</p>
                              <Badge className="mb-3">{expert.specialty}</Badge>
                              
                              <p className="text-sm text-gray-300 mb-4 line-clamp-3">{expert.bio}</p>
                              
                              <div className="flex items-center text-sm text-gray-400 mb-2">
                                <MapPin size={14} className="mr-1" />
                                {expert.location}
                              </div>
                              <div className="flex items-center text-sm text-gray-400 mb-4">
                                <Calendar size={14} className="mr-1" />
                                Available: {expert.availability}
                              </div>
                              
                              <div className="flex gap-2">
                                <Button className="wellspring-button wellspring-button-primary flex-1">
                                  View Profile
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className="wellspring-button wellspring-button-outline"
                                >
                                  <MessageCircle size={16} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="wellspring-card p-6 text-center">
                      <div className="mx-auto mb-4 h-12 w-12 text-gray-400">
                        <Search className="h-12 w-12" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">No experts found</h3>
                      <p className="text-gray-400 mb-4">Try adjusting your filters or search criteria</p>
                      <Button 
                        variant="outline" 
                        className="wellspring-button wellspring-button-outline"
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedSpecialty("All Specialties");
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="featured">
                  <div className="wellspring-card p-6 mt-4">
                    <p className="text-center text-gray-400">
                      Featured experts coming soon. Check back for our curated selection of top wellness professionals.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="available">
                  <div className="wellspring-card p-6 mt-4">
                    <p className="text-center text-gray-400">
                      Real-time availability tracking coming soon. Check back for experts available for immediate consultations.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="text-center py-8">
                <Button variant="outline" className="wellspring-button wellspring-button-outline">
                  Load More Experts
                </Button>
              </div>
            </div>
          </div>
          
          {/* Become an Expert CTA */}
          <div className="mt-12 bg-wellspring-darkgray rounded-lg p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">Are You a Wellness Professional?</h3>
                <p className="text-gray-300 mb-4 max-w-md">
                  Join our network of certified wellness experts and connect with clients seeking your expertise.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <div className="mr-2 h-5 w-5 text-wellspring-teal">✓</div>
                    <span>Expand your client base</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-5 w-5 text-wellspring-teal">✓</div>
                    <span>Showcase your credentials and specialties</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-5 w-5 text-wellspring-teal">✓</div>
                    <span>Flexible scheduling and virtual appointments</span>
                  </li>
                </ul>
                <Button className="wellspring-button wellspring-button-primary">
                  Apply to Join
                </Button>
              </div>
              <div className="hidden md:block max-w-xs">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                  alt="Wellness Expert" 
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default ExpertsPage;
