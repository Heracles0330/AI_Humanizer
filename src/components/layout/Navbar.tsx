import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, UserCircle, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../lib/hooks';
import { signOut } from '../../lib/auth';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-10">
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-primary-600">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M19 9V7c0-1.1-.9-2-2-2h-3"></path>
              <path d="M12 18H5c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h3"></path>
              <path d="m9 11 3-3 3 3"></path>
              <path d="M12 8v10"></path>
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">HumanizeAI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
            Home
          </Link>
          <Link to="/pricing" className="text-gray-700 hover:text-primary-600 transition-colors">
            Pricing
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
            Contact
          </Link>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Dashboard
              </Link>
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <UserCircle className="h-6 w-6" />
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md mt-2 py-4">
          <div className="container-custom flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className="text-gray-700 hover:text-primary-600 transition-colors"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-primary-600 transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/profile"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    toggleMenu();
                  }}
                  className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" onClick={toggleMenu}>
                  <Button variant="outline" fullWidth>
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" onClick={toggleMenu}>
                  <Button variant="primary" fullWidth>
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;