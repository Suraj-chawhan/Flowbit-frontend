



"use client"

import React, { useState } from 'react';
import { ArrowRight, BarChart3, TrendingUp, Database, Users, Star } from 'lucide-react';
import {useRouter } from "next/router"

export default function DataAnalyticsLanding() {
  const [email, setEmail] = useState('');
const router=useRouter();
  const testimonials = [
    {
      quote: "This platform transformed how we understand our data.",
      name: "Sarah Johnson",
      company: "TechCorp",
      image: "SJ"
    },
    {
      quote: "Incredible insights that drive our business decisions.",
      name: "Michael Chen",
      company: "DataFlow Inc",
      image: "MC"
    },
    {
      quote: "The most intuitive analytics tool we've ever used.",
      name: "Emily Rodriguez",
      company: "StartupHub",
      image: "ER"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Powerful Data Analytics, Simplified",
      description: "Transform complex data into actionable insights with our intuitive analytics platform."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Stay one Step Ahead",
      description: "Leverage predictive analytics to anticipate trends and make proactive decisions."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Centralize SQL Queries",
      description: "Manage all your database queries in one unified platform with version control."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Visualize with Charts",
      description: "Create stunning visualizations that make your data story come alive."
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">
      
      <nav className="backdrop-blur-md bg-white/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            DataStory
          </div>
          <div className="flex gap-6 items-center">
            <a href="#features" className="hover:text-blue-300 transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-blue-300 transition-colors">Testimonials</a>
            <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all transform hover:scale-105">
              Sign In
            </button>
          </div>
        </div>
      </nav>

  
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Query Your Data,<br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Unlock Insights Instantly.
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            A SQL you love. Simple in the moment, powerful in the long run. Start analyzing your data in seconds.
          </p>
        </div>

    
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-12">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
          />
          <button className="w-full sm:w-auto px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap" onClick={()=>router.push("/dashboard")}>
            Get Started <ArrowRight className="w-5 h-5"  />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="ml-2">Trusted by 10,000+ companies</span>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Ready to Unlock Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Data's Potential?</span>
        </h2>
        
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 relative">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              {testimonials[currentTestimonial].image}
            </div>
            <p className="text-xl italic mb-4">"{testimonials[currentTestimonial].quote}"</p>
            <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
            <p className="text-sm text-gray-400">{testimonials[currentTestimonial].company}</p>
          </div>
          
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
            >
              ←
            </button>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="backdrop-blur-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/20 rounded-3xl p-12">
          <h2 className="text-4xl font-bold mb-4">Start Analyzing Data Today</h2>
          <p className="text-xl text-gray-300 mb-8">
            No credit card required. Get started in less than 2 minutes.
          </p>
          <button className="px-10 py-4 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 mx-auto">
            Start Querying for Free <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="backdrop-blur-md bg-white/5 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            DataStory
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer" />
            <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-all c
ursor-pointer" />
            <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
} 