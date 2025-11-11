'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface BreedSearchProps {
  onSearch: (breed: string) => void;
  loading?: boolean;
  popularBreeds?: Record<string, string>;
}

export default function BreedSearch({ onSearch, loading, popularBreeds }: BreedSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handlePopularBreedClick = (breed: string) => {
    setSearchTerm(breed);
    onSearch(breed);
  };

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter dog breed name (e.g., Golden Retriever)"
          className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !searchTerm.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>

      {popularBreeds && Object.keys(popularBreeds).length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Popular Breeds:</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(popularBreeds).map((breed) => (
              <button
                key={breed}
                onClick={() => handlePopularBreedClick(breed)}
                disabled={loading}
                className="px-4 py-2 bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 rounded-full text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {breed}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
