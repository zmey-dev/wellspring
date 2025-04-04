import React from "react";
import { 
  Calendar, MapPin, Clock, Download, Search, Filter, ArrowRight 
} from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock registered events data
const registeredEvents = [
  {
    id: 1,
    title: "Global Health Summit 2025",
    date: "April 15-17, 2025",
    time: "8:00 AM - 5:00 PM",
    location: "San Francisco Convention Center",
    registrationType: "VIP Pass",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    status: "upcoming"
  },
  {
    id: 2,
    title: "Wellness Workshop Series",
    date: "May 5, 2025",
    time: "10:00 AM - 2:00 PM",
    location: "Online Event",
    registrationType: "Standard Access",
    image: "https://images.unsplash.com/photo-1517637382994-f02da38c6728?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    status: "upcoming"
  },
  {
    id: 3,
    title: "Women's Wellness Conference",
    date: "February 22, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Atlanta Wellness Center",
    registrationType: "Standard Access",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    status: "past"
  },
  {
    id: 4,
    title: "Plant-Based Nutrition Certificate",
    date: "January 5-6, 2025",
    time: "8:30 AM - 5:30 PM",
    location: "Online Event",
    registrationType: "Professional Certificate",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    status: "past"
  }
];

const MyEventsPage = () => {
  return (
    <>
      <Header />
      
      <main className="min-h-screen py-10 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Events</h1>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search your events..."
                className="pl-10 wellspring-input"
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-wellspring-gray bg-wellspring-gray"
            >
              <Filter size={16} />
              <span>Filters</span>
            </Button>
          </div>
          
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-6 bg-wellspring-darkgray">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
              <TabsTrigger value="saved">Saved Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {registeredEvents.filter(event => event.status === "upcoming").map(event => (
                  <Card key={event.id} className="wellspring-card overflow-hidden group">
                    <div className="h-40 overflow-hidden relative">
                      <img 
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-wellspring-teal">Registered</Badge>
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
                      <div className="bg-wellspring-darkgray rounded-md px-3 py-2 mb-3">
                        <p className="text-sm font-medium">Registration Type: {event.registrationType}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="px-4 pb-4 pt-0 flex justify-between">
                      <Button 
                        variant="outline" 
                        className="wellspring-button wellspring-button-outline"
                      >
                        <Download size={16} className="mr-1" /> Ticket
                      </Button>
                      <Button 
                        className="wellspring-button wellspring-button-primary"
                        onClick={() => window.location.href = `/events/${event.id}`}
                      >
                        Event Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="past">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {registeredEvents.filter(event => event.status === "past").map(event => (
                  <Card key={event.id} className="wellspring-card overflow-hidden group">
                    <div className="h-40 overflow-hidden relative">
                      <img 
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <Badge className="bg-gray-700">Completed</Badge>
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
                      <div className="bg-wellspring-darkgray rounded-md px-3 py-2 mb-3">
                        <p className="text-sm font-medium">Registration Type: {event.registrationType}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="px-4 pb-4 pt-0 flex justify-end">
                      <Button 
                        className="wellspring-button wellspring-button-primary"
                        onClick={() => window.location.href = `/events/${event.id}`}
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="saved">
              <Card className="wellspring-card">
                <CardHeader>
                  <CardTitle>Saved Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <div className="bg-wellspring-darkgray inline-flex p-4 rounded-full mb-4">
                      <Calendar className="h-8 w-8 text-wellspring-teal" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No saved events yet</h3>
                    <p className="text-gray-400 max-w-md mx-auto mb-6">
                      Browse upcoming events and save the ones you're interested in to keep track of them here.
                    </p>
                    <Button 
                      className="wellspring-button wellspring-button-primary"
                      onClick={() => window.location.href = "/events"}
                    >
                      Browse Events
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 bg-wellspring-darkgray rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Discover More Wellness Events</h3>
                <p className="text-gray-400">
                  Explore our curated collection of health and wellness events
                </p>
              </div>
              <Button 
                className="wellspring-button wellspring-button-primary"
                onClick={() => window.location.href = "/events"}
              >
                View All Events <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default MyEventsPage;
