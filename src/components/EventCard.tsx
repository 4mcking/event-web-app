import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, PawPrint } from 'lucide-react';
import { format } from 'date-fns';
import { Event } from '../types';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface EventCardProps {
  event: Event;
  className?: string;
}

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const EventCard: React.FC<EventCardProps> = ({ event, className }) => {
  return (
    <Link 
      to={`/events/${event.id}`} 
      className={cn(
        "group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100",
        className
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.imageUrl || "https://picsum.photos/400/300"} 
          alt={event.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        {event.petsAllowed && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm text-indigo-600" title="Pets Allowed">
            <PawPrint size={18} />
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {event.title}
        </h3>
        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-indigo-500" />
            <span>{format(new Date(event.date), 'PPP')}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-indigo-500" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
