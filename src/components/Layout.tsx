import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-indigo-600 hover:opacity-80 transition-opacity">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
              <Sparkles size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">Event<span className="text-indigo-600">Spot</span></span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
              Discover
            </Link>
            <button className="text-sm font-medium text-gray-400 cursor-not-allowed">
              My Tickets
            </button>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs ring-2 ring-white shadow-sm">
              JD
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
          <p>© 2026 EventSpot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
