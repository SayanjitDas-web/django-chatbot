import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">Chatbot</div>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 text-white hover:text-indigo-200 transition-colors font-medium"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 bg-white text-indigo-900 rounded-lg hover:bg-indigo-100 transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Animated Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 animate-fade-in-up">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-violet-500 animate-gradient">
              Intelligent Conversations
            </span>
            <br />
            <span className="text-white">at Your Fingertips</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-300">
            Experience the power of AI with our advanced chatbot. Get instant, intelligent responses
            to your questions, powered by cutting-edge technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-up animation-delay-500">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-600 text-white rounded-lg font-semibold text-lg hover:from-pink-600 hover:to-violet-700 transition-all shadow-2xl hover:shadow-pink-500/50 transform hover:-translate-y-1 hover:scale-105"
            >
              Start Chatting Now
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all transform hover:-translate-y-1"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 px-4 pb-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {/* Feature 1 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all transform hover:-translate-y-2 animate-fade-in-up animation-delay-700">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-white mb-2">AI-Powered</h3>
            <p className="text-indigo-100">
              Powered by advanced AI technology for intelligent and contextual responses.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all transform hover:-translate-y-2 animate-fade-in-up animation-delay-900">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-white mb-2">Real-time Chat</h3>
            <p className="text-indigo-100">
              Instant responses with smooth, real-time conversation experience.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all transform hover:-translate-y-2 animate-fade-in-up animation-delay-1100">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-white mb-2">Markdown Support</h3>
            <p className="text-indigo-100">
              Beautiful formatting with markdown rendering for code, lists, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
