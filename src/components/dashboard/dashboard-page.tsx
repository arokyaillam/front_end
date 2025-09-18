// components/dashboard/dashboard-page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/hooks/use-auth';
import { Loading } from '@/components/ui/loading';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  LogOut,
  User,
  Settings
} from 'lucide-react';

export function DashboardPage() {
  const { user, logout, isProfileLoading } = useAuth();

  if (isProfileLoading) {
    return <Loading text="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Trading Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <User className="h-4 w-4" />
                <span>{user?.email || 'Loading...'}</span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                className="hidden sm:flex items-center space-x-2"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.email?.split('@')[0] || 'Trader'}!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Here's your trading dashboard overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,25,000</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5.2%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's P&L</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+₹2,150</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+1.72%</span> gain today
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                3 stocks, 5 options
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Cash</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹45,000</div>
              <p className="text-xs text-muted-foreground">
                Ready for trading
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Broker Connection Status */}
        <Card className="mb-8 border-l-4 border-l-yellow-400">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>Broker Connection</span>
            </CardTitle>
            <CardDescription>
              Connect your trading account to start live trading
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <span className="font-medium">Upstox</span>
                <span className="text-sm text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 px-2 py-1 rounded-md">
                  Not Connected
                </span>
              </div>
              <Button size="sm" className="w-full sm:w-auto">
                Connect Upstox Account
              </Button>
            </div>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                💡 <strong>Next Step:</strong> Connect your Upstox account to access live market data and place trades
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common trading actions (available after broker connection)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col space-y-2 opacity-50 cursor-not-allowed" disabled>
                <TrendingUp className="h-6 w-6 text-green-600" />
                <span>Buy Stock</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2 opacity-50 cursor-not-allowed" disabled>
                <TrendingDown className="h-6 w-6 text-red-600" />
                <span>Sell Stock</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2 opacity-50 cursor-not-allowed" disabled>
                <Activity className="h-6 w-6" />
                <span>View Orders</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2 opacity-50 cursor-not-allowed" disabled>
                <DollarSign className="h-6 w-6" />
                <span>Portfolio</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}