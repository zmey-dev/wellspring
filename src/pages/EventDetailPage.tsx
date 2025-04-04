import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Calendar, MapPin, Clock, Share2, Bookmark, CheckCircle, Users, Tag, ArrowLeft
} from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

// Mock event data
const eventData = {
  id: 1,
  title: "Global Health Summit 2025",
  date: "April 15-17, 2025",
  time: "8:00 AM - 5:00 PM",
  location: "San Francisco Convention Center",
  address: "747 Howard St, San Francisco, CA 94103",
  price: "$299",
  category: "Conference",
  image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  banner: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  description: "Join world-renowned health experts for a three-day summit focused on the latest advances in holistic health practices and wellness technologies. This summit brings together leading researchers, practitioners, and wellness entrepreneurs to share cutting-edge insights on nutrition, fitness, mental health, and preventative medicine. Featuring keynote presentations, interactive workshops, and extensive networking opportunities, the Global Health Summit is the premier gathering for those passionate about advancing the wellness industry.",
  ticketTiers: [
    {
      name: "Standard Access",
      price: "$299",
      features: [
        "Access to all keynote presentations",
        "Entry to exhibition area",
        "Digital conference materials",
        "Coffee breaks and lunches"
      ]
    },
    {
      name: "VIP Access",
      price: "$599",
      features: [
        "All Standard Access features",
        "Priority seating for keynotes",
        "Exclusive networking reception",
        "VIP lounge access",
        "Recorded sessions access post-event"
      ]
    },
    {
      name: "Premium Workshop Bundle",
      price: "$899",
      features: [
        "All VIP Access features",
        "Access to all workshop sessions",
        "One-on-one sessions with speakers",
        "Wellness gift package",
        "1-year membership to Health Summit Community"
      ]
    }
  ],
  speakers: [
    {
      name: "Dr. Sarah Chen",
      title: "Director of Nutritional Sciences, Stanford University",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      bio: "Leading researcher in nutritional biochemistry and preventative health."
    },
    {
      name: "Michael Rodriguez",
      title: "Founder, Wellness Technologies Inc.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      bio: "Pioneer in health-tracking wearables and AI-powered wellness applications."
    },
    {
      name: "Dr. Aisha Johnson",
      title: "Author, 'Mind-Body Integration'",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      bio: "Renowned psychologist specializing in the connection between mental health and physical wellness."
    },
    {
      name: "Thomas Lee",
      title: "Olympic Gold Medalist & Wellness Coach",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      bio: "Former athlete turned wellness advocate focusing on physical performance and recovery methods."
    }
  ],
  schedule: [
    {
      day: "Day 1 - April 15",
      events: [
        { time: "8:00 AM - 9:00 AM", title: "Registration & Welcome Coffee" },
        { time: "9:00 AM - 10:30 AM", title: "Keynote: The Future of Preventative Health", speaker: "Dr. Sarah Chen" },
        { time: "10:45 AM - 12:15 PM", title: "Panel Discussion: Integrating Technology in Wellness" },
        { time: "12:30 PM - 2:00 PM", title: "Networking Lunch" },
        { time: "2:15 PM - 3:45 PM", title: "Workshop: Nutrition Science Breakthroughs" },
        { time: "4:00 PM - 5:30 PM", title: "Keynote: Mind-Body Integration", speaker: "Dr. Aisha Johnson" },
        { time: "6:00 PM - 8:00 PM", title: "Welcome Reception (VIP & Premium Ticket Holders)" }
      ]
    },
    {
      day: "Day 2 - April 16",
      events: [
        { time: "8:30 AM - 9:00 AM", title: "Morning Coffee & Networking" },
        { time: "9:00 AM - 10:30 AM", title: "Keynote: Wearable Tech Revolution", speaker: "Michael Rodriguez" },
        { time: "10:45 AM - 12:15 PM", title: "Workshop: Athletic Performance Optimization", speaker: "Thomas Lee" },
        { time: "12:30 PM - 2:00 PM", title: "Networking Lunch" },
        { time: "2:15 PM - 3:45 PM", title: "Panel Discussion: Global Wellness Trends" },
        { time: "4:00 PM - 5:30 PM", title: "Innovation Showcase: New Wellness Products" },
        { time: "7:00 PM - 10:00 PM", title: "Gala Dinner (Premium Ticket Holders)" }
      ]
    },
    {
      day: "Day 3 - April 17",
      events: [
        { time: "8:30 AM - 9:00 AM", title: "Morning Coffee & Networking" },
        { time: "9:00 AM - 10:30 AM", title: "Keynote: Sustainable Health Practices" },
        { time: "10:45 AM - 12:15 PM", title: "Workshop: Mental Wellness Techniques", speaker: "Dr. Aisha Johnson" },
        { time: "12:30 PM - 2:00 PM", title: "Networking Lunch" },
        { time: "2:15 PM - 3:45 PM", title: "Panel: The Business of Wellness" },
        { time: "4:00 PM - 5:00 PM", title: "Closing Keynote & Farewell" }
      ]
    }
  ]
};

