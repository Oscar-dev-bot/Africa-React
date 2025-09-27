/**
 * @file App.jsx
 * @description Main Application Component for East African Hub
 * 
 * This is the root component that orchestrates the entire application:
 * - Authentication state management
 * - Module routing and navigation
 * - Universal header and footer
 * - Modal management for auth forms
 * - Responsive layout structure
 * 
 * @author Manus AI
 * @created 2025-09-26
 */

import React, { useState } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import DirectoryModule from '@/components/modules/DirectoryModule';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HeroSlideshow from '@/components/common/HeroSlideshow';
import { 
  MapPin, 
  ShoppingBag, 
  Plane, 
  Recycle, 
  Wheat, 
  Home, 
  Truck,
  ArrowRight,
  Users,
  Globe,
  TrendingUp
} from 'lucide-react';
import './App.css';

/**
 * Main App Component
 * Root component that manages the entire application state and routing
 */
function App() {
  // Application state
  const [currentModule, setCurrentModule] = useState('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  /**
   * Module configuration
   */
  const modules = [
    {
      id: 'directory',
      name: 'Business Directory',
      description: 'Discover and connect with verified businesses across East Africa',
      icon: MapPin,
      color: 'from-blue-500 to-blue-600',
      component: DirectoryModule
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Hub',
      description: 'Connect manufacturers and suppliers for cross-border trade',
      icon: ShoppingBag,
      color: 'from-green-500 to-green-600',
      component: () => <ModulePlaceholder name="E-commerce Hub" />
    },
    {
      id: 'tourism',
      name: 'Tourism & Travel',
      description: 'Explore breathtaking destinations and unique experiences',
      icon: Plane,
      color: 'from-purple-500 to-purple-600',
      component: () => <ModulePlaceholder name="Tourism & Travel" />
    },
    {
      id: 'used-goods',
      name: 'Used Goods Market',
      description: 'Buy and sell quality pre-owned items safely',
      icon: Recycle,
      color: 'from-orange-500 to-orange-600',
      component: () => <ModulePlaceholder name="Used Goods Market" />
    },
    {
      id: 'farming',
      name: 'Agriculture Hub',
      description: 'Modern farming solutions and market access for farmers',
      icon: Wheat,
      color: 'from-yellow-500 to-yellow-600',
      component: () => <ModulePlaceholder name="Agriculture Hub" />
    },
    {
      id: 'real-estate',
      name: 'Real Estate',
      description: 'Find your dream property across East African cities',
      icon: Home,
      color: 'from-red-500 to-red-600',
      component: () => <ModulePlaceholder name="Real Estate" />
    },
    {
      id: 'logistics',
      name: 'Logistics Network',
      description: 'Efficient shipping and delivery across the region',
      icon: Truck,
      color: 'from-indigo-500 to-indigo-600',
      component: () => <ModulePlaceholder name="Logistics Network" />
    }
  ];

  /**
   * Home page hero slides
   */
  const homeHeroSlides = [
    {
      id: 1,
      category: "East African Hub",
      title: "Connecting East Africa's Digital Future",
      description: "The premier platform for business, tourism, trade, and community across East Africa",
      location: "10 Countries, Endless Opportunities",
      backgroundColor: "from-blue-600 to-purple-700"
    },
    {
      id: 2,
      category: "Business Directory",
      title: "Discover Verified Businesses",
      description: "Connect with thousands of trusted businesses across the region",
      location: "All East African Countries",
      backgroundColor: "from-green-600 to-blue-600"
    },
    {
      id: 3,
      category: "E-commerce Hub",
      title: "Trade Without Borders",
      description: "Connect manufacturers and suppliers for seamless cross-border commerce",
      location: "Regional Trade Network",
      backgroundColor: "from-purple-600 to-pink-600"
    },
    {
      id: 4,
      category: "Tourism Platform",
      title: "Explore East African Wonders",
      description: "Discover breathtaking destinations and unique cultural experiences",
      location: "From Kilimanjaro to Zanzibar",
      backgroundColor: "from-orange-600 to-red-600"
    }
  ];

  /**
   * Handle module navigation
   * @param {string} moduleId - Module to navigate to
   */
  const handleModuleChange = (moduleId) => {
    setCurrentModule(moduleId);
  };

  /**
   * Handle authentication modal
   * @param {string} mode - 'login' or 'register'
   */
  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  /**
   * Handle successful authentication
   * @param {Object} user - User data
   */
  const handleAuthSuccess = (user) => {
    setAuthModalOpen(false);
    console.log('Authentication successful:', user);
  };

  /**
   * Handle search across modules
   * @param {string} query - Search query
   */
  const handleSearch = (query) => {
    console.log('Global search:', query);
    // TODO: Implement global search functionality
  };

  /**
   * Handle newsletter subscription
   * @param {string} email - Email address
   */
  const handleNewsletterSubscribe = async (email) => {
    console.log('Newsletter subscription:', email);
    // TODO: Implement newsletter subscription
  };

  /**
   * Get current module component
   */
  const getCurrentModuleComponent = () => {
    if (currentModule === 'home') {
      return <HomePage />;
    }
    
    const module = modules.find(m => m.id === currentModule);
    if (module && module.component) {
      const Component = module.component;
      return <Component />;
    }
    
    return <ModulePlaceholder name="Module Not Found" />;
  };

  /**
   * Home Page Component
   */
  const HomePage = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSlideshow 
        slides={homeHeroSlides}
        height="80vh"
        autoPlay={true}
        autoPlayInterval={7000}
      />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Our Modules
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the comprehensive suite of services designed to connect and empower 
              East African communities, businesses, and individuals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Card 
                  key={module.id} 
                  className="hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => handleModuleChange(module.id)}
                >
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {module.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{module.description}</p>
                    <Button variant="ghost" className="group-hover:bg-primary group-hover:text-white transition-colors">
                      Explore Module
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10</h3>
              <p className="text-gray-600">Countries Served</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">5,000+</h3>
              <p className="text-gray-600">Businesses Listed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join East Africa's Digital Hub?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Connect with opportunities, grow your business, and be part of the region's digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => handleAuthClick('register')}
            >
              Get Started Today
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => handleModuleChange('directory')}
            >
              Explore Directory
            </Button>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <Header
          currentModule={currentModule}
          onModuleChange={handleModuleChange}
          onSearch={handleSearch}
          onAuthClick={handleAuthClick}
        />

        {/* Main Content */}
        <main className="flex-1">
          {getCurrentModuleComponent()}
        </main>

        {/* Footer */}
        <Footer
          onModuleChange={handleModuleChange}
          onNewsletterSubscribe={handleNewsletterSubscribe}
        />

        {/* Authentication Modal */}
        <Dialog open={authModalOpen} onOpenChange={setAuthModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {authMode === 'login' ? 'Sign In' : 'Create Account'}
              </DialogTitle>
            </DialogHeader>
            
            {authMode === 'login' ? (
              <LoginForm
                onSuccess={handleAuthSuccess}
                onSwitchToRegister={() => setAuthMode('register')}
                onForgotPassword={() => {
                  // TODO: Implement forgot password
                  console.log('Forgot password clicked');
                }}
              />
            ) : (
              <RegisterForm
                onSuccess={handleAuthSuccess}
                onSwitchToLogin={() => setAuthMode('login')}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AuthProvider>
  );
}

/**
 * Module Placeholder Component
 * Temporary component for modules not yet implemented
 */
const ModulePlaceholder = ({ name }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <Card className="max-w-md mx-auto text-center">
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6">
          This module is currently under development. 
          Check back soon for exciting new features!
        </p>
        <Button onClick={() => window.location.reload()}>
          Return to Home
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default App;
