/**
 * @file Footer.jsx
 * @description Universal Footer Component for East African Hub
 * 
 * This component provides a consistent footer across all modules with:
 * - Company information and branding
 * - Quick links to all modules
 * - Contact information
 * - Social media links
 * - Newsletter subscription
 * - Legal links (Terms, Privacy, etc.)
 * - Responsive design for all devices
 * 
 * @author Manus AI
 * @created 2025-09-26
 */

import React, { useState } from 'react';
import { 
  MapPin, 
  ShoppingBag, 
  Plane, 
  Recycle, 
  Wheat, 
  Home, 
  Truck,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

/**
 * Footer Component
 * Universal footer component used across all modules
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onModuleChange - Callback when module link is clicked
 * @param {Function} props.onNewsletterSubscribe - Callback for newsletter subscription
 */
const Footer = ({ 
  onModuleChange,
  onNewsletterSubscribe
}) => {
  // Newsletter subscription state
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  /**
   * Module links configuration
   */
  const moduleLinks = [
    { id: 'directory', label: 'Business Directory', icon: MapPin },
    { id: 'ecommerce', label: 'E-commerce Hub', icon: ShoppingBag },
    { id: 'tourism', label: 'Tourism & Travel', icon: Plane },
    { id: 'used-goods', label: 'Used Goods Market', icon: Recycle },
    { id: 'farming', label: 'Agriculture Hub', icon: Wheat },
    { id: 'real-estate', label: 'Real Estate', icon: Home },
    { id: 'logistics', label: 'Logistics Network', icon: Truck }
  ];

  /**
   * Quick links configuration
   */
  const quickLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Success Stories', href: '/success-stories' },
    { label: 'Blog', href: '/blog' },
    { label: 'Help Center', href: '/help' },
    { label: 'Contact Us', href: '/contact' }
  ];

  /**
   * Legal links configuration
   */
  const legalLinks = [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Refund Policy', href: '/refunds' }
  ];

  /**
   * Social media links configuration
   */
  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: Facebook, 
      href: 'https://facebook.com/eastafricanhub',
      color: 'hover:text-blue-600'
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      href: 'https://twitter.com/eastafricanhub',
      color: 'hover:text-blue-400'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      href: 'https://instagram.com/eastafricanhub',
      color: 'hover:text-pink-600'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      href: 'https://linkedin.com/company/eastafricanhub',
      color: 'hover:text-blue-700'
    },
    { 
      name: 'YouTube', 
      icon: Youtube, 
      href: 'https://youtube.com/eastafricanhub',
      color: 'hover:text-red-600'
    }
  ];

  /**
   * Handle newsletter subscription
   * @param {Event} e - Form submit event
   */
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) return;

    setIsSubscribing(true);
    
    try {
      if (onNewsletterSubscribe) {
        await onNewsletterSubscribe(email.trim());
      }
      
      // Clear email on success
      setEmail('');
      
      // TODO: Show success message
      console.log('Newsletter subscription successful');
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      // TODO: Show error message
    } finally {
      setIsSubscribing(false);
    }
  };

  /**
   * Handle module link click
   * @param {string} moduleId - Module to navigate to
   */
  const handleModuleLinkClick = (moduleId) => {
    if (onModuleChange) {
      onModuleChange(moduleId);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {/* 
                LOGO PLACEMENT:
                Replace the div below with your logo image (white/light version)
                Recommended size: 40x40 pixels or 120x40 pixels for horizontal logo
                Example: <img src="/path/to/logo-white.png" alt="East African Hub" className="h-10 w-auto" />
              */}
              <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-gray-900 font-bold text-lg">EAH</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">East African Hub</h3>
                <p className="text-sm text-gray-400">Connecting East Africa</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              The premier digital platform connecting businesses, tourists, farmers, 
              and communities across East Africa. Discover opportunities, build 
              connections, and grow together.
            </p>

            {/* Contact Information */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>info@eastafricanhub.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+254 700 000 000</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${social.color} transition-colors`}
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Our Modules */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Modules</h3>
            <ul className="space-y-2">
              {moduleLinks.map((module) => {
                const Icon = module.icon;
                return (
                  <li key={module.id}>
                    <button
                      onClick={() => handleModuleLinkClick(module.id)}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{module.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center space-x-1"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for the latest updates, opportunities, 
              and insights from across East Africa.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-white"
                  disabled={isSubscribing}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubscribing || !email.trim()}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isSubscribing ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-400">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>

            {/* App Download Links */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Download Our App</p>
              <div className="flex space-x-2">
                {/* 
                  APP STORE BADGES PLACEMENT:
                  Replace the buttons below with actual app store badges
                  Example: 
                  <img src="/path/to/app-store-badge.png" alt="Download on App Store" className="h-10" />
                  <img src="/path/to/google-play-badge.png" alt="Get it on Google Play" className="h-10" />
                */}
                <div className="bg-gray-800 px-3 py-2 rounded text-xs">
                  App Store
                </div>
                <div className="bg-gray-800 px-3 py-2 rounded text-xs">
                  Google Play
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} East African Hub. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Proudly serving East Africa with innovation and excellence.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-end space-x-4">
            {legalLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                <a
                  href={link.href}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
                {index < legalLinks.length - 1 && (
                  <span className="text-gray-600">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-2 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span>🌍 Serving 10 East African Countries</span>
              <span>•</span>
              <span>🚀 Powered by Innovation</span>
              <span>•</span>
              <span>🤝 Built for Community</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span>Made with ❤️ in East Africa</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
