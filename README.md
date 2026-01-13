# Event Spot - Event Showcase App

A modern, responsive web application built with React, TypeScript, and Tailwind CSS to showcase events.

## Features

- 📋 **Event Listing**: Browse a curated list of events.
- 🔍 **Search**: Real-time filtering by title, description, location, or category.
- 🐾 **Pet Friendly Filter**: Easily find events that welcome pets.
- 📄 **Pagination**: Navigate through events with ease.
- 📱 **Responsive Design**: Beautiful interface that works on all devices.
- 🖼️ **Dynamic Images**: High-quality placeholder images generated for each event.

## Tech Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router v7
- **Icons**: Lucide React
- **API**: Custom integration with [JSON Server](https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/4mcking/event-web-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd event-web-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

## Project Structure

```
src/
├── components/   # Reusable UI components (EventCard, Layout)
├── lib/          # API services and utilities
├── pages/        # Page components (HomePage, EventDetailsPage)
├── types/        # TypeScript definitions
└── App.tsx       # Main application component & Routing
```