const EventDetailPage = () => {
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (!isBookmarked) {
      toast({
        title: "Event saved",
        description: "Event added to your bookmarks.",
      });
    } else {
      toast({
        title: "Event removed",
        description: "Event removed from your bookmarks.",
      });
    }
  };
  
  const handleTicketSelection = (ticketIndex) => {
    setSelectedTicket(ticketIndex);
  };
  
  const handleRegister = () => {
    if (selectedTicket !== null) {
      toast({
        title: "Registration successful!",
        description: `You've registered for ${eventData.title} with ${eventData.ticketTiers[selectedTicket].name}.`,
      });
    } else {
      toast({
        title: "Please select a ticket",
        description: "You need to select a ticket type to register for this event.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        {/* Event Banner */}
        <div className="relative h-64 md:h-80 lg:h-96">
          <img 
            src={eventData.banner} 
            alt={eventData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <Button 
            variant="outline" 
            className="absolute top-4 left-4 bg-black/50 border-white/20 hover:bg-black/70"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={16} className="mr-1" /> Back
          </Button>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Event Details */}
            <div className="lg:w-2/3">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-wellspring-teal">{eventData.category}</Badge>
                    <span className="text-gray-400">Event #{eventData.id}</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{eventData.title}</h1>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-gray-300">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-wellspring-teal" />
                      {eventData.date}
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-wellspring-teal" />
                      {eventData.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-wellspring-teal" />
                      {eventData.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="bg-wellspring-darkgray border-wellspring-gray"
                    onClick={() => {
                      navigator.share({
                        title: eventData.title,
                        text: "Check out this event!",
                        url: window.location.href,
                      }).catch(console.error);
                    }}
                  >
                    <Share2 size={16} />
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`bg-wellspring-darkgray border-wellspring-gray ${isBookmarked ? 'text-wellspring-gold' : ''}`}
                    onClick={handleBookmark}
                  >
                    <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="about" className="mb-8">
                <TabsList className="bg-wellspring-darkgray">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="speakers">Speakers</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="venue">Venue</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="pt-4">
                  <div className="wellspring-card p-6">
                    <h2 className="text-xl font-bold mb-4">Event Description</h2>
                    <p className="text-gray-300 mb-6">{eventData.description}</p>
                    
                    <h3 className="text-lg font-bold mb-3">What's Included:</h3>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <CheckCircle size={16} className="mr-2 text-wellspring-teal" />
                        <span>Access to all keynote presentations and panels</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="mr-2 text-wellspring-teal" />
                        <span>Networking opportunities with industry leaders</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="mr-2 text-wellspring-teal" />
                        <span>Exhibition area showcasing innovative wellness products</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="mr-2 text-wellspring-teal" />
                        <span>Digital access to presentation materials</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="mr-2 text-wellspring-teal" />
                        <span>Certificate of attendance</span>
                      </li>
                    </ul>
                    
                    <h3 className="text-lg font-bold mb-3">Additional Information:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Users size={16} className="mr-2 text-wellspring-teal" />
                        <span>Expected Attendees: 1,000+</span>
                      </div>
                      <div className="flex items-center">
                        <Tag size={16} className="mr-2 text-wellspring-teal" />
                        <span>Tags: Health, Wellness, Nutrition, Technology</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="speakers" className="pt-4">
                  <div className="wellspring-card p-6">
                    <h2 className="text-xl font-bold mb-6">Featured Speakers</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {eventData.speakers.map((speaker, index) => (
                        <div key={index} className="flex gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={speaker.image} alt={speaker.name} />
                            <AvatarFallback>{speaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-bold">{speaker.name}</h3>
                            <p className="text-sm text-wellspring-teal mb-1">{speaker.title}</p>
                            <p className="text-sm text-gray-400">{speaker.bio}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="schedule" className="pt-4">
                  <div className="wellspring-card p-6">
                    <h2 className="text-xl font-bold mb-6">Event Schedule</h2>
                    
                    <div className="space-y-8">
                      {eventData.schedule.map((day, dayIndex) => (
                        <div key={dayIndex}>
                          <h3 className="text-lg font-bold mb-4 text-wellspring-teal">{day.day}</h3>
                          <div className="space-y-4">
                            {day.events.map((event, eventIndex) => (
                              <div 
                                key={eventIndex} 
                                className="p-3 border-l-2 border-wellspring-teal bg-wellspring-darkgray rounded-r-md"
                              >
                                <p className="text-sm text-wellspring-teal">{event.time}</p>
                                <h4 className="font-medium">{event.title}</h4>
                                {event.speaker && <p className="text-sm text-gray-400">Presenter: {event.speaker}</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="venue" className="pt-4">
                  <div className="wellspring-card p-6">
                    <h2 className="text-xl font-bold mb-4">Venue Information</h2>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/2">
                        <h3 className="font-bold mb-2">{eventData.location}</h3>
                        <p className="text-gray-300 mb-4">{eventData.address}</p>
                        
                        <h4 className="font-medium mt-6 mb-2">Directions:</h4>
                        <div className="space-y-2 text-sm text-gray-300">
                          <p><strong>Public Transit:</strong> 5-minute walk from Montgomery St. BART/Muni Station</p>
                          <p><strong>Parking:</strong> Available at 5th & Mission Garage, 833 Mission St</p>
                          <p><strong>Airport:</strong> 20-minute drive from SFO International Airport</p>
                        </div>
                        
                        <h4 className="font-medium mt-6 mb-2">Amenities:</h4>
                        <div className="space-y-2 text-sm text-gray-300">
                          <p>• Wheelchair accessible</p>
                          <p>• WiFi available throughout the venue</p>
                          <p>• Multiple food and beverage options onsite</p>
                          <p>• Business center services</p>
                        </div>
                      </div>
                      <div className="md:w-1/2 h-[300px] bg-wellspring-darkgray rounded-md flex items-center justify-center">
                        <div className="text-center">
                          <MapPin size={32} className="mx-auto mb-2 text-wellspring-teal" />
                          <p className="text-gray-400">Interactive map will display here</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Ticket Selection */}
            <div className="lg:w-1/3">
              <Card className="wellspring-card overflow-hidden sticky top-20">
                <div className="p-6 border-b border-wellspring-gray">
                  <h2 className="text-xl font-bold mb-2">Register for this Event</h2>
                  <p className="text-gray-400 text-sm">
                    Select your ticket type to attend this event
                  </p>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4 mb-6">
                    {eventData.ticketTiers.map((tier, index) => (
                      <div 
                        key={index}
                        className={`p-4 border rounded-md cursor-pointer transition-colors ${
                          selectedTicket === index 
                            ? 'border-wellspring-teal bg-wellspring-teal bg-opacity-10' 
                            : 'border-wellspring-gray'
                        }`}
                        onClick={() => handleTicketSelection(index)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold">{tier.name}</h3>
                          <span className="text-wellspring-teal font-bold">{tier.price}</span>
                        </div>
                        <ul className="space-y-2">
                          {tier.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <CheckCircle size={14} className="mr-2 mt-1 text-wellspring-teal flex-shrink-0" />
                              <span className="text-sm text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="wellspring-button wellspring-button-primary w-full"
                    onClick={handleRegister}
                  >
                    Register Now
                  </Button>
                  
                  <div className="mt-4 text-center text-xs text-gray-400">
                    By registering, you agree to our <a href="#" className="text-wellspring-teal underline">Terms & Conditions</a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default EventDetailPage;
