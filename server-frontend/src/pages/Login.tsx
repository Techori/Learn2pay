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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    // Mock credential check
    const validEmail = "test@sale.com";
    const validPassword = "password123";
    const mockRoles = {
      Salesperson: "/sales/salesperson",
      "Sales Manager": "/sales/manager",
    };

    if (formData.email === validEmail && formData.password === validPassword) {
      navigate(mockRoles[formData.role as keyof typeof mockRoles]);
    } else {
      setError("Invalid email or password.");
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 mt-1"
              >
                <option value="Salesperson">Salesperson</option>
                <option value="Sales Manager">Sales Manager</option>
              </select>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-orange-500 text-white hover:bg-orange-600">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;