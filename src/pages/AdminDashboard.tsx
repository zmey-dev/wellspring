
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  ShoppingBag, 
  Users, 
  Settings, 
  BarChart3, 
  Layers, 
  PlusCircle,
  Search,
  ChevronDown,
  AlertCircle
} from "lucide-react";
import Header from "../components/layout/Header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for the admin dashboard
const recentOrders = [
  { id: "ORD-7891", customer: "Sarah Johnson", date: "2025-04-03", amount: "$129.99", status: "completed" },
  { id: "ORD-7890", customer: "Michael Brown", date: "2025-04-03", amount: "$75.00", status: "processing" },
  { id: "ORD-7889", customer: "Jessica Williams", date: "2025-04-02", amount: "$24.99", status: "completed" },
  { id: "ORD-7888", customer: "Daniel Smith", date: "2025-04-02", amount: "$59.99", status: "completed" },
  { id: "ORD-7887", customer: "Emily Davis", date: "2025-04-01", amount: "$89.00", status: "failed" },
];

const upcomingEvents = [
  { id: "EVT-201", name: "Global Health Summit", date: "2025-04-15", attendees: 245, status: "upcoming" },
  { id: "EVT-202", name: "Wellness Workshop Series", date: "2025-05-05", attendees: 78, status: "upcoming" },
  { id: "EVT-203", name: "Nutrition & Fitness Expo", date: "2025-06-12", attendees: 156, status: "upcoming" },
  { id: "EVT-204", name: "Meditation Retreat Weekend", date: "2025-07-08", attendees: 32, status: "draft" },
];

const summaryCards = [
  { 
    title: "Total Revenue", 
    value: "$12,456", 
    change: "+12.5%", 
    changeType: "positive", 
    description: "vs. previous month" 
  },
  { 
    title: "Active Members", 
    value: "1,245", 
    change: "+3.2%", 
    changeType: "positive", 
    description: "vs. previous month" 
  },
  { 
    title: "Event Registrations", 
    value: "845", 
    change: "-2.4%", 
    changeType: "negative", 
    description: "vs. previous month" 
  },
  { 
    title: "Average Order Value", 
    value: "$86.50", 
    change: "+5.7%", 
    changeType: "positive", 
    description: "vs. previous month" 
  },
];

