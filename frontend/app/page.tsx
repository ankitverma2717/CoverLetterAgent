'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the main app component (no SSR)
const CoverLetterApp = dynamic(() => import('./components/CoverLetterApp'), { ssr: false });

// Google login handler (uses env variable for API URL)
const handleGetStarted = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  window.location.href = `${apiUrl}/api/v1/auth/google`;
};

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get('token');

      if (tokenFromUrl) {
        localStorage.setItem('jwt_token', tokenFromUrl);
        window.history.replaceState({}, document.title, window.location.pathname);
        setIsAuthenticated(true);
      } else {
        const token = localStorage.getItem('jwt_token');
        setIsAuthenticated(!!token);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white text-xl">
        <div className="animate-pulse">Loading CoverCraft AI...</div>
      </div>
    );
  }

  // If not authenticated, show login button
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <button
          onClick={handleGetStarted}
          className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Login with Google
        </button>
      </div>
    );
  }

  // Authenticated: render main app
  return <CoverLetterApp />;
}