'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports to avoid SSR issues
const LandingPage = dynamic(() => import('./landing/page'), { ssr: false });
const CoverLetterApp = dynamic(() => import('./components/CoverLetterApp'), { ssr: false });

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has JWT token
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

  return isAuthenticated ? <CoverLetterApp /> : <LandingPage />;
}