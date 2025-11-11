'use client';

import { RecipeCard as RecipeCardType } from '@/lib/api';
import { ChefHat, Utensils, Info } from 'lucide-react';

interface RecipeCardProps {
  recipe: RecipeCardType;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-4">
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
          <h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
            <Utensils className="h-4 w-4 text-indigo-500" />
            Ingredients
          </h4>
          <div className="text-sm text-gray-600 whitespace-pre-line bg-gray-50 p-3 rounded-lg">
            {recipe.ingredients}
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
            <Info className="h-4 w-4 text-indigo-500" />
            Instructions
          </h4>
          <div className="text-sm text-gray-600 whitespace-pre-line bg-gray-50 p-3 rounded-lg">
            {recipe.instructions}
          </div>
        </div>

        {/* Nutrition Info */}
        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-800 mb-3">Nutritional Information</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {recipe.nutrition.calories !== null && (
              <div className="bg-amber-50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-amber-600">{recipe.nutrition.calories}</p>
                <p className="text-xs text-gray-600">Calories</p>
              </div>
            )}
            {recipe.nutrition.protein !== null && (
              <div className="bg-red-50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-red-600">{recipe.nutrition.protein}g</p>
                <p className="text-xs text-gray-600">Protein</p>
              </div>
            )}
            {recipe.nutrition.fat !== null && (
              <div className="bg-yellow-50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-yellow-600">{recipe.nutrition.fat}g</p>
                <p className="text-xs text-gray-600">Fat</p>
              </div>
            )}
            {recipe.nutrition.carbs !== null && (
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">{recipe.nutrition.carbs}g</p>
                <p className="text-xs text-gray-600">Carbs</p>
              </div>
            )}
          </div>
          {recipe.nutrition.micronutrients && (
            <div className="mt-3 bg-purple-50 p-3 rounded-lg">
              <p className="text-xs font-medium text-purple-900">Micronutrients:</p>
              <p className="text-xs text-purple-700 mt-1">{recipe.nutrition.micronutrients}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
