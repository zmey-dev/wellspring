
import React, { useState } from "react";
import { Search, Filter, MapPin, Calendar, Star, ArrowRight } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock experts data
const experts = [
  {
    id: 1,
    name: "Dr. Sarah Williams",
    title: "Holistic Nutrition Coach",
    specialty: "Nutrition",
    location: "San Francisco, CA",
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    bio: "Certified holistic nutritionist with 10+ years helping clients achieve optimal wellness through personalized nutrition plans.",
    available: ["Mon", "Wed", "Fri"],
    tags: ["Nutrition", "Holistic Health", "Weight Management"]
  },
  {
    id: 2,
    name: "James Chen",
    title: "Meditation & Mindfulness Coach",
    specialty: "Mental Wellness",
    location: "New York, NY",
    rating: 4.8,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    bio: "Former executive turned mindfulness coach specializing in stress reduction and work-life balance techniques.",
    available: ["Tue", "Thu", "Sat"],
    tags: ["Meditation", "Stress Management", "Corporate Wellness"]
  },
  {
    id: 3,
    name: "Dr. Maya Patel",
    title: "Physical Therapist",
    specialty: "Movement",
    location: "Chicago, IL",
    rating: 4.7,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    bio: "Specialized in functional movement therapy with expertise in rehabilitation and injury prevention.",
    available: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    tags: ["Physical Therapy", "Movement", "Pain Management"]
  },
  {
    id: 4,
    name: "David Wilson",
    title: "Sleep & Recovery Specialist",
    specialty: "Sleep",
    location: "Austin, TX",
    rating: 4.6,
    reviews: 86,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    bio: "Expert in sleep optimization strategies and recovery protocols for improved health and performance.",
    available: ["Wed", "Thu", "Sat", "Sun"],
    tags: ["Sleep Science", "Recovery", "Performance"]
  },
  {
    id: 5,
    name: "Olivia Martinez",
    title: "Yoga & Flexibility Coach",
    specialty: "Movement",
    location: "Los Angeles, CA",
    rating: 4.9,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    bio: "Certified yoga instructor with specialization in therapeutic applications for chronic conditions and injury recovery.",
    available: ["Mon", "Tue", "Thu", "Sat"],
    tags: ["Yoga", "Flexibility", "Mind-Body Connection"]
  },
  {
    id: 6,
    name: "Dr. Michael Thomas",
    title: "Functional Medicine Practitioner",
    specialty: "Wellness",
    location: "Portland, OR",
    rating: 4.8,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    bio: "Integrative health specialist focused on addressing root causes of health issues through personalized interventions.",
    available: ["Tue", "Wed", "Fri"],
    tags: ["Functional Medicine", "Integrative Health", "Chronic Conditions"]
  }
];

const ExpertsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  
  const filteredExperts = experts.filter(expert => {
    const matchesSearch = 
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSpecialty = selectedSpecialty === "all" || expert.specialty === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });
  
  return (
    <>
      <Header />
      
      <main className="min-h-screen py-10 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-4">Wellness Experts</h1>
          <p className="text-gray-400 mb-8">
            Connect with certified professionals specializing in various aspects of health and wellness
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by name, specialty, or expertise..."
                className="pl-10 wellspring-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Select 
                defaultValue="all"
                value={selectedSpecialty}
                onValueChange={setSelectedSpecialty}
              >
                <SelectTrigger className="w-[180px] bg-wellspring-gray border-wellspring-gray">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="Nutrition">Nutrition</SelectItem>
                  <SelectItem value="Mental Wellness">Mental Wellness</SelectItem>
                  <SelectItem value="Movement">Movement</SelectItem>
                  <SelectItem value="Sleep">Sleep</SelectItem>
                  <SelectItem value="Wellness">Wellness</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-wellspring-gray bg-wellspring-gray"
              >
                <Filter size={16} />
                <span>More Filters</span>
              </Button>
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="all" className="w-full mb-8">
            <TabsList className="bg-wellspring-darkgray">
              <TabsTrigger value="all">All Experts</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="mental">Mental Wellness</TabsTrigger>
              <TabsTrigger value="movement">Movement</TabsTrigger>
              <TabsTrigger value="sleep">Sleep</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredExperts.length > 0 ? (
              filteredExperts.map(expert => (
                <Card key={expert.id} className="wellspring-card overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={expert.image} alt={expert.name} />
                        <AvatarFallback>{expert.name.charAt(0)}{expert.name.split(' ')[1].charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-lg">{expert.name}</h3>
                        <p className="text-sm text-wellspring-teal mb-1">{expert.title}</p>
                        <div className="flex items-center text-sm text-gray-400">
                          <MapPin size={14} className="mr-1" />
                          <span>{expert.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-300 mb-4">
                        {expert.bio}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {expert.tags.map((tag, i) => (
                          <Badge key={i} className="bg-wellspring-darkgray text-gray-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Calendar size={14} className="mr-1 text-wellspring-teal" />
                          <span className="text-gray-400">Available: </span>
                          <span className="ml-1">{expert.available.join(', ')}</span>
                        </div>
                        <div className="flex items-center">
                          <Star size={16} className="text-wellspring-gold mr-1" fill="currentColor" />
                          <span className="font-medium">{expert.rating}</span>
                          <span className="text-gray-400 text-sm ml-1">({expert.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardFooter className="border-t border-wellspring-gray bg-wellspring-darkgray">
                    <Button 
                      className="wellspring-button wellspring-button-primary w-full"
                      onClick={() => window.location.href = `/experts/${expert.id}`}
                    >
                      View Profile & Book
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-lg text-gray-400 mb-2">No experts match your search criteria</p>
                <Button 
                  variant="link" 
                  className="text-wellspring-teal"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSpecialty("all");
                  }}
                >
                  Reset filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Become an expert CTA */}
          <div className="bg-wellspring-darkgray rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-3">Are you a wellness expert?</h2>
                <p className="text-gray-300 mb-6 max-w-xl">
                  Join our growing community of health and wellness specialists. Expand your reach, connect with new clients, and grow your practice on Wellspring.
                </p>
                <Button className="wellspring-button wellspring-button-primary">
                  Apply to Join <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
              <div className="hidden md:block bg-wellspring-gray rounded-md p-4">
                <ul className="text-sm space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-wellspring-teal p-1 mt-0.5">
                      <Star size={12} />
                    </div>
                    <span>Access to our network of wellness enthusiasts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-wellspring-teal p-1 mt-0.5">
                      <Star size={12} />
                    </div>
                    <span>Simple scheduling and client management tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-wellspring-teal p-1 mt-0.5">
                      <Star size={12} />
                    </div>
                    <span>Promotion in events and marketplace</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ExpertsPage;
