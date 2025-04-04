
import React, { useState } from "react";
import { format } from "date-fns";
import { 
  Bell, Calendar, Heart, MessageSquare, ShoppingBag, User, CheckCircle, Clock, Calendar as CalendarIcon
} from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample notifications data
const notificationsData = [
  {
    id: 1,
    type: "event",
    title: "Event Reminder: Global Health Summit",
    message: "The Global Health Summit 2025 is starting tomorrow at 8:00 AM. Don't forget to bring your ticket!",
    time: "10 minutes ago",
    read: false,
    action: "View Event",
    icon: <Calendar className="h-10 w-10 p-2 rounded-full bg-wellspring-darkgray text-wellspring-teal" />,
  },
  {
    id: 2,
    type: "order",
    title: "Order Shipped",
    message: "Your order #45871 (Wellness Essentials Bundle) has been shipped and will arrive in 2-3 business days.",
    time: "2 hours ago",
    read: false,
    action: "Track Order",
    icon: <ShoppingBag className="h-10 w-10 p-2 rounded-full bg-wellspring-darkgray text-wellspring-teal" />,
  },
  {
    id: 3,
    type: "social",
    title: "New Message",
    message: "Dr. Sarah Chen sent you a message about your upcoming consultation.",
    time: "5 hours ago",
    read: true,
    action: "Read Message",
    icon: <MessageSquare className="h-10 w-10 p-2 rounded-full bg-wellspring-darkgray text-wellspring-teal" />,
  },
  {
    id: 4,
    type: "system",
    title: "Account Verified",
    message: "Your wellness professional account has been verified. You can now access all platform features.",
    time: "1 day ago",
    read: true,
    action: "View Profile",
    icon: <CheckCircle className="h-10 w-10 p-2 rounded-full bg-wellspring-darkgray text-wellspring-teal" />,
  },
  {
    id: 5,
    type: "social",
    title: "New Connection",
    message: "Michael Rodriguez accepted your connection request. You can now message each other.",
    time: "2 days ago",
    read: true,
    action: "View Profile",
    icon: <User className="h-10 w-10 p-2 rounded-full bg-wellspring-darkgray text-wellspring-teal" />,
  },
  {
    id: 6,
    type: "event",
    title: "New Event Recommendation",
    message: "Based on your interests, we think you'd enjoy the upcoming 'Plant-Based Nutrition Certificate' event.",
    time: "3 days ago",
    read: true,
    action: "View Event",
    icon: <Calendar className="h-10 w-10 p-2 rounded-full bg-wellspring-darkgray text-wellspring-teal" />,
  },
];

// Function to format the timestamp
const formatTimeAgo = (timestamp: string) => {
  if (timestamp.includes("minutes ago") || timestamp.includes("minute ago")) {
    const minutes = parseInt(timestamp.split(" ")[0], 10);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (timestamp.includes("hours ago") || timestamp.includes("hour ago")) {
    const hours = parseInt(timestamp.split(" ")[0], 10);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return timestamp;
  }
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [activeTab, setActiveTab] = useState("all");
  
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  // Filter notifications based on the active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    return notification.type === activeTab;
  });
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <Header />
      
      <main className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Notifications</h1>
              <p className="text-gray-400">
                {unreadCount > 0 
                  ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                  : "You're all caught up!"
                }
              </p>
            </div>
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                className="wellspring-button wellspring-button-outline mt-4 md:mt-0"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-wellspring-darkgray">
              <TabsTrigger value="all">
                All
                {unreadCount > 0 && (
                  <Badge className="ml-2 bg-wellspring-teal">{unreadCount}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="event">Events</TabsTrigger>
              <TabsTrigger value="order">Orders</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="pt-4">
              <div className="space-y-4">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map(notification => (
                    <Card 
                      key={notification.id} 
                      className={`wellspring-card transition-colors ${!notification.read ? 'border-l-4 border-l-wellspring-teal' : ''}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            {notification.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-bold text-lg">{notification.title}</h3>
                                <p className="text-sm text-gray-300 mb-4">{notification.message}</p>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-xs text-gray-400">
                                  {formatTimeAgo(notification.time)}
                                </span>
                                {!notification.read && (
                                  <Badge className="mt-1 bg-wellspring-teal">New</Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <Button 
                                className="wellspring-button wellspring-button-primary"
                                onClick={() => markAsRead(notification.id)}
                              >
                                {notification.action}
                              </Button>
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-sm"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  Mark as read
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="wellspring-card">
                    <CardContent className="p-8 text-center">
                      <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No notifications</h3>
                      <p className="text-gray-400">
                        There are no {activeTab === "all" ? "" : activeTab} notifications to display at this time.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <Card className="wellspring-card mt-10">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-400">Receive notifications via email</p>
                  </div>
                  <div className="flex items-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="relative w-11 h-6 bg-gray-600 rounded-full peer-checked:bg-wellspring-teal peer-focus:ring-4 peer-focus:ring-wellspring-teal dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-gray-400">Receive notifications on your device</p>
                  </div>
                  <div className="flex items-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="relative w-11 h-6 bg-gray-600 rounded-full peer-checked:bg-wellspring-teal peer-focus:ring-4 peer-focus:ring-wellspring-teal dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Marketing Communications</h4>
                    <p className="text-sm text-gray-400">Receive updates about events and promotions</p>
                  </div>
                  <div className="flex items-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="relative w-11 h-6 bg-gray-600 rounded-full peer-checked:bg-wellspring-teal peer-focus:ring-4 peer-focus:ring-wellspring-teal dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default NotificationsPage;
