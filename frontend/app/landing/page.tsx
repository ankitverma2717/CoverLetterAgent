"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, FileText, ArrowRight, Star, Clock, Shield } from 'lucide-react';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      window.location.href = `${apiUrl}/oauth2/authorization/google`;
  };

  const features = [
    { icon: Zap, title: "AI-Powered", desc: "Gemini 1.5 Flash generates personalized content" },
    { icon: Clock, title: "Instant Results", desc: "Get your cover letter in under 30 seconds" },
    { icon: Shield, title: "Secure & Private", desc: "Your data is encrypted and never shared" },
    { icon: FileText, title: "Google Docs", desc: "Export directly to Google Docs format" }
  ];

  const steps = [
    { num: "1", title: "Upload Resume", desc: "Drag and drop your PDF resume" },
    { num: "2", title: "Paste Job Description", desc: "Copy the job posting details" },
    { num: "3", title: "Generate", desc: "AI creates your perfect cover letter" },
    { num: "4", title: "Download", desc: "Get your formatted Google Doc" }
  ];

  const stats = [
    { value: "10K+", label: "Cover Letters Generated" },
    { value: "95%", label: "Success Rate" },
    { value: "<30s", label: "Average Time" },
    { value: "4.9/5", label: "User Rating" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-48 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-gray-900/80 backdrop-blur-lg shadow-2xl' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className={`flex items-center gap-3 transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="relative">
              <Sparkles className="w-10 h-10 text-purple-400 animate-pulse" />
              <div className="absolute inset-0 bg-purple-500 blur-xl opacity-50 animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              CoverCraft AI
            </span>
          </div>
          <button
            onClick={handleGetStarted}
            className={`px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}
          >
            Login with Google
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-8 backdrop-blur-sm">
              <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span className="text-sm">Trusted by 10,000+ job seekers</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Craft Perfect
              </span>
              <br />
              <span className="text-white">Cover Letters</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                in Seconds
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Powered by <span className="text-purple-400 font-semibold">Gemini AI</span>, CoverCraft analyzes your resume and job description to create personalized, professional cover letters instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 flex items-center gap-3"
              >
                <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Get Started Free
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>

              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Floating Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to create professional cover letters that get you hired
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-32 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-400">Simple, fast, and effective</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full animate-pulse"></div>
                    <div className="relative z-10 w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-3xl font-bold">
                      {step.num}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-3xl p-12 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 animate-pulse"></div>
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Ready to Land Your
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Dream Job?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Join thousands of successful job seekers who use CoverCraft AI
              </p>
              <button
                onClick={handleGetStarted}
                className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 inline-flex items-center gap-3"
              >
                <Sparkles className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                Start Creating Now
                <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-lg font-semibold">CoverCraft AI</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 CoverCraft AI. Powered by Gemini AI.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
