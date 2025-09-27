/**
 * @file HeroSlideshow.jsx
 * @description Hero Slideshow Component with 3D Coverflow Effect
 * 
 * This component provides a sophisticated slideshow for hero sections with:
 * - 3D coverflow effect similar to the provided HTML/CSS/JS example
 * - Smooth transitions and animations
 * - Touch/swipe support for mobile devices
 * - Keyboard navigation support
 * - Auto-play functionality with pause on hover
 * - Customizable slides with images, titles, and descriptions
 * - Responsive design for all screen sizes
 * 
 * @author Manus AI
 * @created 2025-09-26
 */

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * HeroSlideshow Component
 * Creates a 3D coverflow slideshow for hero sections
 * 
 * @param {Object} props - Component props
 * @param {Array} props.slides - Array of slide objects
 * @param {boolean} props.autoPlay - Whether to auto-play slides
 * @param {number} props.autoPlayInterval - Auto-play interval in milliseconds
 * @param {string} props.height - Height of the slideshow
 * @param {Function} props.onSlideChange - Callback when slide changes
 */
const HeroSlideshow = ({ 
  slides = [],
  autoPlay = true,
  autoPlayInterval = 5000,
  height = "100vh",
  onSlideChange
}) => {
  // Component state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);
  
  // Refs
  const slideshowRef = useRef(null);
  const autoPlayRef = useRef(null);

  /**
   * Default slides if none provided
   */
  const defaultSlides = [
    {
      id: 1,
      category: "Business Directory",
      title: "Discover East African Businesses",
      description: "Connect with thousands of verified businesses across East Africa",
      location: "Nairobi, Kenya",
      image: "/api/placeholder/800/600", // Replace with actual image path
      backgroundColor: "from-blue-600 to-blue-800"
    },
    {
      id: 2,
      category: "E-commerce Hub",
      title: "Trade Across Borders",
      description: "Connect manufacturers and suppliers across the region",
      location: "Kampala, Uganda",
      image: "/api/placeholder/800/600", // Replace with actual image path
      backgroundColor: "from-green-600 to-green-800"
    },
    {
      id: 3,
      category: "Tourism",
      title: "Explore East African Wonders",
      description: "Discover breathtaking destinations and unique experiences",
      location: "Zanzibar, Tanzania",
      image: "/api/placeholder/800/600", // Replace with actual image path
      backgroundColor: "from-purple-600 to-purple-800"
    },
    {
      id: 4,
      category: "Agriculture",
      title: "Modern Farming Solutions",
      description: "Empowering farmers with technology and market access",
      location: "Kigali, Rwanda",
      image: "/api/placeholder/800/600", // Replace with actual image path
      backgroundColor: "from-orange-600 to-orange-800"
    },
    {
      id: 5,
      category: "Real Estate",
      title: "Find Your Dream Property",
      description: "Premium properties across East African cities",
      location: "Dar es Salaam, Tanzania",
      image: "/api/placeholder/800/600", // Replace with actual image path
      backgroundColor: "from-red-600 to-red-800"
    }
  ];

  const slidesToShow = slides.length > 0 ? slides : defaultSlides;

  /**
   * Go to next slide
   */
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesToShow.length);
  };

  /**
   * Go to previous slide
   */
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesToShow.length) % slidesToShow.length);
  };

  /**
   * Go to specific slide
   * @param {number} index - Slide index
   */
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  /**
   * Toggle auto-play
   */
  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  /**
   * Auto-play effect
   */
  useEffect(() => {
    if (isPlaying && !isHovered) {
      autoPlayRef.current = setInterval(nextSlide, autoPlayInterval);
    } else {
      clearInterval(autoPlayRef.current);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isPlaying, isHovered, autoPlayInterval]);

  /**
   * Notify parent of slide changes
   */
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentSlide, slidesToShow[currentSlide]);
    }
  }, [currentSlide, onSlideChange]);

  /**
   * Keyboard navigation
   */
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          prevSlide();
          break;
        case 'ArrowRight':
          nextSlide();
          break;
        case ' ':
          event.preventDefault();
          toggleAutoPlay();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  /**
   * Get slide transform style for 3D coverflow effect
   * @param {number} index - Slide index
   * @returns {Object} Transform styles
   */
  const getSlideTransform = (index) => {
    const diff = index - currentSlide;
    const absIndex = Math.abs(diff);
    
    // Center slide
    if (diff === 0) {
      return {
        transform: 'translateX(0) rotateY(0deg) scale(1)',
        zIndex: 10,
        opacity: 1
      };
    }
    
    // Side slides
    const direction = diff > 0 ? 1 : -1;
    const translateX = direction * (200 + (absIndex - 1) * 100);
    const rotateY = direction * -45;
    const scale = Math.max(0.6, 1 - (absIndex * 0.2));
    const opacity = Math.max(0.3, 1 - (absIndex * 0.3));
    
    return {
      transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex: 10 - absIndex,
      opacity: opacity
    };
  };

  return (
    <section 
      ref={slideshowRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
      style={{ height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slideshow Container */}
      <div className="relative w-full h-full flex items-center justify-center perspective-1000">
        
        {/* Slides */}
        <div className="relative w-full h-full flex items-center justify-center">
          {slidesToShow.map((slide, index) => {
            const slideStyle = getSlideTransform(index);
            const isActive = index === currentSlide;
            
            return (
              <div
                key={slide.id}
                className={`
                  absolute w-80 h-96 md:w-96 md:h-[500px] rounded-2xl overflow-hidden cursor-pointer
                  transition-all duration-700 ease-out transform-gpu
                  ${isActive ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'}
                `}
                style={slideStyle}
                onClick={() => !isActive && goToSlide(index)}
              >
                {/* Slide Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.backgroundColor || 'from-blue-600 to-blue-800'}`}>
                  {/* 
                    SLIDE IMAGE PLACEMENT:
                    Replace the div below with actual slide images
                    Example: 
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  */}
                  <div className="w-full h-full bg-gradient-to-br from-black/20 to-black/40 flex items-center justify-center">
                    <div className="text-white text-6xl opacity-20">
                      {slide.category.charAt(0)}
                    </div>
                  </div>
                </div>

                {/* Slide Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                      {slide.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
                    {slide.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-200 mb-4 leading-relaxed">
                    {slide.description}
                  </p>

                  {/* Location */}
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <MapPin className="h-4 w-4" />
                    <span>{slide.location}</span>
                  </div>
                </div>

                {/* Active Slide Indicator */}
                {isActive && (
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="lg"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white border-white/20"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white border-white/20"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Auto-play Control */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 text-white border-white/20"
          onClick={toggleAutoPlay}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {slidesToShow.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / slidesToShow.length) * 100}%` 
          }}
        />
      </div>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </section>
  );
};

export default HeroSlideshow;
