import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { signIn } from '../../lib/auth';
import { Mail, Lock } from 'lucide-react';

const SigninForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
      } else if (data) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Sign in error:', err);
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
        
        <div className="text-sm">
          <Link to="/forgot-password" className="text-primary-600 hover:text-primary-700">
            Forgot your password?
          </Link>
        </div>
      </div>
      
      <Button
        type="submit"
        fullWidth
        isLoading={loading}
      >
        Sign In
      </Button>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SigninForm;