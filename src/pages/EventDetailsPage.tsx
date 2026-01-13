import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchEventById } from '../lib/api';
import { Calendar, MapPin, User, ArrowLeft, PawPrint, Share2 } from 'lucide-react';
import { format } from 'date-fns';

const EventDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: event, isLoading, isError } = useQuery({
    queryKey: ['event', id],
    queryFn: () => fetchEventById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="animate-pulse flex flex-col gap-8 max-w-4xl mx-auto">
        <div className="h-8 w-32 bg-gray-200 rounded-lg"></div>
        <div className="h-64 sm:h-96 bg-gray-200 rounded-2xl"></div>
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-gray-200 rounded-lg"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Event not found</h2>
        <Link to="/" className="text-indigo-600 hover:underline">Return to home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors">
        <ArrowLeft size={16} className="mr-1" />
        Back to events
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="relative h-64 sm:h-96">
          <img 
            src={event.imageUrl || "https://picsum.photos/800/600"} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
             {event.petsAllowed && (
              <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-indigo-700 text-sm font-medium flex items-center gap-1.5 shadow-sm">
                <PawPrint size={16} />
                Pets Allowed
              </div>
            )}
             <button className="bg-white/90 backdrop-blur-md p-2 rounded-full text-gray-700 hover:text-indigo-600 shadow-sm transition-colors">
                <Share2 size={18} />
             </button>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
               <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>
               <div className="flex flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <Calendar size={18} className="text-indigo-500" />
                    <span className="font-medium">{format(new Date(event.date), 'PPPP')}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <MapPin size={18} className="text-indigo-500" />
                    <span className="font-medium">{event.location}</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="prose prose-indigo max-w-none text-gray-600 mb-8">
            <p className="text-lg leading-relaxed">{event.description}</p>
          </div>

          <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <User size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Organizer</p>
                <p className="font-medium text-gray-900">{event.organizer}</p>
              </div>
            </div>
            
            <button className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
              Get Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
