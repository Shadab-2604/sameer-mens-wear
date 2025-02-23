import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-2xl mb-4">Sameer Men's Wear</h3>
            <p className="text-gray-300">
              Crafting elegance through traditional and formal wear since 1990.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-xl mb-4">Contact Us</h4>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={18} />
                <span>contact@sameerwear.com</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={18} />
                <span>123 Fashion Street, Mumbai, India</span>
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-serif text-xl mb-4">Store Hours</h4>
            <div className="space-y-2">
              <p>Monday - Saturday</p>
              <p className="text-secondary">10:00 AM - 9:00 PM</p>
              <p>Sunday</p>
              <p className="text-secondary">11:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Sameer Men's Wear. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}