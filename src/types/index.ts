export interface Event {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  petsAllowed: boolean;
  organizer: string;
  imageUrl?: string; // We will generate this on the client
}

export interface EventsResponse {
  data: Event[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
