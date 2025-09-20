"use client"
import React, { useState } from 'react';
import {
  FileText,
  Eye,
  EyeOff,
  ArrowRight,
  Mail,
  Lock,
  User,
  Check,
  AlertCircle,
  Loader,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
const MessageAlert = ({ type, message }) => (
  <div className={`mb-6 p-4 border rounded-xl flex items-center space-x-3 ${type === 'error' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
    }`}>
    {type === 'error' ?
      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" /> :
      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
    }
    <span className={`text-sm ${type === 'error' ? 'text-red-700' : 'text-green-700'}`}>{message}</span>
  </div>
);

const Navigation = () => (
  <nav className="w-full px-4 py-6 sm:px-6 lg:px-8 bg-gradient-to-r from-white/90 via-blue-50/80 to-purple-50/80 backdrop-blur-sm border-b border-slate-200/50">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <Link href="/"><span className="text-xl font-bold text-slate-800">AssessmentAI</span></Link>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-slate-600 hover:text-slate-800 px-4 py-2 rounded-lg transition-colors font-medium">
          <Link href="/">Back to Home</Link>
        </button>
        <button className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl transition-colors font-medium shadow-lg hover:shadow-xl">
          <Link href="./login">Login</Link>
        </button>
      </div>
    </div>
  </nav>
);

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      return false;
    }
    return true;
  };

  const apiCall = async (endpoint, body) => {
    const response = await fetch(`/api/auth/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Request failed');
    return data;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    try {
      await apiCall('signup', {
        name: formData.firstName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });
      setSuccess('Account created successfully! Please check your email for verification code.');
      setShowOtpVerification(true);
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    if (!otp.trim() || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setOtpLoading(true);
    setError('');
    try {
      await apiCall('verify', {
        email: formData.email.trim().toLowerCase(),
        otp: otp.trim(),
      });
      setSuccess('Email verified successfully! You can now login to your account.');
      setTimeout(() => window.location.href = '/login', 2000);
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setError('');
    try {
      await apiCall('resend', { email: formData.email.trim().toLowerCase() });
      setSuccess('New OTP sent to your email!');
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  if (showOtpVerification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-indigo-100/40">
        <Navigation />
        <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Verify Your Email</h2>
              <p className="text-xl text-slate-600 font-medium">Enter the 6-digit code sent to your email</p>
              <p className="text-sm text-slate-500 mt-2">{formData.email}</p>
            </div>

            <div className="bg-gradient-to-br from-white/90 via-blue-50/40 to-purple-50/30 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-slate-200/50">
              {error && <MessageAlert type="error" message={error} />}
              {success && <MessageAlert type="success" message={success} />}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Verification Code</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full bg-gradient-to-r from-white/95 to-blue-50/90 border border-slate-300/50 rounded-xl px-4 py-4 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 shadow-sm text-center text-2xl font-mono tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                </div>

                <button
                  onClick={handleOtpVerification}
                  disabled={otpLoading || otp.length !== 6}
                  className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${otpLoading || otp.length !== 6
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    }`}
                >
                  {otpLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify Email</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-slate-600 mb-4">Didn't receive the code?</p>
                <button
                  onClick={handleResendOTP}
                  disabled={resendLoading}
                  className="text-blue-600 hover:text-blue-700 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resendLoading ? (
                    <span className="flex items-center space-x-2">
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Resending...</span>
                    </span>
                  ) : (
                    'Resend OTP'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-indigo-100/40">
      <Navigation />

      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Join AssignmentAI</h2>
            <p className="text-xl text-slate-600 font-medium">Create your account and start generating assignments</p>
          </div>

          <div className="bg-gradient-to-br from-white/90 via-blue-50/40 to-purple-50/30 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-slate-200/50">
            {error && <MessageAlert type="error" message={error} />}
            {success && <MessageAlert type="success" message={success} />}

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full bg-gradient-to-r from-white/95 to-blue-50/90 border border-slate-300/50 rounded-xl pl-12 pr-4 py-4 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 shadow-sm"
                    placeholder="Enter your name"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-gradient-to-r from-white/95 to-blue-50/90 border border-slate-300/50 rounded-xl pl-12 pr-4 py-4 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 shadow-sm"
                    placeholder="john@example.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full bg-gradient-to-r from-white/95 to-blue-50/90 border border-slate-300/50 rounded-xl pl-12 pr-12 py-4 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 shadow-sm"
                    placeholder="Create a strong password"
                    required
                    disabled={loading}
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full bg-gradient-to-r from-white/95 to-blue-50/90 border border-slate-300/50 rounded-xl pl-12 pr-12 py-4 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 shadow-sm"
                    placeholder="Confirm your password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => setAcceptTerms(!acceptTerms)}
                  className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${acceptTerms ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300 hover:border-blue-400'
                    }`}
                  disabled={loading}
                >
                  {acceptTerms && <Check className="w-3 h-3 text-white" />}
                </button>
                <div className="text-sm text-slate-600">
                  I agree to the{' '}
                  <button className="text-blue-600 hover:text-blue-700 font-medium"><Link href="../../terms-of-services">Terms of services</Link></button>{' '}
                  and{' '}
                  <button className="text-blue-600 hover:text-blue-700 font-medium"><Link href="../../privacy-policy">Privacy Policy</Link> </button>
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                onClick={handleSubmit}
                disabled={loading || !acceptTerms}
                className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${loading || !acceptTerms
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                  }`}
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="mt-8 mb-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300/50" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 text-slate-500 font-medium">Or sign up with</span>
                </div>
              </div>
            </div>

            {/* Social Sign Up */}
            <div className="space-y-3">
              <button className="w-full bg-white hover:bg-slate-50 border border-slate-300/50 text-slate-700 font-medium py-3 px-4 rounded-xl transition-colors shadow-sm hover:shadow-md flex items-center justify-center space-x-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Sign up with Google</span>
              </button>

              <button
                onClick={() => window.location.href = 'https://github.com/apps/your-app-name/installations/new'}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-xl transition-colors shadow-sm hover:shadow-md flex items-center justify-center space-x-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor" />
                </svg>
                <span>Sign up with Github</span>
              </button>
            </div>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-slate-600">
                Already have an account?{' '}
                <button className="text-blue-600 hover:text-blue-700 font-bold">Sign in here</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}