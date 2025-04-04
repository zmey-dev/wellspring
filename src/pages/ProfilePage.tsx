
import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { 
  User, Mail, Phone, MapPin, Calendar, Settings, ShoppingBag, Edit 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock user data
const userData = {
  id: "user-001",
  name: "Emma Johnson",
  email: "emma.johnson@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  joinDate: "January 2023",
  bio: "Wellness enthusiast and yoga instructor passionate about holistic health and mindfulness practices.",
  interests: ["Yoga", "Nutrition", "Meditation", "Fitness"],
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
};

// Mock activity data
const recentActivity = [
  { 
    id: "act-001", 
    type: "purchase", 
    title: "Purchased Premium Yoga Mat", 
    date: "April 1, 2025", 
    details: "Order #ORD-2784" 
  },
  { 
    id: "act-002", 
    type: "event", 
    title: "Registered for Global Health Summit", 
    date: "March 28, 2025", 
    details: "April 15-17, 2025" 
  },
  { 
    id: "act-003", 
    type: "review", 
    title: "Reviewed Plant Protein Complex", 
    date: "March 25, 2025", 
    details: "⭐⭐⭐⭐⭐" 
  }
];

const ProfilePage = () => {
  return (
    <>
      <Header />
      
      <main className="min-h-screen py-10 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Sidebar */}
            <div className="md:w-1/3 lg:w-1/4">
              <Card className="wellspring-card overflow-hidden">
                <div className="bg-wellspring-darkgray p-6 flex flex-col items-center text-center border-b border-wellspring-gray">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="bg-wellspring-teal text-white text-xl">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold mb-1">{userData.name}</h2>
                  <p className="text-gray-400 text-sm mb-3">{userData.location}</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {userData.interests.map(interest => (
                      <Badge key={interest} variant="outline" className="bg-wellspring-gray border-wellspring-gray">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="wellspring-button wellspring-button-outline w-full"
                  >
                    <Edit size={16} className="mr-1" /> Edit Profile
                  </Button>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-wellspring-gray p-2 rounded-full">
                      <Mail size={16} className="text-wellspring-teal" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-sm">{userData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-wellspring-gray p-2 rounded-full">
                      <Phone size={16} className="text-wellspring-teal" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-sm">{userData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-wellspring-gray p-2 rounded-full">
                      <Calendar size={16} className="text-wellspring-teal" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Member Since</p>
                      <p className="text-sm">{userData.joinDate}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Profile Main Content */}
            <div className="md:w-2/3 lg:w-3/4">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-6 bg-wellspring-darkgray">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <Card className="wellspring-card mb-6">
                    <CardHeader>
                      <CardTitle>About Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{userData.bio}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="wellspring-card">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your latest interactions on Wellspring</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {recentActivity.map(activity => (
                          <div key={activity.id} className="flex gap-4">
                            <div className="bg-wellspring-gray p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                              {activity.type === "purchase" && <ShoppingBag size={18} className="text-wellspring-teal" />}
                              {activity.type === "event" && <Calendar size={18} className="text-wellspring-teal" />}
                              {activity.type === "review" && <User size={18} className="text-wellspring-teal" />}
                            </div>
                            <div>
                              <h4 className="font-medium">{activity.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <p className="text-sm text-gray-400">{activity.date}</p>
                                <span className="text-xs text-gray-500">•</span>
                                <p className="text-sm text-gray-400">{activity.details}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="orders">
                  <Card className="wellspring-card">
                    <CardHeader>
                      <CardTitle>My Orders</CardTitle>
                      <CardDescription>View and manage your order history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-gray-400 py-6">
                        Your orders will appear here. Please visit the <a href="/my-orders" className="text-wellspring-teal hover:underline">Orders Page</a> to see all your orders.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="events">
                  <Card className="wellspring-card">
                    <CardHeader>
                      <CardTitle>My Events</CardTitle>
                      <CardDescription>Events you've registered for</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-gray-400 py-6">
                        Your registered events will appear here. Please visit the <a href="/my-events" className="text-wellspring-teal hover:underline">Events Page</a> to see all upcoming events.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings">
                  <Card className="wellspring-card">
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>Manage your profile and preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-gray-400 py-6">
                        Your account settings will appear here. Please visit the <a href="/settings" className="text-wellspring-teal hover:underline">Settings Page</a> to manage your account.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ProfilePage;
