import React, { useState } from "react";
import { 
  Search, MessageCircle, ThumbsUp, Calendar, UserPlus, Bell, Filter, Users, Clock
} from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

// Sample community posts data
const communityPosts = [
  {
    id: 1,
    author: {
      name: "Jessica Miller",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      badge: "Wellness Coach"
    },
    content: "Just finished my 30-day plant-based challenge and I've never felt better! My energy levels are through the roof and my skin is glowing. Has anyone else tried this and experienced similar results?",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    likes: 47,
    comments: 12,
    timestamp: "2 hours ago",
    tags: ["nutrition", "plant-based", "wellness"]
  },
  {
    id: 2,
    author: {
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      badge: "Fitness Expert"
    },
    content: "Here's my quick 15-minute morning workout routine that has transformed my productivity throughout the day. No equipment needed, just consistency!",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    likes: 98,
    comments: 31,
    timestamp: "5 hours ago",
    tags: ["fitness", "workout", "morning-routine"]
  },
  {
    id: 3,
    author: {
      name: "Sophia Williams",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      badge: "Meditation Teacher"
    },
    content: "I've been practicing this breathing technique for stress relief and wanted to share it with our community. It's helped me through some challenging moments.",
    likes: 73,
    comments: 24,
    timestamp: "1 day ago",
    tags: ["meditation", "stress-relief", "mindfulness"]
  }
];

// Sample wellness groups data
const wellnessGroups = [
  {
    id: 1,
    name: "Plant-Based Nutrition",
    members: 1842,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    description: "Sharing recipes, tips, and research about plant-based diets and nutrition."
  },
  {
    id: 2,
    name: "Mindful Movement",
    members: 956,
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    description: "A community focused on yoga, pilates, and intentional exercise practices."
  },
  {
    id: 3,
    name: "Mental Health Support",
    members: 2103,
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    description: "A safe space to discuss mental health challenges, strategies, and support."
  },
  {
    id: 4,
    name: "Sleep Optimization",
    members: 735,
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    description: "Discussing techniques and habits for better sleep quality."
  }
];

// Sample upcoming events data
const upcomingEvents = [
  {
    id: 1,
    title: "Virtual Meditation Retreat",
    date: "May 21, 2025",
    time: "9:00 AM - 12:00 PM",
    image: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: 2,
    title: "Plant-Based Cooking Workshop",
    date: "May 28, 2025",
    time: "6:00 PM - 8:00 PM",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  }
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

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState("feed");
  
  return (
    <>
      <Header />
      
      <main className="min-h-screen py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            {/* Main Content Area */}
            <div className="md:w-3/4 w-full">
              <h1 className="text-3xl font-bold mb-6">Wellspring Community</h1>
              
              <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search the community..."
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
                <Button className="wellspring-button wellspring-button-primary">
                  Create Post
                </Button>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="bg-wellspring-darkgray">
                  <TabsTrigger value="feed">Feed</TabsTrigger>
                  <TabsTrigger value="groups">Groups</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>
                
                <TabsContent value="feed" className="pt-4">
                  <div className="space-y-6">
                    {communityPosts.map(post => (
                      <Card key={post.id} className="wellspring-card">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                              <Avatar>
                                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-semibold">{post.author.name}</div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs font-normal">{post.author.badge}</Badge>
                                  <span className="text-xs text-gray-400">{formatTimeAgo(post.timestamp)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-4">{post.content}</p>
                          
                          {post.image && (
                            <div className="mb-4 rounded-md overflow-hidden">
                              <img 
                                src={post.image} 
                                alt="Post content" 
                                className="w-full h-auto object-cover"
                              />
                            </div>
                          )}
                          
                          {post.tags && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              {post.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                        <CardFooter>
                          <div className="flex items-center gap-4">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              <ThumbsUp size={16} />
                              <span>{post.likes}</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              <MessageCircle size={16} />
                              <span>{post.comments}</span>
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="groups" className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wellnessGroups.map(group => (
                      <Card key={group.id} className="wellspring-card overflow-hidden">
                        <div className="flex">
                          <div className="w-1/3">
                            <img 
                              src={group.image} 
                              alt={group.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-2/3 p-4">
                            <CardTitle className="text-lg mb-2">{group.name}</CardTitle>
                            <CardDescription className="mb-3">{group.description}</CardDescription>
                            <div className="flex items-center text-sm text-gray-400 mb-4">
                              <Users size={14} className="mr-1" />
                              {group.members} members
                            </div>
                            <Button className="wellspring-button wellspring-button-primary">
                              Join Group
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="events" className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingEvents.map(event => (
                      <Card key={event.id} className="wellspring-card overflow-hidden">
                        <div className="flex">
                          <div className="w-1/3">
                            <img 
                              src={event.image} 
                              alt={event.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-2/3 p-4">
                            <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
                            <div className="flex items-center text-sm text-wellspring-teal mb-2">
                              <Calendar size={14} className="mr-1" />
                              {event.date}
                            </div>
                            <div className="flex items-center text-sm text-gray-400 mb-4">
                              <Clock size={14} className="mr-1" />
                              {event.time}
                            </div>
                            <Button className="wellspring-button wellspring-button-primary">
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div className="md:w-1/4 w-full space-y-6">
              {/* Community Stats */}
              <Card className="wellspring-card">
                <CardHeader>
                  <CardTitle className="text-lg">Community Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="font-bold text-2xl">8,750+</div>
                      <div className="text-sm text-gray-400">Community Members</div>
                    </div>
                    <div>
                      <div className="font-bold text-2xl">24</div>
                      <div className="text-sm text-gray-400">Active Groups</div>
                    </div>
                    <div>
                      <div className="font-bold text-2xl">120+</div>
                      <div className="text-sm text-gray-400">Posts This Week</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Suggested Connections */}
              <Card className="wellspring-card">
                <CardHeader>
                  <CardTitle className="text-lg">Suggested Connections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" alt="Michael Taylor" />
                          <AvatarFallback>MT</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">Michael Taylor</div>
                          <div className="text-xs text-gray-400">Fitness Coach</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <UserPlus size={14} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" alt="Emma Rodriguez" />
                          <AvatarFallback>ER</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">Emma Rodriguez</div>
                          <div className="text-xs text-gray-400">Nutritionist</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <UserPlus size={14} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" alt="James Wilson" />
                          <AvatarFallback>JW</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">James Wilson</div>
                          <div className="text-xs text-gray-400">Wellness Writer</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <UserPlus size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Upcoming Events */}
              <Card className="wellspring-card">
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="flex gap-4">
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold">{event.title}</div>
                          <div className="text-xs text-wellspring-teal mb-1">{event.date}</div>
                          <Button variant="link" className="p-0 h-auto text-xs text-wellspring-teal">
                            Learn More
                          </Button>
                        </div>
                      </div>
                    ))}
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

export default CommunityPage;
