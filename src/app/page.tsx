'use client';

import { useState, useEffect } from 'react';
import ImageUpload from '@/components/ImageUpload';
import BreedSearch from '@/components/BreedSearch';
import RecipeCard from '@/components/RecipeCard';
import Chatbot from '@/components/Chatbot';
import DietaryOptions from '@/components/DietaryOptions';
import { petPalAPI, BreedResult, RecipeCard as RecipeCardType } from '@/lib/api';
import { Dog, RefreshCw, Sparkles } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'image' | 'text'>('image');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [breedResult, setBreedResult] = useState<BreedResult | null>(null);
  const [recipes, setRecipes] = useState<RecipeCardType[]>([]);
  const [dietaryOptions, setDietaryOptions] = useState<string[]>([]);
  const [selectedDietaryOptions, setSelectedDietaryOptions] = useState<string[]>([]);
  const [popularBreeds, setPopularBreeds] = useState<Record<string, string>>({});
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    // Fetch dietary options and popular breeds on mount
    const fetchInitialData = async () => {
      try {
        const [options, breeds] = await Promise.all([
          petPalAPI.getDietaryOptions(),
          petPalAPI.getPopularBreeds(),
        ]);
        setDietaryOptions(options);
        setPopularBreeds(breeds);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchInitialData();
  }, []);

  const handleImageUpload = async (file: File) => {
    setSelectedFile(file);
    // Don't auto-submit, just store the file
  };

  const handleAnalyzeImage = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const dietaryOptionsStr = selectedDietaryOptions.join(',');
      const results = await petPalAPI.predictBreedFromImage(selectedFile, dietaryOptionsStr);
      if (results && results.length > 0) {
        setBreedResult(results[0]);
        setRecipes(results[0].recipes);
        setShowChatbot(true);
      }
    } catch (error) {
      console.error('Error predicting breed from image:', error);
      alert('Error analyzing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBreedSearch = async (breed: string) => {
    setLoading(true);
    try {
      const dietaryOptionsStr = selectedDietaryOptions.join(',');
      const result = await petPalAPI.predictBreedFromText(breed, dietaryOptionsStr);
      setBreedResult(result);
      setRecipes(result.recipes);
      setShowChatbot(true);
    } catch (error) {
      console.error('Error searching breed:', error);
      alert('Error searching breed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMoreRecipes = async () => {
    if (!breedResult) return;
    setLoading(true);
    try {
      const dietaryOptionsStr = selectedDietaryOptions.join(',');
      const newRecipes = await petPalAPI.generateMoreRecipes(
        breedResult.breed,
        dietaryOptionsStr,
        3
      );
      setRecipes(newRecipes);
    } catch (error) {
      console.error('Error generating more recipes:', error);
      alert('Error generating recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-8 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Dog className="h-10 w-10" />
            <h1 className="text-4xl font-bold">PetPal</h1>
          </div>
          <p className="text-center text-indigo-100 text-lg">
            AI-Powered Dog Breed Analyzer & Nutrition Recipe Generator
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => {
              setActiveTab('image');
              setSelectedFile(null);
              setBreedResult(null);
              setRecipes([]);
              setShowChatbot(false);
            }}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'image'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📸 Upload Image
          </button>
          <button
            onClick={() => {
              setActiveTab('text');
              setSelectedFile(null);
              setBreedResult(null);
              setRecipes([]);
              setShowChatbot(false);
            }}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'text'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            🔍 Search by Breed
          </button>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Dietary Options */}
          {dietaryOptions.length > 0 && (
            <div className="mb-6">
              <DietaryOptions
                options={dietaryOptions}
                selected={selectedDietaryOptions}
                onChange={setSelectedDietaryOptions}
              />
            </div>
          )}

          {activeTab === 'image' ? (
            <div className="space-y-4">
              <ImageUpload onImageSelect={handleImageUpload} loading={loading} />
              {selectedFile && !loading && !breedResult && (
                <button
                  onClick={handleAnalyzeImage}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-5 w-5" />
                  Analyze Image & Generate Recipes
                </button>
              )}
            </div>
          ) : (
            <BreedSearch
              onSearch={handleBreedSearch}
              loading={loading}
              popularBreeds={popularBreeds}
            />
          )}

          {loading && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 text-indigo-600">
                <RefreshCw className="h-5 w-5 animate-spin" />
                <span>Analyzing...</span>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {breedResult && (
          <div className="space-y-8">
            {/* Breed Info */}
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{breedResult.breed}</h2>
                  <p className="text-indigo-100">
                    Confidence: {(breedResult.confidence * 100).toFixed(1)}%
                  </p>
                  <p className="text-indigo-100 text-sm mt-1">
                    Species: {breedResult.species}
                  </p>
                </div>
                <Dog className="h-16 w-16 opacity-50" />
              </div>
            </div>

            {/* Recipes Section */}
            {recipes.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-indigo-600" />
                    Personalized Recipes ({recipes.length})
                  </h2>
                  <button
                    onClick={handleGenerateMoreRecipes}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Generate More
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No recipes generated yet.</p>
                <button
                  onClick={handleGenerateMoreRecipes}
                  disabled={loading}
                  className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Sparkles className="h-5 w-5" />
                  Generate Recipes
                </button>
              </div>
            )}

            {/* Chatbot Section */}
            {showChatbot && (
              <div>
                <Chatbot breed={breedResult.breed} />
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!breedResult && !loading && (
          <div className="text-center py-16">
            <Dog className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Ready to discover your dog's perfect meal?
            </h3>
            <p className="text-gray-500">
              Upload a photo or search for a breed to get started
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p className="mb-2">
            Powered by{' '}
            <a
              href="https://ai.google.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Google Gemini AI
            </a>
            {' & '}
            <a
              href="https://huggingface.co/imageomics/bioclip"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              BioCLIP
            </a>
          </p>
          <p className="text-sm">Made with ❤️ for dogs and their humans</p>
        </div>
      </footer>
    </main>
  );
}
