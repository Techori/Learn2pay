import React, { useState } from 'react';
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select";
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn,
  Building
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from "../components/ui/Checkbox";

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let error = false;
    if (!error) {
      navigate('/dashboard');
    }
    setIsLoading(false);
  };

  const roleOptions = [
    { value: 'parent', label: 'Parent', icon: User },
    { value: 'institute_admin', label: 'Institute Admin', icon: Building },
    { value: 'super_admin', label: 'Super Admin', icon: User },
    { value: 'sales', label: 'Sales Team', icon: User },
    { value: 'support', label: 'Support Team', icon: User },
    { value: 'referral', label: 'Referral Team', icon: User }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="mx-auto w-fit font-extrabold text-3xl bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent uppercase tracking-widest">
              Learn2Pay
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Welcome to Learn2Pay
              </CardTitle>
              <CardDescription className="text-orange-200">
                Smart Fee Collection Platform
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="userType" className="text-sm font-medium text-orange-300">
                  I am a <span className="text-orange-500">*</span>
                </Label>
                <Select value={userType} onValueChange={setUserType} required>
                  <SelectTrigger className="h-12 border-gray-700 bg-gray-900 text-white focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue>
                      {userType ? roleOptions.find(r => r.value === userType)?.label : "Select your role"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => {
                      const IconComponent = role.icon;
                      return (
                        <SelectItem key={role.value} value={role.value}>
                          <div className="flex items-center space-x-2">
                            <IconComponent className="h-4 w-4 text-orange-400" />
                            <span>{role.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Login ID Field */}
              <div className="space-y-2">
                <Label htmlFor="loginId" className="text-sm font-medium text-orange-300">
                  Login ID <span className="text-orange-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400" />
                  <Input
                    id="loginId"
                    type="text"
                    placeholder="Enter your login ID"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    className="h-12 pl-10 border-gray-700 bg-gray-900 text-white focus:border-orange-500"
                    required
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-orange-300">
                  Password <span className="text-orange-500">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pl-10 pr-10 border-gray-700 bg-gray-900 text-white focus:border-orange-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-500"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                  />
                  <Label htmlFor="remember" className="text-sm text-orange-200">
                    Remember me
                  </Label>
                </div>
                <button type="button" className="text-sm text-orange-400 hover:text-orange-500">
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </span>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-900/80 rounded-lg border border-orange-500/20">
              <h4 className="text-sm font-semibold text-orange-300 mb-2">Demo Credentials:</h4>
              <div className="text-xs text-orange-200 space-y-1">
                <div>Admin: admin@test.com</div>
                <div>Parent: parent@test.com</div>
                <div>Institute: institute@test.com</div>
                <div>Sales: sales@test.com</div>
                <div>Support: support@test.com</div>
                <div className="font-medium">Password: password123</div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-orange-200">
                Don't have an account?{' '}
                <button 
                  onClick={() => navigate('/register')}
                  className="text-orange-400 hover:text-orange-500 font-medium"
                >
                  Register Institute
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;