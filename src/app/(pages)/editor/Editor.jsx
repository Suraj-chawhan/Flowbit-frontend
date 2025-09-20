"use client"
import React, { useState } from 'react';
import { 
  MessageCircle, 
  Monitor, 
  Smartphone, 
  User, 
  Settings, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  Send,
  Sparkles,
  Code,
  FileText,
  Zap,
  Menu,
  X,
  Upload,
  Paperclip,
  Play,
  Pause,
  Eye,
  Edit3
} from 'lucide-react';

export default function ChatSandpackInterface() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState('welcome');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hi! I\'m AssessmentAI. I can help you create landing pages, assessments, and more. What would you like to build today?'
    }
  ]);

  // Code templates for different types of content
  const codeTemplates = {
    welcome: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AssessmentAI - Welcome</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50/30 to-indigo-100/40">
        <div class="text-center">
            <div class="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            </div>
            <h1 class="text-4xl font-bold text-slate-900 mb-4">AssessmentAI</h1>
            <p class="text-lg text-slate-600 max-w-md mx-auto">
                Start chatting to see your AI-generated content appear here in real-time.
            </p>
            <div class="mt-8 flex justify-center space-x-4">
                <div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <div class="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                <div class="w-3 h-3 bg-indigo-400 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
            </div>
        </div>
    </div>
</body>
</html>`,
    homepage: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AssessmentAI - Homepage</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50/30 to-indigo-100/40">
        <header class="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-slate-200/50">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    </div>
                    <span class="text-xl font-bold text-slate-900">AssessmentAI</span>
                </div>
                <nav class="hidden md:flex items-center space-x-8">
                    <a href="#" class="text-slate-600 hover:text-slate-900 font-medium transition-colors">Features</a>
                    <a href="#" class="text-slate-600 hover:text-slate-900 font-medium transition-colors">Pricing</a>
                    <a href="#" class="text-slate-600 hover:text-slate-900 font-medium transition-colors">About</a>
                    <button class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                        Get Started
                    </button>
                </nav>
            </div>
        </header>

        <section class="flex-1 px-6 py-20 text-center">
            <h1 class="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Let's make your dream a
                <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> reality</span>
            </h1>
            <p class="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
                AssessmentAI lets you create high-quality job interview assessments in minutes with just your words.
            </p>
            
            <div class="max-w-2xl mx-auto">
                <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50">
                    <div class="flex items-center space-x-4 mb-6">
                        <input
                            type="text"
                            placeholder="What assessment do you need help with?"
                            class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <button class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:opacity-90 transition-opacity">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                    
                    <div class="flex flex-wrap gap-2 justify-center">
                        <button class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm transition-colors">Mock Interview</button>
                        <button class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm transition-colors">Case Study</button>
                        <button class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm transition-colors">Coding Challenge</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</body>
</html>`,
    assessment: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AssessmentAI - Assessment</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-indigo-100/40 p-6">
        <div class="max-w-4xl mx-auto">
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50">
                <div class="flex items-center justify-between mb-6">
                    <h1 class="text-2xl font-bold text-slate-900">Software Engineer Assessment</h1>
                    <div class="text-sm text-slate-600">Question 1 of 5</div>
                </div>
                
                <div class="w-full bg-slate-200 rounded-full h-2 mb-8">
                    <div class="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full w-1/5 transition-all duration-300"></div>
                </div>

                <div class="space-y-6">
                    <div>
                        <h2 class="text-lg font-semibold text-slate-900 mb-4">
                            Which of the following is NOT a principle of Object-Oriented Programming?
                        </h2>
                        <div class="space-y-3">
                            <label class="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 cursor-pointer transition-all">
                                <input type="radio" name="question1" class="mr-3 text-blue-600 focus:ring-blue-500" />
                                <span class="text-slate-800">Encapsulation</span>
                            </label>
                            <label class="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 cursor-pointer transition-all">
                                <input type="radio" name="question1" class="mr-3 text-blue-600 focus:ring-blue-500" />
                                <span class="text-slate-800">Inheritance</span>
                            </label>
                            <label class="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 cursor-pointer transition-all">
                                <input type="radio" name="question1" class="mr-3 text-blue-600 focus:ring-blue-500" />
                                <span class="text-slate-800">Polymorphism</span>
                            </label>
                            <label class="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 cursor-pointer transition-all">
                                <input type="radio" name="question1" class="mr-3 text-blue-600 focus:ring-blue-500" />
                                <span class="text-slate-800">Compilation</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="flex justify-between pt-6">
                        <button class="px-6 py-3 text-slate-600 hover:text-slate-800 font-medium transition-colors">
                            Previous
                        </button>
                        <button class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                            Next Question
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Add interactive selection highlighting
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', function() {
                // Reset all labels
                document.querySelectorAll('label').forEach(label => {
                    label.className = 'flex items-center p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 cursor-pointer transition-all';
                });
                
                // Highlight selected
                if (this.checked) {
                    this.closest('label').className = 'flex items-center p-4 bg-blue-50 rounded-lg border border-blue-300 ring-2 ring-blue-200 cursor-pointer transition-all';
                }
            });
        });
    </script>
