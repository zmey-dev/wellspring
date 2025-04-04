
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

type AuthFormProps = {
  onSuccess?: () => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, type: 'login' | 'register') => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication - replace with real auth in production
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: type === 'login' ? "Logged in successfully" : "Account created successfully",
        description: "Welcome to the Wellspring platform!",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-wellspring-darkgray">
      <CardHeader>
        <CardTitle className="text-center text-wellspring-teal">Wellspring</CardTitle>
        <CardDescription className="text-center">
          Your gateway to wellness events and premium products
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={(e) => handleSubmit(e, 'login')}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input 
                    id="email-login" 
                    placeholder="your@email.com" 
                    type="email" 
                    required 
                    className="wellspring-input"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-login">Password</Label>
                    <a 
                      href="#" 
                      className="text-xs text-wellspring-teal hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input 
                    id="password-login" 
                    type="password" 
                    required 
                    className="wellspring-input"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full wellspring-button wellspring-button-primary" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={(e) => handleSubmit(e, 'register')}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input 
                      id="first-name" 
                      placeholder="John" 
                      required 
                      className="wellspring-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input 
                      id="last-name" 
                      placeholder="Doe" 
                      required 
                      className="wellspring-input"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-register">Email</Label>
                  <Input 
                    id="email-register" 
                    placeholder="your@email.com" 
                    type="email" 
                    required 
                    className="wellspring-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-register">Password</Label>
                  <Input 
                    id="password-register" 
                    type="password" 
                    required 
                    className="wellspring-input"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full wellspring-button wellspring-button-primary" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="justify-center flex-col space-y-2">
        <div className="text-xs text-center text-gray-400">
          By signing up, you agree to our
          <a href="#" className="mx-1 text-wellspring-teal hover:underline">Terms of Service</a>
          and
          <a href="#" className="ml-1 text-wellspring-teal hover:underline">Privacy Policy</a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
