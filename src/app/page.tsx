'use client';

import { useState, useEffect } from 'react';
import ImageUpload from '@/components/ImageUpload';
import BreedSearch from '@/components/BreedSearch';
import RecipeCard from '@/components/RecipeCard';
import Chatbot from '@/components/Chatbot';
import DietaryOptions from '@/components/DietaryOptions';
import AgeGroupSelector from '@/components/AgeGroupSelector';
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
  const [ageGroups, setAgeGroups] = useState<string[]>([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('adult');
  const [popularBreeds, setPopularBreeds] = useState<Record<string, string>>({});
  const [showChatbot, setShowChatbot] = useState(false);
  const [apiStatus, setApiStatus] = useState<string>('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Fetch dietary options and popular breeds on mount
    const fetchInitialData = async () => {
      try {
        setApiStatus('Connecting to API...');
        const [options, breeds, ages] = await Promise.all([
          petPalAPI.getDietaryOptions(),
          petPalAPI.getPopularBreeds(),
          petPalAPI.getAgeGroups(),
        ]);
        setDietaryOptions(options);
        setPopularBreeds(breeds);
        setAgeGroups(ages);
        setApiStatus('API Connected ✓');
        console.log('Initial data loaded:', { 
          dietaryOptions: options, 
          breedCount: Object.keys(breeds).length,
          ageGroups: ages 
        });
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setApiStatus('API Connection Failed ✗');
      }
    };
    fetchInitialData();
  }, []);

  const handleImageUpload = async (file: File) => {
    setSelectedFile(file);
    // Don't auto-submit, just store the file
  };

  const handleAnalyzeImage = async () => {
    if (!selectedFile) {
      alert('Please select an image first');
      return;
    }
    setLoading(true);
    try {
      const dietaryOptionsStr = selectedDietaryOptions.length > 0 
        ? selectedDietaryOptions.join(',') 
        : undefined;
      
      console.log('Analyzing image...', { 
        fileName: selectedFile.name, 
        dietaryOptions: dietaryOptionsStr,
        ageGroup: selectedAgeGroup
      });
      
      const results = await petPalAPI.predictBreedFromImage(
        selectedFile, 
        dietaryOptionsStr,
        selectedAgeGroup
      );
      
      console.log('API Response:', results);
      
      if (results && results.length > 0) {
        console.log('Setting breed result:', results[0]);
        setBreedResult(results[0]);
        setRecipes(results[0].recipes || []);
        setShowChatbot(true);
      } else {
        alert('No breed detected. Please try with a clearer dog image.');
      }
    } catch (error: any) {
      console.error('Error predicting breed from image:', error);
      const errorMsg = error.response?.data?.detail || error.message || 'Unknown error occurred';
      alert(`Error analyzing image: ${errorMsg}\n\nPlease try again with a different image.`);
    } finally {
      setLoading(false);
    }
  };

  const handleBreedSearch = async (breed: string) => {
    setLoading(true);
    try {
      const dietaryOptionsStr = selectedDietaryOptions.length > 0 
        ? selectedDietaryOptions.join(',') 
        : undefined;
      
      console.log('Searching breed:', { 
        breed, 
        dietaryOptions: dietaryOptionsStr,
        ageGroup: selectedAgeGroup
      });
      
      const result = await petPalAPI.predictBreedFromText(
        breed, 
        dietaryOptionsStr,
        selectedAgeGroup
      );
      
      console.log('API Response:', result);
      
      setBreedResult(result);
      setRecipes(result.recipes || []);
      setShowChatbot(true);
    } catch (error: any) {
      console.error('Error searching breed:', error);
      const errorMsg = error.response?.data?.detail || error.message || 'Unknown error occurred';
      alert(`Error searching breed: ${errorMsg}\n\nPlease try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMoreRecipes = async () => {
    if (!breedResult) {
      alert('Please detect a breed first');
      return;
    }
    setLoading(true);
    try {
      const dietaryOptionsStr = selectedDietaryOptions.length > 0 
        ? selectedDietaryOptions.join(',') 
        : undefined;
      
      console.log('Generating more recipes for:', breedResult.breed);
      
      const newRecipes = await petPalAPI.generateMoreRecipes(
        breedResult.breed,
        dietaryOptionsStr,
        selectedAgeGroup,
        3
      );
      
      console.log('New recipes:', newRecipes);
      
      setRecipes(newRecipes || []);
    } catch (error: any) {
      console.error('Error generating more recipes:', error);
      const errorMsg = error.response?.data?.detail || error.message || 'Unknown error occurred';
      alert(`Error generating recipes: ${errorMsg}\n\nPlease try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-indigo-50 via-white to-blue-50'
    }`}>
      {/* Header */}
      <div className={`py-8 px-4 shadow-lg transition-colors duration-300 ${
        darkMode
          ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white'
          : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Dog className="h-10 w-10" />
              <div>
                <h1 className="text-4xl font-bold">PetPal</h1>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-indigo-100'}`}>
                  AI-Powered Dog Breed Analyzer & Nutrition Recipe Generator
                </p>
              </div>
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-lg transition-all ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' 
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                </svg>
              )}
            </button>
          </div>
          {apiStatus && (
            <p className={`text-center text-xs mt-3 ${darkMode ? 'text-gray-400' : 'text-indigo-200'}`}>
              {apiStatus}
            </p>
          )}
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
                ? darkMode
                  ? 'bg-gray-700 text-white shadow-lg'
                  : 'bg-indigo-600 text-white shadow-lg'
                : darkMode
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
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
                ? darkMode
                  ? 'bg-gray-700 text-white shadow-lg'
                  : 'bg-indigo-600 text-white shadow-lg'
                : darkMode
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            🔍 Search by Breed
          </button>
        </div>

        {/* Input Section */}
        <div className={`rounded-xl shadow-lg p-6 mb-8 transition-colors ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Age Group Selector */}
          {ageGroups.length > 0 && (
            <div className="mb-6">
              <AgeGroupSelector
                ageGroups={ageGroups}
                selected={selectedAgeGroup}
                onChange={setSelectedAgeGroup}
                darkMode={darkMode}
              />
            </div>
          )}

          {/* Dietary Options */}
          {dietaryOptions.length > 0 && (
            <div className="mb-6">
              <DietaryOptions
                options={dietaryOptions}
                selected={selectedDietaryOptions}
                onChange={setSelectedDietaryOptions}
                darkMode={darkMode}
              />
            </div>
          )}

          {activeTab === 'image' ? (
            <div className="space-y-4">
              <ImageUpload 
                onImageSelect={handleImageUpload} 
                loading={loading} 
                darkMode={darkMode}
              />
              {selectedFile && !loading && !breedResult && (
                <button
                  onClick={handleAnalyzeImage}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    darkMode
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
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
              darkMode={darkMode}
            />
          )}

          {loading && (
            <div className="mt-6 text-center">
              <div className={`inline-flex flex-col items-center gap-3 px-8 py-6 rounded-lg ${
                darkMode
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-indigo-50 text-indigo-600'
              }`}>
                <RefreshCw className="h-8 w-8 animate-spin" />
                <span className="text-lg font-medium">Analyzing your image...</span>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  This may take 10-30 seconds
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {breedResult && (
          <div className="space-y-8">
            {/* Breed Info */}
            <div className={`rounded-xl shadow-lg p-6 text-white ${
              darkMode
                ? 'bg-gradient-to-r from-gray-700 to-gray-600'
                : 'bg-gradient-to-r from-indigo-500 to-blue-500'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{breedResult.breed}</h2>
                  <p className={darkMode ? 'text-gray-300' : 'text-indigo-100'}>
                    Confidence: {(breedResult.confidence * 100).toFixed(1)}%
                  </p>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-indigo-100'}`}>
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
                  <h2 className={`text-2xl font-bold flex items-center gap-2 ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    <Sparkles className={`h-6 w-6 ${darkMode ? 'text-gray-400' : 'text-indigo-600'}`} />
                    Personalized Recipes ({recipes.length})
                  </h2>
                  <button
                    onClick={handleGenerateMoreRecipes}
                    disabled={loading}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                      darkMode
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Generate More
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} darkMode={darkMode} />
                  ))}
                </div>
              </div>
            ) : (
              <div className={`text-center py-8 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  No recipes generated yet.
                </p>
                <button
                  onClick={handleGenerateMoreRecipes}
                  disabled={loading}
                  className={`mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                    darkMode
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  <Sparkles className="h-5 w-5" />
                  Generate Recipes
                </button>
              </div>
            )}

            {/* Chatbot Section */}
            {showChatbot && (
              <div>
                <Chatbot breed={breedResult.breed} darkMode={darkMode} />
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!breedResult && !loading && (
          <div className="text-center py-16">
            <Dog className={`h-24 w-24 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Ready to discover your dog's perfect meal?
            </h3>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              Upload a photo or search for a breed to get started
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className={`mt-16 py-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className={`max-w-7xl mx-auto px-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p className="mb-2">
            Powered by{' '}
            <a
              href="https://ai.google.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline ${darkMode ? 'text-gray-300' : 'text-indigo-600'}`}
            >
              Google Gemini AI
            </a>
            {' & '}
            <a
              href="https://huggingface.co/imageomics/bioclip"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline ${darkMode ? 'text-gray-300' : 'text-indigo-600'}`}
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
