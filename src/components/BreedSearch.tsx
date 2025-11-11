'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface BreedSearchProps {
  onSearch: (breed: string) => void;
  loading?: boolean;
  popularBreeds?: Record<string, string>;
  darkMode?: boolean;
}

export default function BreedSearch({ onSearch, loading, popularBreeds, darkMode = false }: BreedSearchProps) {
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
          className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:outline-none transition-colors ${
            darkMode
              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary'
          }`}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !searchTerm.trim()}
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            darkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-primary text-white hover:bg-indigo-700'
          }`}
        >
          <Search className="h-5 w-5" />
        </button>
      </form>

      {popularBreeds && Object.keys(popularBreeds).length > 0 && (
        <div>
          <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Popular Breeds:
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(popularBreeds).map((breed) => (
              <button
                key={breed}
                onClick={() => handlePopularBreedClick(breed)}
                disabled={loading}
                className={`px-4 py-2 rounded-full text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                }`}
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
