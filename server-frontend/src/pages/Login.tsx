import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Salesperson",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for cookies
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful - redirect based on role
        const mockRoutes = {
          "Salesperson": "/sales-dashboard/salesperson",
          "Sales Admin": "/sales-dashboard/manager",
          "Super Admin": "/superAdmin-dashboard",
          "Referral Partner": "/referral-dashboard",
          "Support Partner": "/support-dashboard",
        };

        const route = mockRoutes[formData.role as keyof typeof mockRoutes];
        navigate(route);
      } else {
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#101624] flex items-center justify-center p-4">
      <Card className="bg-[#181f32] border border-[#232b45] shadow-none w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-[#232b45] border border-[#232b45] text-white placeholder-gray-400 mt-1"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-[#232b45] border border-[#232b45] text-white placeholder-gray-400 mt-1"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 mt-1"
                disabled={isLoading}
              >
                <option value="Salesperson">Salesperson</option>
                <option value="Sales Admin">Sales Admin</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Referral Partner">Referral Partner</option>
                <option value="Support Partner">Support Partner</option>
              </select>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div className="text-xs text-gray-400 space-y-1">
              <p><strong>Demo Credentials:</strong></p>
              <p>Email: {formData.role.toLowerCase().replace(' ', '')}@test.com</p>
              <p>Password: password123</p>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;