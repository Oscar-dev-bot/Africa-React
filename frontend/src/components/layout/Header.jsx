/**
 * @file Header.jsx
 * @description Universal Header Component for East African Hub
 * 
 * This component provides a consistent header across all modules with:
 * - Responsive navigation menu
 * - Logo and branding
 * - User authentication status
 * - Module navigation links
 * - Search functionality
 * - Mobile-friendly hamburger menu
 * - User profile dropdown
 * 
 * @author Manus AI
 * @created 2025-09-26
 */

import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  User, 
  LogOut, 
  Settings, 
  Bell,
  ChevronDown,
  MapPin,
  ShoppingBag,
  Plane,
  Recycle,
  Wheat,
  Home,
  Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Header Component
 * Universal header component used across all modules
 * 
 * @param {Object} props - Component props
 * @param {string} props.currentModule - Currently active module
 * @param {Function} props.onModuleChange - Callback when module changes
 * @param {Function} props.onSearch - Callback for search functionality
 * @param {Function} props.onAuthClick - Callback for authentication actions
 */
const Header = ({ 
  currentModule = 'home',
  onModuleChange,
  onSearch,
  onAuthClick
}) => {
  // Authentication context
  const { user, logout, isAuthenticated } = useAuth();

  // Component state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Navigation modules configuration
   * Each module has an icon, label, and route
   */
  const modules = [
    { id: 'home', label: 'Home', icon: Home, route: '/' },
    { id: 'directory', label: 'Directory', icon: MapPin, route: '/directory' },
    { id: 'ecommerce', label: 'E-commerce', icon: ShoppingBag, route: '/ecommerce' },
    { id: 'tourism', label: 'Tourism', icon: Plane, route: '/tourism' },
    { id: 'used-goods', label: 'Used Goods', icon: Recycle, route: '/used-goods' },
    { id: 'farming', label: 'Farming', icon: Wheat, route: '/farming' },
    { id: 'real-estate', label: 'Real Estate', icon: Home, route: '/real-estate' },
    { id: 'logistics', label: 'Logistics', icon: Truck, route: '/logistics' }
  ];

  /**
   * Handle search form submission
   * @param {Event} e - Form submit event
   */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  /**
   * Handle module navigation
   * @param {string} moduleId - Module to navigate to
   */
  const handleModuleClick = (moduleId) => {
    setIsMobileMenuOpen(false);
    if (onModuleChange) {
      onModuleChange(moduleId);
    }
  };

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  /**
   * Toggle mobile menu
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {/* 
                LOGO PLACEMENT:
                Replace the div below with your logo image
                Recommended size: 40x40 pixels or 120x40 pixels for horizontal logo
                Example: <img src="/path/to/logo.png" alt="East African Hub" className="h-10 w-auto" />
              */}
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">EAH</span>
              </div>
            </div>
            
            {/* Brand Name - Hidden on mobile */}
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-900">
                East African Hub
              </h1>
              <p className="text-xs text-gray-500">
                Connecting East Africa
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = currentModule === module.id;
              
              return (
                <button
                  key={module.id}
                  onClick={() => handleModuleClick(module.id)}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{module.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                type="text"
                placeholder="Search across all modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button - Mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => {/* TODO: Implement mobile search modal */}}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications - Only for authenticated users */}
            {isAuthenticated() && (
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {/* Notification badge */}
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
                >
                  3
                </Badge>
              </Button>
            )}

            {/* User Menu or Auth Buttons */}
            {isAuthenticated() ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    {/* User Avatar - Replace with actual user image if available */}
                    <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={`${user.firstName} ${user.lastName}`}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className="hidden md:block text-sm font-medium">
                      {user?.firstName || 'User'}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {/* TODO: Navigate to dashboard */}}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {/* TODO: Navigate to settings */}}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onAuthClick && onAuthClick('login')}
                >
                  Sign In
                </Button>
                <Button 
                  size="sm"
                  onClick={() => onAuthClick && onAuthClick('register')}
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </form>
              </div>

              {/* Mobile Navigation Links */}
              {modules.map((module) => {
                const Icon = module.icon;
                const isActive = currentModule === module.id;
                
                return (
                  <button
                    key={module.id}
                    onClick={() => handleModuleClick(module.id)}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors
                      ${isActive 
                        ? 'bg-primary text-white' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{module.label}</span>
                  </button>
                );
              })}

              {/* Mobile Auth Section */}
              {!isAuthenticated() && (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center space-x-3 px-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onAuthClick && onAuthClick('login');
                      }}
                    >
                      Sign In
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onAuthClick && onAuthClick('register');
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
