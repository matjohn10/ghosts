import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState, type FormEvent } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigate, useNavigate } from "react-router";
import Spin from "./spinner";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function AuthPage() {
  const { signIn } = useAuthActions();
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isAuth = useQuery(api.auth.isAuthenticated);
  if (isAuth) return <Navigate to="/map" />;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await signIn("password", formData);
    formData.forEach((k, v) => console.log("Auth:", k, v));
    setLoading(false);
    navigate("/map");
    // Here you would typically send a verification code to the email
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="flex-col w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Join Ghost Map</h1>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="h-12">
              GitHub
            </Button>

            <Button variant="outline" className="h-12">
              Google
            </Button>

            <Button variant="outline" className="h-12">
              Apple
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <TabsContent value="signin">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-lg font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
                <label htmlFor="email" className="block text-lg font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:cursor-pointer active:opacity-40 text-white"
              >
                {loading && <Spin />}
                Sign In
              </Button>

              <input name="flow" type="hidden" value="signIn" />
              <input name="email" type="hidden" value={email} />
              <input name="password" type="hidden" value={password} />
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-lg font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
                <label htmlFor="email" className="block text-lg font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:cursor-pointer active:opacity-40 text-white"
              >
                {loading && <Spin />}
                Sign Up
              </Button>

              <input name="flow" type="hidden" value="signUp" />
              <input name="email" type="hidden" value={email} />
              <input name="password" type="hidden" value={password} />
            </form>
          </TabsContent>
        </Tabs>
        <div className="flex w-full justify-center">
          <a href="/map" className="text-sm text-black/70 self-center">
            Skip
          </a>
        </div>
      </div>
    </div>
  );
}
