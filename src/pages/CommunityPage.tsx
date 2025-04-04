
import React, { useState } from "react";
import { Search, MessageSquare, Heart, Share2, Send, Calendar, Users, MessageCircle, ChevronRight, Filter } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock community posts data
const posts = [
  {
    id: 1,
    author: {
      name: "Emma Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      handle: "@emmaj"
    },
    content: "Just finished a 30-day meditation challenge and feeling amazing! Has anyone else tried consistent meditation practice? The mental clarity I'm experiencing is incredible. #Wellness #Meditation",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    likes: 42,
    comments: 8,
    shares: 5,
    date: "2025-04-02T14:30:00",
    tags: ["Meditation", "MentalHealth"]
  },
  {
    id: 2,
    author: {
      name: "Dr. Sarah Williams",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      handle: "@drsarahw"
    },
    content: "New research shows that incorporating just 15 minutes of morning stretching can significantly reduce stress levels throughout the day. I'll be hosting a free workshop next week to demonstrate some simple morning routines. Who's interested? #MorningRoutine #StressReduction",
    image: null,
    likes: 76,
    comments: 23,
    shares: 18,
    date: "2025-04-01T09:45:00",
    tags: ["Research", "Stress", "MorningRoutine"]
  },
  {
    id: 3,
    author: {
      name: "James Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      handle: "@jameschen"
    },
    content: "Tried this plant-based protein smoothie recipe this morning - absolutely delicious and kept me full until lunch! \n\n• 1 banana\n• 1 cup spinach\n• 1 tbsp almond butter\n• 1 scoop plant protein\n• 1 cup almond milk\n• 1/2 tsp cinnamon\n\nBlend and enjoy! #PlantBased #Nutrition",
    image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    likes: 54,
    comments: 12,
    shares: 7,
    date: "2025-03-31T08:15:00",
    tags: ["Recipes", "PlantBased", "Nutrition"]
  },
  {
    id: 4,
    author: {
      name: "Olivia Martinez",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      handle: "@oliviam"
    },
    content: "Just registered for the Wellspring Summer Health Summit! Who else is going? Would love to connect with fellow wellness enthusiasts there! #WellspringSummit #Networking",
    image: null,
    likes: 31,
    comments: 16,
    shares: 3,
    date: "2025-03-30T16:20:00",
    tags: ["Events", "Networking"]
  },
  {
    id: 5,
    author: {
      name: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      handle: "@davidw"
    },
    content: "Sleep quality over quantity! New study shows that 6 hours of uninterrupted deep sleep is more beneficial than 8+ hours of fragmented sleep. Here are my top tips for improving sleep quality:\n\n1. Consistent sleep schedule\n2. No screens 1 hour before bed\n3. Room temperature between 65-68°F\n4. White noise or sound machine\n5. Meditation before bedtime",
    image: "https://images.unsplash.com/photo-1518946222227-364f22132616?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    likes: 89,
    comments: 27,
    shares: 34,
    date: "2025-03-28T20:45:00",
    tags: ["Sleep", "Research", "Habits"]
  }
];

// Mock trending topics
const trendingTopics = [
  { name: "MentalHealthAwareness", posts: 1243 },
  { name: "WellspringSummit", posts: 865 },
  { name: "MorningRoutine", posts: 742 },
  { name: "PlantBasedNutrition", posts: 631 },
  { name: "MindfulMovement", posts: 529 }
];

