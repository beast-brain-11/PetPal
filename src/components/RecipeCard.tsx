'use client';

import { RecipeCard as RecipeCardType } from '@/lib/api';
import { ChefHat, Utensils, Info } from 'lucide-react';

interface RecipeCardProps {
  recipe: RecipeCardType;
  darkMode?: boolean;
}

export default function RecipeCard({ recipe, darkMode = false }: RecipeCardProps) {
  return (
    <div className={`rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      {/* Header */}
      <div className={`p-4 ${
        darkMode 
          ? 'bg-gradient-to-r from-gray-700 to-gray-600' 
          : 'bg-gradient-to-r from-indigo-500 to-blue-500'
      }`}>
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <ChefHat className="h-5 w-5" />
          {recipe.title}
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {recipe.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Ingredients */}
        <div>
          <h4 className={`font-semibold flex items-center gap-2 mb-2 ${
            darkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            <Utensils className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-indigo-500'}`} />
            Ingredients
          </h4>
          <div className={`text-sm whitespace-pre-line p-3 rounded-lg ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'
          }`}>
            {recipe.ingredients}
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h4 className={`font-semibold flex items-center gap-2 mb-2 ${
            darkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            <Info className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-indigo-500'}`} />
            Instructions
          </h4>
          <div className={`text-sm whitespace-pre-line p-3 rounded-lg ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'
          }`}>
            {recipe.instructions}
          </div>
        </div>

        {/* Nutrition Info */}
        <div className={`border-t pt-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h4 className={`font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Nutritional Information
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {recipe.nutrition.calories !== null && (
              <div className={`p-3 rounded-lg text-center ${
                darkMode ? 'bg-gray-700' : 'bg-amber-50'
              }`}>
                <p className={`text-2xl font-bold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                  {recipe.nutrition.calories}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Calories</p>
              </div>
            )}
            {recipe.nutrition.protein !== null && (
              <div className={`p-3 rounded-lg text-center ${
                darkMode ? 'bg-gray-700' : 'bg-red-50'
              }`}>
                <p className={`text-2xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                  {recipe.nutrition.protein}g
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Protein</p>
              </div>
            )}
            {recipe.nutrition.fat !== null && (
              <div className={`p-3 rounded-lg text-center ${
                darkMode ? 'bg-gray-700' : 'bg-yellow-50'
              }`}>
                <p className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  {recipe.nutrition.fat}g
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fat</p>
              </div>
            )}
            {recipe.nutrition.carbs !== null && (
              <div className={`p-3 rounded-lg text-center ${
                darkMode ? 'bg-gray-700' : 'bg-green-50'
              }`}>
                <p className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {recipe.nutrition.carbs}g
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Carbs</p>
              </div>
            )}
          </div>
          {recipe.nutrition.micronutrients && (
            <div className={`mt-3 p-3 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-purple-50'
            }`}>
              <p className={`text-xs font-medium ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>
                Micronutrients:
              </p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                {recipe.nutrition.micronutrients}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
