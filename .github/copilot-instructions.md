# PetPal Frontend - Next.js Application

This is a modern Next.js 15 application built with TypeScript and Tailwind CSS.

## Project Overview

PetPal is an AI-powered dog breed analyzer and nutrition recipe generator frontend that connects to a FastAPI backend. The application allows users to:

1. Upload dog images for breed detection
2. Search breeds by name
3. Get personalized recipe recommendations
4. Filter recipes by dietary preferences
5. Ask nutrition questions via AI chatbot

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Development Setup

### Prerequisites
- Node.js 18+ or Bun runtime
- npm, yarn, pnpm, or bun package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open http://localhost:3000

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - React components
- `src/lib/` - API client and utilities
- `public/` - Static assets

## API Integration

The frontend connects to PetPal API at `https://priaansh-petpal.hf.space`

All API calls are handled through `src/lib/api.ts` using Axios.

## Key Features

### Image Upload Component
Drag-and-drop interface for dog image uploads with preview

### Breed Search Component  
Text search with popular breeds quick access

### Recipe Cards
Displays recipes with ingredients, instructions, and nutritional information

### Dietary Options
Multi-select filters for dietary preferences (grain-free, high-protein, etc.)

### Chatbot
Interactive Q&A for breed-specific nutrition advice

## Deployment

This Next.js app can be deployed to:
- Vercel (recommended)
- Netlify
- Railway
- Any Node.js hosting platform

## Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling
- Keep components small and focused
- Use async/await for API calls