// Mock groups
const groups = [
  { name: "Yoga Enthusiasts", members: 1250, image: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" },
  { name: "Plant-Based Living", members: 984, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" },
  { name: "Mindfulness Meditation", members: 763, image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" }
];

// Mock upcoming events
const upcomingEvents = [
  { name: "Wellness Summit 2025", date: "Apr 15, 2025", attendees: 354 },
  { name: "Mindful Movement Workshop", date: "Apr 22, 2025", attendees: 128 },
  { name: "Nutrition & Health Webinar", date: "May 5, 2025", attendees: 215 }
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
  
  if (diffHours < 1) {
    return "Just now";
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  
  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };
  
  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <>
      <Header />
      
      <main className="min-h-screen py-10 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-4">Community</h1>
          <p className="text-gray-400 mb-8">
            Connect with fellow wellness enthusiasts, share your journey, and stay inspired
          </p>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - For larger screens */}
            <div className="hidden lg:block lg:w-1/4 space-y-6">
              <Card className="wellspring-card">
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-bold">Trending Topics</h3>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-3">
                    {trendingTopics.map((topic, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Badge className="bg-wellspring-darkgray text-white hover:bg-wellspring-teal cursor-pointer">
                            #{topic.name}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-400">{topic.posts} posts</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="wellspring-card">
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-bold">Your Groups</h3>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-4">
                    {groups.map((group, i) => (
                      <div key={i} className="flex items-center justify-between cursor-pointer hover:bg-wellspring-darkgray p-2 rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-md overflow-hidden">
                            <img 
                              src={group.image} 
                              alt={group.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{group.name}</p>
                            <p className="text-xs text-gray-400">{group.members} members</p>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button 
                    variant="link" 
                    className="text-wellspring-teal w-full"
                  >
                    See all your groups
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="wellspring-card">
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-bold">Upcoming Events</h3>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-4">
                    {upcomingEvents.map((event, i) => (
                      <div key={i} className="flex items-center justify-between cursor-pointer hover:bg-wellspring-darkgray p-2 rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-wellspring-darkgray rounded-md flex items-center justify-center">
                            <Calendar size={16} className="text-wellspring-teal" />
                          </div>
                          <div>
                            <p className="font-medium">{event.name}</p>
                            <p className="text-xs text-gray-400">{event.date} • {event.attendees} attending</p>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button 
                    variant="link" 
                    className="text-wellspring-teal w-full"
                    onClick={() => window.location.href = "/events"}
                  >
                    Browse all events
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:w-2/4">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search posts, topics, or people..."
                    className="pl-10 wellspring-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-wellspring-gray bg-wellspring-gray md:w-auto"
                >
                  <Filter size={16} />
                  <span>Filter</span>
                </Button>
              </div>
              
              <Tabs defaultValue="feed" className="w-full">
                <TabsList className="bg-wellspring-darkgray mb-6">
                  <TabsTrigger value="feed">Feed</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                </TabsList>
                
                {/* New Post Card */}
                <Card className="wellspring-card mb-6">
                  <CardContent className="pt-6">
                    <div className="flex gap-3 mb-4">
                      <Avatar>
                        <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" alt="Emma Johnson" />
                        <AvatarFallback>EJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Input 
                          className="wellspring-input"
                          placeholder="Share something with the community..."
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        className="wellspring-button wellspring-button-primary"
                        disabled={newPostContent.trim() === ""}
                      >
                        Post <Send size={16} className="ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <TabsContent value="feed" className="mt-0">
                  <div className="space-y-6">
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map((post) => (
                        <Card key={post.id} className="wellspring-card">
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium">{post.author.name}</h3>
                                    <span className="text-gray-400 text-sm">{post.author.handle}</span>
                                  </div>
                                  <p className="text-xs text-gray-400">{formatDate(post.date)}</p>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <p className="whitespace-pre-line mb-3">{post.content}</p>
                            <div className="flex gap-1 mb-3">
                              {post.tags.map((tag, i) => (
                                <Badge key={i} className="bg-wellspring-darkgray text-white hover:bg-wellspring-teal cursor-pointer">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                            {post.image && (
                              <div className="rounded-md overflow-hidden mb-3">
                                <img 
                                  src={post.image} 
                                  alt="Post content" 
                                  className="w-full h-auto object-cover"
                                />
                              </div>
                            )}
                          </CardContent>
                          <CardFooter className="flex justify-between border-t border-wellspring-gray pt-3">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className={`flex items-center gap-1 ${likedPosts.includes(post.id) ? 'text-red-500' : 'text-gray-400'}`}
                              onClick={() => handleLike(post.id)}
                            >
                              <Heart size={16} fill={likedPosts.includes(post.id) ? "currentColor" : "none"} />
                              <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="flex items-center gap-1 text-gray-400"
                            >
                              <MessageSquare size={16} />
                              <span>{post.comments}</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="flex items-center gap-1 text-gray-400"
                            >
                              <Share2 size={16} />
                              <span>{post.shares}</span>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <MessageCircle size={48} className="mx-auto mb-4 text-gray-500" />
                        <h3 className="text-lg font-medium mb-1">No posts found</h3>
                        <p className="text-sm text-gray-400">
                          Try adjusting your search or filters
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="popular" className="mt-0">
                  <div className="text-center py-12">
                    <MessageCircle size={48} className="mx-auto mb-4 text-gray-500" />
                    <h3 className="text-lg font-medium mb-1">Popular posts coming soon</h3>
                    <p className="text-sm text-gray-400">
                      We're still gathering data to show you the most popular posts
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="following" className="mt-0">
                  <div className="text-center py-12">
                    <Users size={48} className="mx-auto mb-4 text-gray-500" />
                    <h3 className="text-lg font-medium mb-1">Follow more people</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Start following wellness experts and enthusiasts to see their posts here
                    </p>
                    <Button className="wellspring-button wellspring-button-primary">
                      Find people to follow
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right Sidebar - For larger screens */}
            <div className="hidden lg:block lg:w-1/4 space-y-6">
              <Card className="wellspring-card">
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-bold">Suggested Connections</h3>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" alt="Michael Roberts" />
                          <AvatarFallback>MR</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Michael Roberts</p>
                          <p className="text-xs text-gray-400">Fitness Coach</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="wellspring-button wellspring-button-outline">
                        Follow
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" alt="Julie Thompson" />
                          <AvatarFallback>JT</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Julie Thompson</p>
                          <p className="text-xs text-gray-400">Nutritionist</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="wellspring-button wellspring-button-outline">
                        Follow
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" alt="Robert Chen" />
                          <AvatarFallback>RC</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Robert Chen</p>
                          <p className="text-xs text-gray-400">Wellness Coach</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="wellspring-button wellspring-button-outline">
                        Follow
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button 
                    variant="link" 
                    className="text-wellspring-teal w-full"
                  >
                    See more suggestions
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="wellspring-card">
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-bold">Community Guidelines</h3>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-2 text-sm">
                    <p>• Be respectful and supportive of others</p>
                    <p>• Share evidence-based wellness information</p>
                    <p>• No promotion of dangerous health practices</p>
                    <p>• Respect privacy and confidentiality</p>
                    <p>• No spam or excessive self-promotion</p>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button 
                    variant="link" 
                    className="text-wellspring-teal w-full"
                  >
                    Read full guidelines
                  </Button>
                </CardFooter>
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
