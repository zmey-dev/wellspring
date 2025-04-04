import React, { useState } from "react";
import { 
  User, Lock, Bell, CreditCard, Smartphone, Globe, Shield, HelpCircle, Save, Wallet 
} from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Wellness enthusiast and yoga instructor passionate about holistic health and mindfulness practices.",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  });
  
  const [notifications, setNotifications] = useState({
    emailMarketing: true,
    emailOrders: true,
    emailEvents: true,
    pushNotifications: false,
    eventReminders: true,
    orderUpdates: true,
    newProducts: false,
    promotions: true
  });

  const paymentMethods = [
    {
      id: "pm-1",
      type: "visa",
      last4: "4242",
      expiry: "09/2026",
      isDefault: true
    },
    {
      id: "pm-2",
      type: "mastercard",
      last4: "8888",
      expiry: "03/2025",
      isDefault: false
    }
  ];

  const handleProfileSave = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleNotificationSave = () => {
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved.",
    });
  };

  const handleSecuritySave = () => {
    toast({
      title: "Security settings updated",
      description: "Your security preferences have been saved.",
    });
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen py-10 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <Tabs 
                defaultValue="profile" 
                orientation="vertical" 
                className="w-full wellspring-card overflow-hidden"
              >
                <TabsList className="flex flex-col h-auto bg-wellspring-darkgray rounded-none items-stretch p-0">
                  <TabsTrigger 
                    value="profile" 
                    className="flex items-center gap-3 p-4 justify-start rounded-none border-l-2 border-transparent data-[state=active]:border-wellspring-teal"
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className="flex items-center gap-3 p-4 justify-start rounded-none border-l-2 border-transparent data-[state=active]:border-wellspring-teal"
                  >
                    <Lock size={18} />
                    <span>Security</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="flex items-center gap-3 p-4 justify-start rounded-none border-l-2 border-transparent data-[state=active]:border-wellspring-teal"
                  >
                    <Bell size={18} />
                    <span>Notifications</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="payment" 
                    className="flex items-center gap-3 p-4 justify-start rounded-none border-l-2 border-transparent data-[state=active]:border-wellspring-teal"
                  >
                    <CreditCard size={18} />
                    <span>Payment Methods</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="preferences" 
                    className="flex items-center gap-3 p-4 justify-start rounded-none border-l-2 border-transparent data-[state=active]:border-wellspring-teal"
                  >
                    <Globe size={18} />
                    <span>Preferences</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="md:w-3/4">
              <Tabs defaultValue="profile" className="w-full">
                <TabsContent value="profile" className="mt-0">
                  <Card className="wellspring-card">
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your account information and public profile
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={userData.avatar} />
                          <AvatarFallback>EJ</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-400">
                            Upload a new profile picture
                          </p>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              className="wellspring-button wellspring-button-outline"
                            >
                              Change Avatar
                            </Button>
                            <Button 
                              variant="outline" 
                              className="wellspring-button wellspring-button-outline"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            type="text" 
                            className="wellspring-input" 
                            value={userData.name} 
                            onChange={(e) => setUserData({...userData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            className="wellspring-input" 
                            value={userData.email} 
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            type="tel" 
                            className="wellspring-input" 
                            value={userData.phone} 
                            onChange={(e) => setUserData({...userData, phone: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input 
                            id="location" 
                            type="text" 
                            className="wellspring-input" 
                            value={userData.location} 
                            onChange={(e) => setUserData({...userData, location: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio" 
                          className="wellspring-input min-h-[100px]" 
                          value={userData.bio}
                          onChange={(e) => setUserData({...userData, bio: e.target.value})}
                        />
                        <p className="text-xs text-gray-400">
                          Brief description for your profile. URLs are hyperlinked.
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button 
                        className="wellspring-button wellspring-button-primary"
                        onClick={handleProfileSave}
                      >
                        <Save size={16} className="mr-2" /> Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security" className="mt-0">
                  <Card className="wellspring-card mb-6">
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>
                        Update your password to ensure your account remains secure
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input 
                          id="current-password" 
                          type="password" 
                          className="wellspring-input" 
                          placeholder="Enter your current password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                          id="new-password" 
                          type="password" 
                          className="wellspring-input" 
                          placeholder="Enter new password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input 
                          id="confirm-password" 
                          type="password" 
                          className="wellspring-input" 
                          placeholder="Confirm new password"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" className="wellspring-button wellspring-button-outline">
                        Forgot Password?
                      </Button>
                      <Button className="wellspring-button wellspring-button-primary">
                        Update Password
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="wellspring-card">
                    <CardHeader>
                      <CardTitle>Two-Factor Authentication</CardTitle>
                      <CardDescription>
                        Add an extra layer of security to your account
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Text Message Authentication</Label>
                          <p className="text-sm text-gray-400">
                            Use your phone number for two-factor authentication
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Authenticator App</Label>
                          <p className="text-sm text-gray-400">
                            Use an authenticator app for two-factor authentication
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Backup Recovery Codes</Label>
                          <p className="text-sm text-gray-400">
                            Generate recovery codes to use when you don't have access to your device
                          </p>
                        </div>
                        <Button variant="outline" className="wellspring-button wellspring-button-outline">
                          Generate Codes
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="wellspring-button wellspring-button-primary"
                        onClick={handleSecuritySave}
                      >
                        <Shield size={16} className="mr-2" /> Save Security Settings
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-0">
                  <Card className="wellspring-card mb-6">
                    <CardHeader>
                      <CardTitle>Email Notifications</CardTitle>
                      <CardDescription>
                        Manage the emails you want to receive
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="email-marketing" 
                          checked={notifications.emailMarketing}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, emailMarketing: checked as boolean})
                          }
                        />
                        <Label htmlFor="email-marketing">
                          Marketing emails and newsletters
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="email-orders" 
                          checked={notifications.emailOrders}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, emailOrders: checked as boolean})
                          }
                        />
                        <Label htmlFor="email-orders">Order confirmations and updates</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="email-events" 
                          checked={notifications.emailEvents}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, emailEvents: checked as boolean})
                          }
                        />
                        <Label htmlFor="email-events">Event updates and reminders</Label>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="wellspring-card">
                    <CardHeader>
                      <CardTitle>Push Notifications</CardTitle>
                      <CardDescription>
                        Control the notifications you see on your device
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-all">Enable Push Notifications</Label>
                        <Switch 
                          id="push-all"
                          checked={notifications.pushNotifications}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, pushNotifications: checked})
                          }
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="event-reminders"
                          checked={notifications.eventReminders}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, eventReminders: checked as boolean})
                          }
                        />
                        <Label htmlFor="event-reminders">Event reminders</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="order-updates"
                          checked={notifications.orderUpdates}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, orderUpdates: checked as boolean})
                          }
                        />
                        <Label htmlFor="order-updates">Order status updates</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="new-products"
                          checked={notifications.newProducts}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, newProducts: checked as boolean})
                          }
                        />
                        <Label htmlFor="new-products">New product launches</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="promotions"
                          checked={notifications.promotions}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, promotions: checked as boolean})
                          }
                        />
                        <Label htmlFor="promotions">Special offers and promotions</Label>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="wellspring-button wellspring-button-primary"
                        onClick={handleNotificationSave}
                      >
                        <Bell size={16} className="mr-2" /> Save Notification Preferences
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="payment" className="mt-0">
                  <Card className="wellspring-card mb-6">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>
                          Manage your saved payment methods
                        </CardDescription>
                      </div>
                      <Button className="wellspring-button wellspring-button-primary">
                        Add Payment Method
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {paymentMethods.map((method) => (
                        <div 
                          key={method.id} 
                          className="flex items-center justify-between mb-4 p-4 border border-wellspring-gray rounded-md"
                        >
                          <div className="flex items-center gap-4">
                            <div className="bg-wellspring-gray p-2 rounded-md">
                              <CreditCard size={24} className="text-wellspring-teal" />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {method.type === 'visa' ? 'Visa' : 'Mastercard'} •••• {method.last4}
                              </h3>
                              <p className="text-sm text-gray-400">Expires {method.expiry}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {method.isDefault && (
                              <Badge className="bg-wellspring-teal">Default</Badge>
                            )}
                            <Button variant="outline" size="sm" className="wellspring-button wellspring-button-outline">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="wellspring-button wellspring-button-outline">
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  
                  <Card className="wellspring-card">
                    <CardHeader>
                      <CardTitle>Billing Address</CardTitle>
                      <CardDescription>
                        Manage your billing information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="billing-name">Full Name</Label>
                          <Input 
                            id="billing-name" 
                            className="wellspring-input" 
                            defaultValue="Emma Johnson"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing-address1">Address Line 1</Label>
                          <Input 
                            id="billing-address1" 
                            className="wellspring-input" 
                            defaultValue="123 Wellness Way"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing-address2">Address Line 2 (Optional)</Label>
                          <Input 
                            id="billing-address2" 
                            className="wellspring-input" 
                            defaultValue="Apt 4B"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing-city">City</Label>
                          <Input 
                            id="billing-city" 
                            className="wellspring-input" 
                            defaultValue="San Francisco"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing-state">State</Label>
                          <Input 
                            id="billing-state" 
                            className="wellspring-input" 
                            defaultValue="CA"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing-zip">ZIP Code</Label>
                          <Input 
                            id="billing-zip" 
                            className="wellspring-input" 
                            defaultValue="94107"
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button className="wellspring-button wellspring-button-primary">
                        <Save size={16} className="mr-2" /> Save Address
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="preferences" className="mt-0">
                  <Card className="wellspring-card mb-6">
                    <CardHeader>
                      <CardTitle>App Preferences</CardTitle>
                      <CardDescription>
                        Customize your app experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="dark-mode">Dark Mode</Label>
                          <p className="text-sm text-gray-400">
                            Always use dark theme
                          </p>
                        </div>
                        <Switch id="dark-mode" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sound">Sound Effects</Label>
                          <p className="text-sm text-gray-400">
                            Play sound for notifications and actions
                          </p>
                        </div>
                        <Switch id="sound" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="newsletter">Browser Notifications</Label>
                          <p className="text-sm text-gray-400">
                            Allow notifications in your browser
                          </p>
                        </div>
                        <Switch id="newsletter" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="wellspring-card">
                    <CardHeader>
                      <CardTitle>Data & Privacy</CardTitle>
                      <CardDescription>
                        Manage your data and privacy settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="data-analytics" defaultChecked />
                        <Label htmlFor="data-analytics">
                          Share analytics data to help improve our services
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="personalization" defaultChecked />
                        <Label htmlFor="personalization">
                          Allow personalization based on your activity
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="third-party" />
                        <Label htmlFor="third-party">
                          Allow data sharing with trusted third parties
                        </Label>
                      </div>
                      
                      <div className="pt-2">
                        <Button 
                          variant="outline" 
                          className="wellspring-button wellspring-button-outline"
                        >
                          <HelpCircle size={16} className="mr-2" />
                          Privacy Policy
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button className="wellspring-button wellspring-button-primary">
                        Save Preferences
                      </Button>
                    </CardFooter>
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

export default SettingsPage;
