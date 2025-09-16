'use client';

import { Linkedin, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GhostBtn } from '../atoms/GhostBtn';
import { LogoFull } from '../icons';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/company/pin-global', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/pinglobal', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/pinglobal', label: 'Facebook' },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-pin-gray-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <GhostBtn Icon={LogoFull} iconClass="text-white text-2xl" linkProps={{ href: '/' }} />
            </div>
            <p className="text-gray-300 leading-relaxed">
              A subsidiary of Pinpoint Global, specializing in strategic billboard advertising that
              connects brands with their target audiences through premium outdoor placements.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-full border-gray-600 bg-transparent text-gray-300 hover:bg-pin-red hover:text-white hover:border-pin-red transition-all duration-300"
                    onClick={() => window.open(social.href, '_blank')}
                    aria-label={social.label}>
                    <Icon className="w-5 h-5" />
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-pin-red transition-colors duration-200">
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('locations')}
                  className="text-gray-300 hover:text-pin-red transition-colors duration-200">
                  Billboard Locations
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('booking')}
                  className="text-gray-300 hover:text-pin-red transition-colors duration-200">
                  Book a Billboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-pin-red transition-colors duration-200">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Contact Information</h3>
            <div className="space-y-3 text-gray-300">
              <p>📞 +1 (555) PIN-GLOB</p>
              <p>✉️ hello@pinglobal.com</p>
              <p>
                📍 123 Billboard Ave, Suite 500
                <br />
                New York, NY 10001
              </p>
              <p>🕒 Mon - Fri: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {currentYear} Pin Global. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-pin-red text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-pin-red text-sm transition-colors duration-200">
              Terms of Service
            </a>
            <a
              href="https://pinpoint.ng"
              className="text-gray-400 hover:text-pin-red text-sm transition-colors duration-200">
              Pinpoint Global
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