const productPerformance = [
  { name: "Premium Yoga Mat", sales: 54, revenue: "$4,806", growth: "+12%" },
  { name: "Organic Wellness Tea", sales: 89, revenue: "$2,224", growth: "+8%" },
  { name: "Plant Protein Complex", sales: 42, revenue: "$2,520", growth: "+15%" },
  { name: "Meditation Cushion Set", sales: 36, revenue: "$2,700", growth: "-3%" },
  { name: "Digital Wellness Tracker", sales: 28, revenue: "$3,640", growth: "+24%" },
];

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState<string>("overview");

  const renderSectionContent = () => {
    switch (selectedSection) {
      case "overview":
        return (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {summaryCards.map((card, index) => (
                <Card key={index} className="wellspring-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className="text-xs flex items-center mt-1">
                      <span className={`mr-1 ${card.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                        {card.change}
                      </span>
                      <span className="text-gray-400">{card.description}</span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Recent Orders */}
              <Card className="wellspring-card">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Recent Orders</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/admin/orders">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.amount}</TableCell>
                            <TableCell>
                              <Badge 
                                className={`
                                  ${order.status === 'completed' ? 'bg-green-700 hover:bg-green-600' : 
                                    order.status === 'processing' ? 'bg-blue-700 hover:bg-blue-600' : 
                                    'bg-red-700 hover:bg-red-600'}
                                `}
                              >
                                {order.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className="wellspring-card">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Upcoming Events</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/admin/events">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Attendees</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {upcomingEvents.map((event) => (
                          <TableRow key={event.id}>
                            <TableCell className="font-medium">{event.name}</TableCell>
                            <TableCell>{event.date}</TableCell>
                            <TableCell>{event.attendees}</TableCell>
                            <TableCell>
                              <Badge 
                                className={`
                                  ${event.status === 'upcoming' ? 'bg-wellspring-teal text-black hover:bg-opacity-90' : 
                                    'bg-gray-600 hover:bg-gray-500'}
                                `}
                              >
                                {event.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Product Performance */}
            <Card className="wellspring-card mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Product Performance</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/admin/products">View All Products</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Sales</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                        <TableHead className="text-right">Growth</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productPerformance.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell className="text-right">{product.sales}</TableCell>
                          <TableCell className="text-right">{product.revenue}</TableCell>
                          <TableCell className="text-right">
                            <span 
                              className={product.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}
                            >
                              {product.growth}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </>
        );
      
      case "events":
        return (
          <div className="space-y-6">
            <div className="flex justify-between">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search events..." className="pl-10 wellspring-input" />
              </div>
              <Button className="wellspring-button wellspring-button-primary">
                <PlusCircle size={16} className="mr-2" />
                Create Event
              </Button>
            </div>
            
            <Tabs defaultValue="upcoming">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="pt-4">
                <Card className="wellspring-card">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event Name</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Attendees</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Global Health Summit</TableCell>
                          <TableCell>Apr 15-17, 2025</TableCell>
                          <TableCell>San Francisco, CA</TableCell>
                          <TableCell>245 / 500</TableCell>
                          <TableCell>
                            <Badge className="bg-wellspring-teal text-black hover:bg-opacity-90">
                              Published
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Actions <ChevronDown size={14} className="ml-1" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Event</DropdownMenuItem>
                                <DropdownMenuItem>Manage Attendees</DropdownMenuItem>
                                <DropdownMenuItem>Cancel Event</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Wellness Workshop Series</TableCell>
                          <TableCell>May 5, 2025</TableCell>
                          <TableCell>Online Event</TableCell>
                          <TableCell>78 / 150</TableCell>
                          <TableCell>
                            <Badge className="bg-wellspring-teal text-black hover:bg-opacity-90">
                              Published
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Actions <ChevronDown size={14} className="ml-1" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Event</DropdownMenuItem>
                                <DropdownMenuItem>Manage Attendees</DropdownMenuItem>
                                <DropdownMenuItem>Cancel Event</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Nutrition & Fitness Expo</TableCell>
                          <TableCell>Jun 12-14, 2025</TableCell>
                          <TableCell>Chicago, IL</TableCell>
                          <TableCell>156 / 1000</TableCell>
                          <TableCell>
                            <Badge className="bg-wellspring-teal text-black hover:bg-opacity-90">
                              Published
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Actions <ChevronDown size={14} className="ml-1" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Event</DropdownMenuItem>
                                <DropdownMenuItem>Manage Attendees</DropdownMenuItem>
                                <DropdownMenuItem>Cancel Event</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="past" className="pt-4">
                <Card className="wellspring-card">
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-400">Past events will appear here</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="drafts" className="pt-4">
                <Card className="wellspring-card">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event Name</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Meditation Retreat Weekend</TableCell>
                          <TableCell>Jul 8-10, 2025</TableCell>
                          <TableCell>Colorado</TableCell>
                          <TableCell>
                            <Badge className="bg-gray-600 hover:bg-gray-500">
                              Draft
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Actions <ChevronDown size={14} className="ml-1" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Event</DropdownMenuItem>
                                <DropdownMenuItem>Publish</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );
      
      case "marketplace":
        return (
          <div className="space-y-6">
            <div className="flex justify-between">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search products..." className="pl-10 wellspring-input" />
              </div>
              <Button className="wellspring-button wellspring-button-primary">
                <PlusCircle size={16} className="mr-2" />
                Add Product
              </Button>
            </div>
            
            <Card className="wellspring-card">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Premium Yoga Mat</TableCell>
                      <TableCell>$89.00</TableCell>
                      <TableCell>Fitness</TableCell>
                      <TableCell>85</TableCell>
                      <TableCell>
                        <Badge className="bg-green-700 hover:bg-green-600">
                          In Stock
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions <ChevronDown size={14} className="ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Product</DropdownMenuItem>
                            <DropdownMenuItem>Manage Inventory</DropdownMenuItem>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Organic Wellness Tea</TableCell>
                      <TableCell>$24.99</TableCell>
                      <TableCell>Nutrition</TableCell>
                      <TableCell>124</TableCell>
                      <TableCell>
                        <Badge className="bg-green-700 hover:bg-green-600">
                          In Stock
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions <ChevronDown size={14} className="ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Product</DropdownMenuItem>
                            <DropdownMenuItem>Manage Inventory</DropdownMenuItem>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Plant Protein Complex</TableCell>
                      <TableCell>$59.99</TableCell>
                      <TableCell>Nutrition</TableCell>
                      <TableCell>32</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-700 hover:bg-yellow-600">
                          Low Stock
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions <ChevronDown size={14} className="ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Product</DropdownMenuItem>
                            <DropdownMenuItem>Manage Inventory</DropdownMenuItem>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Digital Wellness Tracker</TableCell>
                      <TableCell>$129.99</TableCell>
                      <TableCell>Technology</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>
                        <Badge className="bg-red-700 hover:bg-red-600">
                          Out of Stock
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions <ChevronDown size={14} className="ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Product</DropdownMenuItem>
                            <DropdownMenuItem>Manage Inventory</DropdownMenuItem>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-wellspring-gray p-4">
                <div className="text-sm text-gray-400">Showing 4 of 24 products</div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="bg-wellspring-gray">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        );
      
      case "users":
        return (
          <div className="space-y-6">
            <div className="flex justify-between">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search users..." className="pl-10 wellspring-input" />
              </div>
              <Button className="wellspring-button wellspring-button-primary">
                <PlusCircle size={16} className="mr-2" />
                Add User
              </Button>
            </div>
            
            <Card className="wellspring-card">
              <CardContent className="p-6 text-center">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">User Management Coming Soon</h3>
                <p className="text-gray-400 mb-4">This section is under development and will be available soon.</p>
              </CardContent>
            </Card>
          </div>
        );
      
      case "analytics":
        return (
          <div className="space-y-6">
            <Card className="wellspring-card">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Analytics Dashboard Coming Soon</h3>
                <p className="text-gray-400 mb-4">Advanced analytics and reporting features are under development.</p>
              </CardContent>
            </Card>
          </div>
        );
      
      case "settings":
        return (
          <div className="space-y-6">
            <Card className="wellspring-card">
              <CardContent className="p-6 text-center">
                <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Settings Coming Soon</h3>
                <p className="text-gray-400 mb-4">System settings and configurations will be available here.</p>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="md:w-1/5 bg-wellspring-darkgray rounded-lg p-4">
              <h2 className="font-semibold text-lg mb-4 px-2">Admin Dashboard</h2>
              
              <nav>
                <ul className="space-y-1">
                  <li>
                    <button
                      className={`w-full flex items-center space-x-2 p-2 rounded-md transition-colors ${
                        selectedSection === "overview"
                          ? "bg-wellspring-teal text-black font-medium"
                          : "hover:bg-wellspring-gray"
                      }`}
                      onClick={() => setSelectedSection("overview")}
                    >
                      <BarChart3 size={18} />
                      <span>Overview</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center space-x-2 p-2 rounded-md transition-colors ${
                        selectedSection === "events"
                          ? "bg-wellspring-teal text-black font-medium"
                          : "hover:bg-wellspring-gray"
                      }`}
                      onClick={() => setSelectedSection("events")}
                    >
                      <Calendar size={18} />
                      <span>Events</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center space-x-2 p-2 rounded-md transition-colors ${
                        selectedSection === "marketplace"
                          ? "bg-wellspring-teal text-black font-medium"
                          : "hover:bg-wellspring-gray"
                      }`}
                      onClick={() => setSelectedSection("marketplace")}
                    >
                      <ShoppingBag size={18} />
                      <span>Marketplace</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center space-x-2 p-2 rounded-md transition-colors ${
                        selectedSection === "users"
                          ? "bg-wellspring-teal text-black font-medium"
                          : "hover:bg-wellspring-gray"
                      }`}
                      onClick={() => setSelectedSection("users")}
                    >
                      <Users size={18} />
                      <span>Users</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center space-x-2 p-2 rounded-md transition-colors ${
                        selectedSection === "analytics"
                          ? "bg-wellspring-teal text-black font-medium"
                          : "hover:bg-wellspring-gray"
                      }`}
                      onClick={() => setSelectedSection("analytics")}
                    >
                      <Layers size={18} />
                      <span>Analytics</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center space-x-2 p-2 rounded-md transition-colors ${
                        selectedSection === "settings"
                          ? "bg-wellspring-teal text-black font-medium"
                          : "hover:bg-wellspring-gray"
                      }`}
                      onClick={() => setSelectedSection("settings")}
                    >
                      <Settings size={18} />
                      <span>Settings</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            
            {/* Main Content */}
            <div className="md:w-4/5">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">
                  {selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}
                </h1>
                <p className="text-gray-400">
                  {selectedSection === "overview" 
                    ? "Welcome to your admin dashboard" 
                    : `Manage your ${selectedSection}`}
                </p>
              </div>
              
              {renderSectionContent()}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
