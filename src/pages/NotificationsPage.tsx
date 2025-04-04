
import React, { useState } from "react";
import { Settings, Bell, Clock, Calendar, ShoppingBag, Users, MessageCircle, Check, Trash2 } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "event",
    title: "Reminder: Yoga Retreat",
    message: "Your Yoga Retreat event starts tomorrow at 9:00 AM. Don't forget to bring your yoga mat!",
    date: "2025-04-03T14:32:00",
    read: false
  },
  {
    id: 2,
    type: "order",
    title: "Order Shipped",
    message: "Your order #ORD-2651 has been shipped and is on its way. Estimated delivery date: April 10, 2025.",
    date: "2025-04-02T09:15:00",
    read: false
  },
  {
    id: 3,
    type: "social",
    title: "New Connection Request",
    message: "Dr. Sarah Williams would like to connect with you on Wellspring.",
    date: "2025-04-01T16:45:00",
    read: true
  },
  {
    id: 4,
    type: "event",
    title: "Event Update: Nutrition Workshop",
    message: "The location for the Nutrition Workshop on April 15 has been changed. The event will now take place at The Wellness Center, 123 Health St.",
    date: "2025-03-30T11:20:00",
    read: true
  },
  {
    id: 5,
    type: "order",
    title: "Order Delivered",
    message: "Your order #ORD-2784 has been delivered. Enjoy your new Premium Yoga Mat!",
    date: "2025-03-28T15:10:00",
    read: true
  },
  {
    id: 6,
    type: "system",
    title: "Account Security",
    message: "We've detected a new login to your account from a new device. If this was you, no action is needed.",
    date: "2025-03-25T08:30:00",
    read: true
  }
];

