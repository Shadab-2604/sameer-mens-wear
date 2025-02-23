import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '../lib/utils';

const categories = [
  'Suits',
  'Sherwani',
  'Kurta',
  'Sadri Coat',
  'Blazer',
  'Jodhpuri',
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="font-serif text-2xl text-primary dark:text-white">
                Sameer
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/category/all"
              className={cn(
                "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white transition-colors",
                isActive('/category/all') && "text-primary dark:text-white font-semibold"
              )}
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className={cn(
                  "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white transition-colors",
                  isActive(`/category/${category.toLowerCase()}`) && "text-primary dark:text-white font-semibold"
                )}
              >
                {category}
              </Link>
            ))}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden',
          isOpen ? 'block' : 'hidden'
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/category/all"
            className={cn(
              "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800",
              isActive('/category/all') && "bg-gray-50 dark:bg-gray-800"
            )}
            onClick={() => setIsOpen(false)}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category.toLowerCase()}`}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800",
                isActive(`/category/${category.toLowerCase()}`) && "bg-gray-50 dark:bg-gray-800"
              )}
              onClick={() => setIsOpen(false)}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}