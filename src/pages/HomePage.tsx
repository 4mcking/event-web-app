import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchEvents } from '../lib/api';
import EventCard from '../components/EventCard';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [petsAllowed, setPetsAllowed] = useState(false);

  // Debounce search could be added here for better performance, but for mock local data it's fine.
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['events', page, search, petsAllowed],
    queryFn: () => fetchEvents(page, 2, search, petsAllowed),
    placeholderData: (previousData) => previousData, // Keep previous data while fetching new
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handleFilterChange = () => {
    setPetsAllowed(prev => !prev);
    setPage(1); // Reset to first page on new filter
  };

  return (
    <div className="space-y-8">
      {/* Hero / Header Section */}
      <div className="bg-indigo-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
            Discover Unforgettable <br className="hidden sm:block"/> Experiences.
          </h1>
          <p className="text-indigo-100 text-lg mb-8 max-w-lg">
            Find the best concerts, workshops, and gatherings happening around you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search events, locations..." 
                className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 border-none shadow-lg"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
            <button 
              onClick={handleFilterChange}
              className={cn(
                "flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shadow-lg border-2",
                petsAllowed 
                  ? "bg-white text-indigo-600 border-white" 
                  : "bg-indigo-700/50 text-white border-indigo-400/30 hover:bg-indigo-700"
              )}
            >
              <span className={cn("w-2 h-2 rounded-full", petsAllowed ? "bg-green-500" : "bg-gray-300 opacity-50")}></span>
              Pets Allowed
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white h-96 rounded-xl animate-pulse shadow-sm"></div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-white rounded-xl border border-red-100">
            <p className="text-red-500 font-medium">Something went wrong fetching events.</p>
          </div>
        ) : data?.data.length === 0 ? (
          <div className="text-center py-20">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 text-gray-400">
                <Search size={24} />
             </div>
             <h3 className="text-lg font-medium text-gray-900">No events found</h3>
             <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {data?.data.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* Pagination */}
            {data && data.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="text-sm font-medium text-gray-600 px-4">
                  Page {page} of {data.totalPages}
                </div>
                <button
                  onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                  disabled={page === data.totalPages}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