const getNotificationIcon = (type) => {
  switch(type) {
    case 'event':
      return <Calendar size={18} className="text-wellspring-teal" />;
    case 'order':
      return <ShoppingBag size={18} className="text-wellspring-gold" />;
    case 'social':
      return <Users size={18} className="text-blue-400" />;
    case 'system':
      return <Bell size={18} className="text-purple-400" />;
    default:
      return <MessageCircle size={18} className="text-gray-400" />;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

const NotificationsPage = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    eventReminders: true,
    orderUpdates: true,
    newMessages: true,
    marketingEmails: false
  });
  
  const [activeNotifications, setActiveNotifications] = useState(notifications);
  
  const markAsRead = (id) => {
    setActiveNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const deleteNotification = (id) => {
    setActiveNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };
  
  const markAllAsRead = () => {
    setActiveNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const clearAll = () => {
    setActiveNotifications([]);
  };
  
  return (
    <>
      <Header />
      
      <main className="min-h-screen py-10 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Notifications</h1>
          
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <TabsList className="bg-wellspring-darkgray">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  {activeNotifications.filter(n => !n.read).length > 0 && (
                    <Badge className="ml-2 bg-wellspring-teal h-5 w-5 flex items-center justify-center p-0 rounded-full text-[10px]">
                      {activeNotifications.filter(n => !n.read).length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-4 mt-4 md:mt-0">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  onClick={markAllAsRead}
                >
                  <Check size={16} className="mr-1" />
                  Mark all as read
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  onClick={clearAll}
                >
                  <Trash2 size={16} className="mr-1" />
                  Clear all
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  onClick={() => window.location.href = "/settings?tab=notifications"}
                >
                  <Settings size={16} className="mr-1" />
                  Settings
                </Button>
              </div>
            </div>
            
            <TabsContent value="all">
              <div className="space-y-4">
                {activeNotifications.length > 0 ? (
                  activeNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-md ${notification.read ? 'bg-wellspring-darkgray' : 'bg-wellspring-gray'}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-wellspring-black p-2 rounded-full">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium">
                              {notification.title}
                              {!notification.read && (
                                <Badge className="ml-2 bg-wellspring-teal">New</Badge>
                              )}
                            </h3>
                            <span className="text-sm text-gray-400 flex items-center">
                              <Clock size={14} className="mr-1" />
                              {formatDate(notification.date)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">
                            {notification.message}
                          </p>
                          <div className="flex gap-2">
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-wellspring-teal hover:text-wellspring-teal hover:bg-wellspring-gray"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check size={14} className="mr-1" />
                                Mark as read
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-gray-400 hover:text-white hover:bg-wellspring-gray"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 size={14} className="mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20">
                    <Bell size={48} className="mx-auto mb-4 text-gray-500" />
                    <h3 className="text-xl font-medium mb-2">No notifications</h3>
                    <p className="text-gray-400">
                      You don't have any notifications at the moment
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="unread">
              <div className="space-y-4">
                {activeNotifications.filter(n => !n.read).length > 0 ? (
                  activeNotifications.filter(n => !n.read).map((notification) => (
                    <div 
                      key={notification.id} 
                      className="p-4 rounded-md bg-wellspring-gray"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-wellspring-black p-2 rounded-full">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium">
                              {notification.title}
                              <Badge className="ml-2 bg-wellspring-teal">New</Badge>
                            </h3>
                            <span className="text-sm text-gray-400 flex items-center">
                              <Clock size={14} className="mr-1" />
                              {formatDate(notification.date)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">
                            {notification.message}
                          </p>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-wellspring-teal hover:text-wellspring-teal hover:bg-wellspring-gray"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check size={14} className="mr-1" />
                              Mark as read
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-gray-400 hover:text-white hover:bg-wellspring-gray"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 size={14} className="mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20">
                    <Check size={48} className="mx-auto mb-4 text-gray-500" />
                    <h3 className="text-xl font-medium mb-2">All caught up!</h3>
                    <p className="text-gray-400">
                      You have no unread notifications
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="events">
              <div className="space-y-4">
                {activeNotifications.filter(n => n.type === 'event').length > 0 ? (
                  activeNotifications.filter(n => n.type === 'event').map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-md ${notification.read ? 'bg-wellspring-darkgray' : 'bg-wellspring-gray'}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-wellspring-black p-2 rounded-full">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium">
                              {notification.title}
                              {!notification.read && (
                                <Badge className="ml-2 bg-wellspring-teal">New</Badge>
                              )}
                            </h3>
                            <span className="text-sm text-gray-400 flex items-center">
                              <Clock size={14} className="mr-1" />
                              {formatDate(notification.date)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">
                            {notification.message}
                          </p>
                          <div className="flex gap-2">
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-wellspring-teal hover:text-wellspring-teal hover:bg-wellspring-gray"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check size={14} className="mr-1" />
                                Mark as read
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-gray-400 hover:text-white hover:bg-wellspring-gray"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 size={14} className="mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20">
                    <Calendar size={48} className="mx-auto mb-4 text-gray-500" />
                    <h3 className="text-xl font-medium mb-2">No event notifications</h3>
                    <p className="text-gray-400">
                      You don't have any event notifications at the moment
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="orders">
              <div className="space-y-4">
                {activeNotifications.filter(n => n.type === 'order').length > 0 ? (
                  activeNotifications.filter(n => n.type === 'order').map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-md ${notification.read ? 'bg-wellspring-darkgray' : 'bg-wellspring-gray'}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-wellspring-black p-2 rounded-full">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium">
                              {notification.title}
                              {!notification.read && (
                                <Badge className="ml-2 bg-wellspring-teal">New</Badge>
                              )}
                            </h3>
                            <span className="text-sm text-gray-400 flex items-center">
                              <Clock size={14} className="mr-1" />
                              {formatDate(notification.date)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">
                            {notification.message}
                          </p>
                          <div className="flex gap-2">
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-wellspring-teal hover:text-wellspring-teal hover:bg-wellspring-gray"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check size={14} className="mr-1" />
                                Mark as read
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-gray-400 hover:text-white hover:bg-wellspring-gray"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 size={14} className="mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20">
                    <ShoppingBag size={48} className="mx-auto mb-4 text-gray-500" />
                    <h3 className="text-xl font-medium mb-2">No order notifications</h3>
                    <p className="text-gray-400">
                      You don't have any order notifications at the moment
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Notification Settings */}
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
            <div className="bg-wellspring-darkgray rounded-lg p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-400">Receive notifications via email</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.email} 
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, email: checked})}
                  />
                </div>
                
                <Separator className="bg-wellspring-gray" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-gray-400">Receive notifications on your device</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.push} 
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, push: checked})}
                  />
                </div>
                
                <Separator className="bg-wellspring-gray" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Event Reminders</h3>
                      <p className="text-sm text-gray-400">Reminders for upcoming events</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.eventReminders} 
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, eventReminders: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Order Updates</h3>
                      <p className="text-sm text-gray-400">Updates about your orders</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.orderUpdates} 
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, orderUpdates: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">New Messages</h3>
                      <p className="text-sm text-gray-400">Notifications for new messages</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.newMessages} 
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, newMessages: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Marketing Emails</h3>
                      <p className="text-sm text-gray-400">Promotions and newsletter</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.marketingEmails} 
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketingEmails: checked})}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="wellspring-button wellspring-button-primary">
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default NotificationsPage;
