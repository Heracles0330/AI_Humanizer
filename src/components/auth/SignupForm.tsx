import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { signUp } from '../../lib/auth';
import { Mail, Lock, User } from 'lucide-react';

const SignupForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await signUp(email, password, fullName);
      
      if (error) {
        setError(error.message);
      } else if (data) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Sign up error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-error-50 text-error-600 p-4 rounded-lg">
          {error}
        </div>
      )}
      
      <div>
        <Input
          type="text"
          id="fullName"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          leftIcon={<User className="h-5 w-5 text-gray-400" />}
        />
      </div>
      
      <div>
        <Input
          type="email"
          id="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
        />
      </div>
      
      <div>
        <Input
          type="password"
          id="password"
          placeholder="Password (min. 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
        />
      </div>
      
      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          required
          className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          I agree to the{' '}
          <a href="#" className="text-primary-600 hover:text-primary-700">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary-600 hover:text-primary-700">
            Privacy Policy
          </a>
        </label>
      </div>
      
      <Button
        type="submit"
        fullWidth
        isLoading={loading}
      >
        Create Account
      </Button>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;