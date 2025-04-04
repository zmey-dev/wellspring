
import React from "react";
import { 
  Search, Filter, Package, TruckIcon, ClockIcon, CheckCircle, FileText, ArrowRight 
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock order data
const orders = [
  {
    id: "ORD-2784",
    date: "April 1, 2025",
    total: "$89.00",
    status: "delivered",
    items: [
      { 
        id: 1, 
        name: "Premium Yoga Mat", 
        price: "$89.00", 
        quantity: 1, 
        image: "https://images.unsplash.com/photo-1593810450967-f9c42742e4e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
      }
    ],
    tracking: "1Z999AA10123456784",
    deliveredDate: "April 5, 2025"
  },
  {
    id: "ORD-2651",
    date: "March 22, 2025",
    total: "$134.98",
    status: "shipped",
    items: [
      { 
        id: 3, 
        name: "Plant Protein Complex", 
        price: "$59.99", 
        quantity: 1, 
        image: "https://images.unsplash.com/photo-1607707972895-7f994d8c2f3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
      },
      { 
        id: 6, 
        name: "Organic Essential Oil Set", 
        price: "$49.95", 
        quantity: 1, 
        image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
      },
      { 
        id: 7, 
        name: "Wellness Journal", 
        price: "$22.50", 
        quantity: 1, 
        image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
      }
    ],
    tracking: "1Z999AA10123456785",
    estimatedDelivery: "April 10, 2025"
  },
  {
    id: "ORD-2498",
    date: "February 15, 2025",
    total: "$24.99",
    status: "processing",
    items: [
      { 
        id: 1, 
        name: "Organic Wellness Tea Blend", 
        price: "$24.99", 
        quantity: 1, 
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
      }
    ]
  }
];

const getStatusIcon = (status) => {
  switch(status) {
    case 'processing':
      return <ClockIcon size={18} className="text-blue-400" />;
    case 'shipped':
      return <TruckIcon size={18} className="text-yellow-400" />;
    case 'delivered':
      return <CheckCircle size={18} className="text-green-400" />;
    default:
      return <Package size={18} className="text-gray-400" />;
  }
};

const getStatusBadge = (status) => {
  switch(status) {
    case 'processing':
      return <Badge className="bg-blue-500">Processing</Badge>;
    case 'shipped':
      return <Badge className="bg-yellow-500 text-black">Shipped</Badge>;
    case 'delivered':
      return <Badge className="bg-green-500">Delivered</Badge>;
    default:
      return <Badge className="bg-gray-500">Unknown</Badge>;
  }
};

const MyOrdersPage = () => {
  return (
    <>
      <Header />
      
      <main className="min-h-screen py-10 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search orders by ID or product..."
                className="pl-10 wellspring-input"
              />
            </div>
            <div className="flex gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] bg-wellspring-gray border-wellspring-gray">
                  <SelectValue placeholder="Order Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
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
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 bg-wellspring-darkgray">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="recent">Recent Orders</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="space-y-6">
                {orders.map((order) => (
                  <Card key={order.id} className="wellspring-card">
                    <CardHeader className="pb-2">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex gap-3 items-center">
                          <div className="bg-wellspring-darkgray p-2 rounded-full">
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                            <p className="text-sm text-gray-400">Placed on {order.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center mt-2 md:mt-0">
                          {getStatusBadge(order.status)}
                          <span className="font-bold">{order.total}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <Separator className="bg-wellspring-gray" />
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <div className="h-16 w-16 bg-wellspring-darkgray rounded-md overflow-hidden flex-shrink-0">
                              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <div className="flex gap-2 text-sm text-gray-400 mt-1">
                                <span>{item.price}</span>
                                <span>·</span>
                                <span>Qty: {item.quantity}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {order.status === 'shipped' && (
                        <div className="mt-4 p-3 bg-wellspring-darkgray rounded-md">
                          <div className="flex items-center">
                            <TruckIcon size={16} className="text-yellow-400 mr-2" />
                            <span className="text-sm">
                              Shipped - Estimated delivery by {order.estimatedDelivery}
                            </span>
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            Tracking: {order.tracking}
                          </div>
                        </div>
                      )}
                      
                      {order.status === 'delivered' && (
                        <div className="mt-4 p-3 bg-wellspring-darkgray rounded-md">
                          <div className="flex items-center">
                            <CheckCircle size={16} className="text-green-400 mr-2" />
                            <span className="text-sm">
                              Delivered on {order.deliveredDate}
                            </span>
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            Tracking: {order.tracking}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <div className="flex w-full justify-between">
                        <Button 
                          variant="outline" 
                          className="wellspring-button wellspring-button-outline"
                        >
                          <FileText size={16} className="mr-1" /> Invoice
                        </Button>
                        <Button 
                          className="wellspring-button wellspring-button-primary"
                          onClick={() => window.location.href = `/orders/${order.id}`}
                        >
                          Order Details
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recent">
              <div className="space-y-6">
                {orders.slice(0, 2).map((order) => (
                  <Card key={order.id} className="wellspring-card">
                    <CardHeader className="pb-2">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex gap-3 items-center">
                          <div className="bg-wellspring-darkgray p-2 rounded-full">
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                            <p className="text-sm text-gray-400">Placed on {order.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center mt-2 md:mt-0">
                          {getStatusBadge(order.status)}
                          <span className="font-bold">{order.total}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <div className="h-16 w-16 bg-wellspring-darkgray rounded-md overflow-hidden flex-shrink-0">
                              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <div className="flex gap-2 text-sm text-gray-400 mt-1">
                                <span>{item.price}</span>
                                <span>·</span>
                                <span>Qty: {item.quantity}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="processing">
              <div className="space-y-6">
                {orders.filter(order => order.status === 'processing').map((order) => (
                  <Card key={order.id} className="wellspring-card">
                    <CardHeader className="pb-2">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex gap-3 items-center">
                          <div className="bg-wellspring-darkgray p-2 rounded-full">
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                            <p className="text-sm text-gray-400">Placed on {order.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center mt-2 md:mt-0">
                          {getStatusBadge(order.status)}
                          <span className="font-bold">{order.total}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <div className="h-16 w-16 bg-wellspring-darkgray rounded-md overflow-hidden flex-shrink-0">
                              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <div className="flex gap-2 text-sm text-gray-400 mt-1">
                                <span>{item.price}</span>
                                <span>·</span>
                                <span>Qty: {item.quantity}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="shipped">
              <div className="space-y-6">
                {orders.filter(order => order.status === 'shipped').map((order) => (
                  <Card key={order.id} className="wellspring-card">
                    <CardHeader className="pb-2">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex gap-3 items-center">
                          <div className="bg-wellspring-darkgray p-2 rounded-full">
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                            <p className="text-sm text-gray-400">Placed on {order.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center mt-2 md:mt-0">
                          {getStatusBadge(order.status)}
                          <span className="font-bold">{order.total}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <div className="h-16 w-16 bg-wellspring-darkgray rounded-md overflow-hidden flex-shrink-0">
                              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <div className="flex gap-2 text-sm text-gray-400 mt-1">
                                <span>{item.price}</span>
                                <span>·</span>
                                <span>Qty: {item.quantity}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-wellspring-darkgray rounded-md">
                        <div className="flex items-center">
                          <TruckIcon size={16} className="text-yellow-400 mr-2" />
                          <span className="text-sm">
                            Shipped - Estimated delivery by {order.estimatedDelivery}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                          Tracking: {order.tracking}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="delivered">
              <div className="space-y-6">
                {orders.filter(order => order.status === 'delivered').map((order) => (
                  <Card key={order.id} className="wellspring-card">
                    <CardHeader className="pb-2">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex gap-3 items-center">
                          <div className="bg-wellspring-darkgray p-2 rounded-full">
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                            <p className="text-sm text-gray-400">Placed on {order.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center mt-2 md:mt-0">
                          {getStatusBadge(order.status)}
                          <span className="font-bold">{order.total}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <div className="h-16 w-16 bg-wellspring-darkgray rounded-md overflow-hidden flex-shrink-0">
                              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <div className="flex gap-2 text-sm text-gray-400 mt-1">
                                <span>{item.price}</span>
                                <span>·</span>
                                <span>Qty: {item.quantity}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-wellspring-darkgray rounded-md">
                        <div className="flex items-center">
                          <CheckCircle size={16} className="text-green-400 mr-2" />
                          <span className="text-sm">
                            Delivered on {order.deliveredDate}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                          Tracking: {order.tracking}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 bg-wellspring-darkgray rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Looking for more wellness products?</h3>
                <p className="text-gray-400">
                  Explore our curated marketplace of premium health and wellness items
                </p>
              </div>
              <Button 
                className="wellspring-button wellspring-button-primary"
                onClick={() => window.location.href = "/marketplace"}
              >
                Shop Now <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default MyOrdersPage;
