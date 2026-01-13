import { Event, EventsResponse } from '../types';

const API_URL = "https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events";

// Helper to get consistent images based on event ID
const getImageUrl = (event: Event) => {
  const seed = event.id;
  // Specific keywords based on title/category for better images
  return `https://picsum.photos/seed/${seed}/800/600`;
};

export const fetchEvents = async (
  page: number = 1,
  limit: number = 5,
  search: string = "",
  petsAllowedOnly: boolean = false
): Promise<EventsResponse> => {
  
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  let allEvents: Event[] = await response.json();
  
  // Enrich with images
  allEvents = allEvents.map(event => ({
    ...event,
    imageUrl: getImageUrl(event)
  }));

  // Filter
  let filteredEvents = allEvents;

  if (search) {
    const lowerSearch = search.toLowerCase();
    filteredEvents = filteredEvents.filter(e => 
      e.title.toLowerCase().includes(lowerSearch) || 
      e.description.toLowerCase().includes(lowerSearch) ||
      e.location.toLowerCase().includes(lowerSearch) ||
      e.category.toLowerCase().includes(lowerSearch)
    );
  }

  if (petsAllowedOnly) {
    filteredEvents = filteredEvents.filter(e => e.petsAllowed);
  }

  // Paginate
  const total = filteredEvents.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filteredEvents.slice(start, end);

  return {
    data,
    total,
    page,
    limit,
    totalPages
  };
};

export const fetchEventById = async (id: string | number): Promise<Event | undefined> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    // If 404, might return empty or throw. 
    // my-json-server returns {} or 404. 
    return undefined;
  }
  const event: Event = await response.json();
  // Enrich
  if (event) {
    event.imageUrl = getImageUrl(event);
  }
  return event;
};