</body>
</html>`,
    dashboard: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AssessmentAI - Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-indigo-100/40">
        <header class="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-slate-200/50">
            <div class="flex items-center justify-between">
                <h1 class="text-xl font-bold text-slate-900">Dashboard</h1>
                <div class="flex items-center space-x-4">
                    <button class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                        New Assessment
                    </button>
                </div>
            </div>
        </header>

        <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-shadow">
                    <h3 class="text-sm text-slate-600 mb-2">Total Assessments</h3>
                    <div class="flex items-end justify-between">
                        <span class="text-3xl font-bold text-slate-900">24</span>
                        <span class="text-green-600 text-sm font-medium">+12%</span>
                    </div>
                </div>
                <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-shadow">
                    <h3 class="text-sm text-slate-600 mb-2">Completed</h3>
                    <div class="flex items-end justify-between">
                        <span class="text-3xl font-bold text-slate-900">18</span>
                        <span class="text-green-600 text-sm font-medium">+8%</span>
                    </div>
                </div>
                <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-shadow">
                    <h3 class="text-sm text-slate-600 mb-2">Average Score</h3>
                    <div class="flex items-end justify-between">
                        <span class="text-3xl font-bold text-slate-900">87%</span>
                        <span class="text-green-600 text-sm font-medium">+3%</span>
                    </div>
                </div>
            </div>

            <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/50">
                <h2 class="text-lg font-semibold text-slate-900 mb-4">Recent Assessments</h2>
                <div class="space-y-3">
                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
                        <div>
                            <h4 class="font-medium text-slate-900">Frontend Developer Test</h4>
                            <p class="text-sm text-slate-600">2 hours ago</p>
                        </div>
                        <span class="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Completed
                        </span>
                    </div>
                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
                        <div>
                            <h4 class="font-medium text-slate-900">Marketing Case Study</h4>
                            <p class="text-sm text-slate-600">1 day ago</p>
                        </div>
                        <span class="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            In Progress
                        </span>
                    </div>
                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
                        <div>
                            <h4 class="font-medium text-slate-900">Data Analyst Assessment</h4>
                            <p class="text-sm text-slate-600">3 days ago</p>
                        </div>
                        <span class="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Completed
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`,
    pricing: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AssessmentAI - Pricing</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-indigo-100/40 p-6">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-slate-900 mb-4">Choose Your Plan</h1>
                <p class="text-xl text-slate-600">Start your assessment journey today</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-slate-200/50 transition-all hover:shadow-xl hover:scale-105">
                    <h3 class="text-2xl font-bold text-slate-900 mb-2">Starter</h3>
                    <div class="text-4xl font-bold text-slate-900 mb-6">$29<span class="text-lg text-slate-600">/month</span></div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-center text-slate-700">
                            <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            5 assessments/month
                        </li>
                        <li class="flex items-center text-slate-700">
                            <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            Basic templates
                        </li>
                        <li class="flex items-center text-slate-700">
                            <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            Email support
                        </li>
                    </ul>
                    <button class="w-full py-3 rounded-lg font-medium bg-slate-100 text-slate-800 hover:bg-slate-200 transition-all">
                        Get Started
                    </button>
                </div>

                <div class="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-blue-400 ring-2 ring-blue-400/30 transition-all hover:shadow-xl scale-105">
                    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium text-center mb-6">
                        Most Popular
                    </div>
                    <h3 class="text-2xl font-bold text-slate-900 mb-2">Pro</h3>
                    <div class="text-4xl font-bold text-slate-900 mb-6">$79<span class="text-lg text-slate-600">/month</span></div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-center text-slate-700">
                            <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            Unlimited assessments
                        </li>
                        <li class="flex items-center text-slate-700">
                            <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            Premium templates
                        </li>
                        <li class="flex items-center text-slate-700">
                            <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            Priority support
                        </li>
                        <li class="flex items-center text-slate-700">
                            <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            Advanced AI
                        </li>
                    </ul>
                    <button class="w-full py-3 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-all">
                        Get Started
                    </button>
                </div>

                <div class="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-slate-200/50 transition-all hover:shadow-xl hover:scale-105">
                    <h3 class="text-2xl font-bold text-slate-900 mb-2">Enterprise</h3>
                    <div class="text-4xl font-bold text-slate-900 mb-6">$199<span class="text-lg text-slate-600">/month</span></div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-center text-slate-700">
                            <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            Everything in Pro
                        </li>
                        <li class="flex items-center text-slate-700">
                            <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            Custom templates
                        </li>
                        <li class="flex items-center text-slate-700">
                            <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            Dedicated support
                        </li>
                        <li class="flex items-center text-slate-700">
                            <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            API access
                        </li>
                    </ul>
                    <button class="w-full py-3 rounded-lg font-medium bg-slate-100 text-slate-800 hover:bg-slate-200 transition-all">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`
  };

  const handleSendMessage = () => {
    if (chatInput.trim() || uploadedFiles.length > 0) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: chatInput || 'Uploaded files',
        files: uploadedFiles.length > 0 ? [...uploadedFiles] : null
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      // Simulate AI response and preview generation
      setIsGenerating(true);
      
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: 'ai',
          content: generateAIResponse(chatInput)
        };
        
        setMessages(prev => [...prev, aiResponse]);
        
        // Update preview based on user input
        if (chatInput.toLowerCase().includes('landing page') || chatInput.toLowerCase().includes('homepage')) {
          setCurrentTemplate('homepage');
        } else if (chatInput.toLowerCase().includes('assessment') || chatInput.toLowerCase().includes('test')) {
          setCurrentTemplate('assessment');
        } else if (chatInput.toLowerCase().includes('dashboard') || chatInput.toLowerCase().includes('profile')) {
          setCurrentTemplate('dashboard');
        } else if (chatInput.toLowerCase().includes('pricing') || chatInput.toLowerCase().includes('plans')) {
          setCurrentTemplate('pricing');
        }
        
        setIsGenerating(false);
      }, 2000);
      
      setChatInput('');
      setUploadedFiles([]);
    }
  };

  const generateAIResponse = (input) => {
    if (input.toLowerCase().includes('landing page') || input.toLowerCase().includes('homepage')) {
      return "I'll create a modern landing page for AssessmentAI with a clean design and interactive elements. Check the preview on the right!";
    } else if (input.toLowerCase().includes('assessment') || input.toLowerCase().includes('test')) {
      return "I'll design an assessment interface with multiple question types and progress tracking. Take a look at the preview!";
    } else if (input.toLowerCase().includes('dashboard')) {
      return "I'll create a user dashboard with analytics and management features. You can see the preview updating now.";
    } else if (input.toLowerCase().includes('pricing')) {
      return "I'll build a pricing page with different plan options and feature comparisons. Check out the preview!";
    } else {
      return "I understand! I'll help you create that. Let me generate a preview for you.";
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSuggestionClick = (suggestion) => {
    setChatInput(suggestion);
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-blue-50 via-purple-50/30 to-indigo-100/40">
      {/* Profile Sidebar */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/20" onClick={() => setIsProfileOpen(false)} />
          <div className="absolute top-0 left-0 h-full w-72 bg-white shadow-2xl border-r border-slate-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Profile</h2>
                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center space-x-3 mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">John Doe</p>
                  <p className="text-sm text-slate-600">john@example.com</p>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { icon: Settings, label: 'Settings', badge: null },
                  { icon: CreditCard, label: 'Billing', badge: 'Pro' },
                  { icon: HelpCircle, label: 'Help Center', badge: null },
                  { icon: LogOut, label: 'Sign Out', badge: null }
                ].map((item, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 text-slate-600" />
                      <span className="text-slate-700">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 rounded-full text-xs">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl">
                <p className="text-sm text-slate-600 mb-2">Credits remaining</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">1/25</span>
                  <button className="text-blue-600 text-sm font-medium hover:underline">
                    Upgrade
                  </button>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full w-1/12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Left Panel - Chat Interface */}
      <div className="w-1/2 border-r border-slate-200/50 bg-white/80 backdrop-blur-sm flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center hover:opacity-90"
            >
              <User className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="font-bold text-slate-900">AssessmentAI</h1>
              <p className="text-sm text-slate-600">Create anything with AI</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isGenerating ? (
              <Pause className="w-5 h-5 text-blue-600 animate-pulse" />
            ) : (
              <MessageCircle className="w-5 h-5 text-slate-600" />
            )}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                <div>{message.content}</div>
                {message.files && (
                  <div className="mt-2 space-y-1">
                    {message.files.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm bg-white/20 rounded px-2 py-1">
                        <Paperclip className="w-3 h-3" />
                        <span className="truncate">{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isGenerating && (
            <div className="flex justify-start">
              <div className="max-w-xs px-4 py-3 rounded-2xl bg-slate-100 text-slate-800">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-slate-200/50">
          {/* File Upload Area */}
          {uploadedFiles.length > 0 && (
            <div className="mb-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-sm text-slate-600 mb-2">Uploaded files:</p>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white rounded px-3 py-2 border">
                    <div className="flex items-center space-x-2">
                      <Paperclip className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-700 truncate">{file.name}</span>
                      <span className="text-xs text-slate-500">({Math.round(file.size / 1024)}KB)</span>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex space-x-3">
            <div className="relative">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-12 h-12 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5 text-slate-600" />
              </label>
            </div>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isGenerating}
            />
            <button
              onClick={handleSendMessage}
              disabled={isGenerating}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:opacity-90 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { icon: FileText, label: "Create a landing page", action: "Create a landing page for AssessmentAI" },
              { icon: Code, label: "Build assessment", action: "Create an assessment interface" },
              { icon: Zap, label: "Design dashboard", action: "Build a user dashboard" }
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion.action)}
                className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm disabled:opacity-50"
                disabled={isGenerating}
              >
                <suggestion.icon className="w-4 h-4" />
                <span>{suggestion.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="w-1/2 flex flex-col bg-slate-50">
        {/* Preview Header */}
        <div className="p-4 border-b border-slate-200/50 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Live Preview</h2>
            <div className="flex items-center space-x-2">
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setShowCode(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${
                    !showCode
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => setShowCode(true)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${
                    showCode
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Code className="w-4 h-4" />
                  <span>Code</span>
                </button>
              </div>
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setIsMobileView(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${
                    !isMobileView
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setIsMobileView(true)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${
                    isMobileView
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 p-6 overflow-hidden">
          <div
            className={`mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
              isMobileView
                ? 'max-w-sm h-full'
                : 'w-full h-full'
            }`}
          >
            <div className="h-full overflow-y-auto">
              {showCode ? (
                <div className="p-4">
                  <pre className="text-xs bg-slate-900 text-green-400 p-4 rounded-lg overflow-auto h-full">
                    <code>{codeTemplates[currentTemplate]}</code>
                  </pre>
                </div>
              ) : (
                <iframe
                  srcDoc={codeTemplates[currentTemplate]}
                  className="w-full h-full border-0"
                  title="Live Preview"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}