// components/auth/auth-page.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '../../hooks/use-auth';
import { useAuthStore } from '../../store/auth-store';
import { Loader2, TrendingUp, Eye, EyeOff } from 'lucide-react';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { login, signup, isLoginLoading, isSignupLoading, loginError, signupError } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      return;
    }
    
    if (isLogin) {
      login.mutate({ email: email.trim(), password });
    } else {
      signup.mutate({ email: email.trim(), password });
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    if (signup.reset) signup.reset();
    if (login.reset) login.reset();
  };

  const isLoading = isLoginLoading || isSignupLoading;
  const error = loginError || signupError;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                TradePlatform
              </span>
            </div>
          </div>
          <CardTitle className="text-2xl">
            {isLogin ? 'Sign In' : 'Create Account'}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? 'Sign in to your account' 
              : 'Create a new account to get started'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                  minLength={8}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
              {!isLogin && (
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters long
                </p>
              )}
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800">
                {error.message}
              </div>
            )}

            {signup.isSuccess && (
              <div className="text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-md border border-green-200 dark:border-green-800">
                Account created successfully! Please sign in.
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !email.trim() || !password.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={handleToggleMode}
                disabled={isLoading}
                className="text-sm"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : 'Already have an account? Sign in'
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}