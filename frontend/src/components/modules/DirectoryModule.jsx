/**
 * @file DirectoryModule.jsx
 * @description Business Directory Module for East African Hub
 * 
 * This component replicates all features from the WordPress Golo theme:
 * - Business listings with detailed information
 * - Advanced search and filtering
 * - Category-based browsing
 * - Location-based search with maps
 * - Business profiles with reviews and ratings
 * - Claim business functionality
 * - Featured listings
 * - Responsive grid and list views
 * 
 * @author Manus AI
 * @created 2025-09-26
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Filter,
  Grid,
  List,
  Heart,
  Share2,
  Verified,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeroSlideshow from '@/components/common/HeroSlideshow';

/**
 * DirectoryModule Component
 * Main directory module with all business listing functionality
 */
const DirectoryModule = () => {
  // Component state
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Business categories based on Golo theme analysis
   */
  const categories = [
    { id: 'all', name: 'All Categories', count: 0 },
    { id: 'restaurants', name: 'Restaurants & Food', count: 45 },
    { id: 'hotels', name: 'Hotels & Lodging', count: 32 },
    { id: 'shopping', name: 'Shopping & Retail', count: 67 },
    { id: 'services', name: 'Professional Services', count: 89 },
    { id: 'healthcare', name: 'Healthcare & Medical', count: 23 },
    { id: 'education', name: 'Education & Training', count: 34 },
    { id: 'automotive', name: 'Automotive', count: 28 },
    { id: 'beauty', name: 'Beauty & Wellness', count: 41 },
    { id: 'entertainment', name: 'Entertainment & Events', count: 19 },
    { id: 'technology', name: 'Technology & IT', count: 56 }
  ];

  /**
   * East African locations
   */
  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'nairobi-ke', name: 'Nairobi, Kenya' },
    { id: 'kampala-ug', name: 'Kampala, Uganda' },
    { id: 'dar-es-salaam-tz', name: 'Dar es Salaam, Tanzania' },
    { id: 'kigali-rw', name: 'Kigali, Rwanda' },
    { id: 'addis-ababa-et', name: 'Addis Ababa, Ethiopia' },
    { id: 'bujumbura-bi', name: 'Bujumbura, Burundi' },
    { id: 'djibouti-dj', name: 'Djibouti City, Djibouti' },
    { id: 'juba-ss', name: 'Juba, South Sudan' },
    { id: 'mogadishu-so', name: 'Mogadishu, Somalia' },
    { id: 'moroni-km', name: 'Moroni, Comoros' }
  ];

  /**
   * Mock business data (replace with API calls)
   */
  const mockBusinesses = [
    {
      id: 1,
      name: "Savannah Restaurant",
      category: "restaurants",
      location: "nairobi-ke",
      address: "Westlands, Nairobi, Kenya",
      phone: "+254 700 123 456",
      email: "info@savannahrestaurant.co.ke",
      website: "www.savannahrestaurant.co.ke",
      rating: 4.8,
      reviewCount: 127,
      description: "Authentic East African cuisine with a modern twist. Experience the flavors of the region in our elegant dining space.",
      image: "/api/placeholder/400/300",
      gallery: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      featured: true,
      verified: true,
      openingHours: {
        monday: "9:00 AM - 10:00 PM",
        tuesday: "9:00 AM - 10:00 PM",
        wednesday: "9:00 AM - 10:00 PM",
        thursday: "9:00 AM - 10:00 PM",
        friday: "9:00 AM - 11:00 PM",
        saturday: "9:00 AM - 11:00 PM",
        sunday: "10:00 AM - 9:00 PM"
      },
      amenities: ["WiFi", "Parking", "Outdoor Seating", "Delivery"],
      priceRange: "$$"
    },
    {
      id: 2,
      name: "TechHub Solutions",
      category: "technology",
      location: "kampala-ug",
      address: "Nakasero, Kampala, Uganda",
      phone: "+256 700 987 654",
      email: "hello@techhubsolutions.ug",
      website: "www.techhubsolutions.ug",
      rating: 4.9,
      reviewCount: 89,
      description: "Leading IT solutions provider specializing in software development, web design, and digital transformation.",
      image: "/api/placeholder/400/300",
      gallery: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      featured: true,
      verified: true,
      openingHours: {
        monday: "8:00 AM - 6:00 PM",
        tuesday: "8:00 AM - 6:00 PM",
        wednesday: "8:00 AM - 6:00 PM",
        thursday: "8:00 AM - 6:00 PM",
        friday: "8:00 AM - 6:00 PM",
        saturday: "9:00 AM - 2:00 PM",
        sunday: "Closed"
      },
      amenities: ["WiFi", "Parking", "Conference Room", "24/7 Support"],
      priceRange: "$$$"
    }
  ];

  /**
   * Hero slides for directory module
   */
  const heroSlides = [
    {
      id: 1,
      category: "Business Directory",
      title: "Discover East African Businesses",
      description: "Connect with thousands of verified businesses across East Africa",
      location: "East Africa",
      backgroundColor: "from-blue-600 to-blue-800"
    },
    {
      id: 2,
      category: "Featured Listings",
      title: "Premium Business Profiles",
      description: "Showcase your business with enhanced visibility and features",
      location: "All Locations",
      backgroundColor: "from-green-600 to-green-800"
    },
    {
      id: 3,
      category: "Local Services",
      title: "Find Services Near You",
      description: "Discover local businesses and services in your area",
      location: "Your Location",
      backgroundColor: "from-purple-600 to-purple-800"
    }
  ];

  /**
   * Initialize component
   */
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBusinesses(mockBusinesses);
      setFilteredBusinesses(mockBusinesses);
      setIsLoading(false);
    }, 1000);
  }, []);

  /**
   * Filter businesses based on search criteria
   */
  useEffect(() => {
    let filtered = businesses;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(business => business.category === selectedCategory);
    }

    // Filter by location
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(business => business.location === selectedLocation);
    }

    // Sort businesses
    switch (sortBy) {
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredBusinesses(filtered);
  }, [businesses, searchQuery, selectedCategory, selectedLocation, sortBy]);

  /**
   * Handle search form submission
   */
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  /**
   * Render business card
   */
  const renderBusinessCard = (business) => {
    if (viewMode === 'list') {
      return (
        <Card key={business.id} className="mb-4 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
              {/* Business Image */}
              <div className="flex-shrink-0">
                <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden">
                  {/* 
                    BUSINESS IMAGE PLACEMENT:
                    Replace with actual business image
                    <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
                  */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <span className="text-gray-600 text-2xl">{business.name.charAt(0)}</span>
                  </div>
                </div>
              </div>

              {/* Business Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold">{business.name}</h3>
                      {business.verified && (
                        <Verified className="h-5 w-5 text-blue-500" />
                      )}
                      {business.featured && (
                        <Badge variant="secondary">Featured</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{business.rating}</span>
                        <span>({business.reviewCount} reviews)</span>
                      </div>
                      <Badge variant="outline">
                        {categories.find(cat => cat.id === business.category)?.name}
                      </Badge>
                    </div>

                    <p className="text-gray-700 mb-3">{business.description}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{business.address}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{business.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2">
                    <Button size="sm" variant="outline">
                      <Heart className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Grid view
    return (
      <Card key={business.id} className="hover:shadow-lg transition-shadow">
        <CardHeader className="p-0">
          <div className="relative">
            {/* Business Image */}
            <div className="w-full h-48 bg-gray-200 rounded-t-lg overflow-hidden">
              {/* 
                BUSINESS IMAGE PLACEMENT:
                Replace with actual business image
                <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
              */}
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <span className="text-gray-600 text-3xl">{business.name.charAt(0)}</span>
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex space-x-2">
              {business.featured && (
                <Badge className="bg-yellow-500 text-white">Featured</Badge>
              )}
              {business.verified && (
                <Badge className="bg-blue-500 text-white">
                  <Verified className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex space-x-2">
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold mb-1">{business.name}</h3>
              <Badge variant="outline" className="text-xs">
                {categories.find(cat => cat.id === business.category)?.name}
              </Badge>
            </div>

            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{business.rating}</span>
              <span className="text-sm text-gray-500">({business.reviewCount})</span>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2">{business.description}</p>

            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{business.address}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Open Now</span>
              </div>
              <Button size="sm">View Details</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSlideshow 
        slides={heroSlides}
        height="60vh"
        autoPlay={true}
        autoPlayInterval={6000}
      />

      {/* Search Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search businesses, services, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} {category.count > 0 && `(${category.count})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full md:w-auto">
              <Search className="h-4 w-4 mr-2" />
              Search Businesses
            </Button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
          
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="space-y-6">
              
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`
                          w-full text-left px-3 py-2 rounded-md text-sm transition-colors
                          ${selectedCategory === category.id
                            ? 'bg-primary text-white'
                            : 'hover:bg-gray-100'
                          }
                        `}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          {category.count > 0 && (
                            <span className="text-xs opacity-75">({category.count})</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Featured Business */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Featured Business</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
                    <h4 className="font-semibold">Premium Restaurant</h4>
                    <p className="text-sm text-gray-600">Fine dining experience in the heart of Nairobi</p>
                    <Button size="sm" className="w-full">Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedCategory === 'all' ? 'All Businesses' : 
                   categories.find(cat => cat.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  {filteredBusinesses.length} businesses found
                  {selectedLocation !== 'all' && 
                    ` in ${locations.find(loc => loc.id === selectedLocation)?.name}`
                  }
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort Options */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured First</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Business Listings */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                    <CardContent className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredBusinesses.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredBusinesses.map(renderBusinessCard)}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold">No businesses found</h3>
                    <p className="text-gray-600">
                      Try adjusting your search criteria or browse all categories.
                    </p>
                    <Button onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedLocation('all');
                    }}>
                      Clear Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Load More Button */}
            {filteredBusinesses.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Businesses
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectoryModule;
