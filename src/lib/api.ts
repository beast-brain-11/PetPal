import axios from 'axios';

const API_BASE_URL = 'https://priaansh-petpal.hf.space';

export interface NutritionInfo {
  calories: number | null;
  protein: number | null;
  fat: number | null;
  carbs: number | null;
  micronutrients: string | null;
}

export interface RecipeCard {
  title: string;
  tags: string[];
  ingredients: string;
  instructions: string;
  nutrition: NutritionInfo;
}

export interface BreedResult {
  breed: string;
  species: string;
  confidence: number;
  recipes: RecipeCard[];
}

export interface ChatbotResponse {
  answer: string;
}

export const petPalAPI = {
  /**
   * Upload a dog image and get breed identification with recipes
   */
  async predictBreedFromImage(
    file: File,
    dietaryOptions?: string
  ): Promise<BreedResult[]> {
    const formData = new FormData();
    formData.append('file', file);
    if (dietaryOptions) {
      formData.append('dietary_options', dietaryOptions);
    }

    const response = await axios.post(
      `${API_BASE_URL}/predict_dog_breed_image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  /**
   * Enter a dog breed name and get recipes tailored for that breed
   */
  async predictBreedFromText(
    breed: string,
    dietaryOptions?: string
  ): Promise<BreedResult> {
    const formData = new URLSearchParams();
    formData.append('breed', breed);
    if (dietaryOptions) {
      formData.append('dietary_options', dietaryOptions);
    }

    const response = await axios.post(
      `${API_BASE_URL}/predict_dog_breed_text`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  },

  /**
   * Get recipes for a specific dog breed
   */
  async getRecipes(
    breed: string,
    dietaryOptions?: string,
    count: number = 3
  ): Promise<RecipeCard[]> {
    const formData = new URLSearchParams();
    formData.append('breed', breed);
    if (dietaryOptions) {
      formData.append('dietary_options', dietaryOptions);
    }
    formData.append('count', count.toString());

    const response = await axios.post(
      `${API_BASE_URL}/get_recipes`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  },

  /**
   * Generate more recipes for the same breed (fresh generation)
   */
  async generateMoreRecipes(
    breed: string,
    dietaryOptions?: string,
    count: number = 3
  ): Promise<RecipeCard[]> {
    const formData = new URLSearchParams();
    formData.append('breed', breed);
    if (dietaryOptions) {
      formData.append('dietary_options', dietaryOptions);
    }
    formData.append('count', count.toString());

    const response = await axios.post(
      `${API_BASE_URL}/generate_more_recipes`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  },

  /**
   * Ask breed-specific nutrition/diet questions
   */
  async askChatbot(breed: string, question: string): Promise<ChatbotResponse> {
    const response = await axios.post(
      `${API_BASE_URL}/chatbot`,
      {
        breed,
        question,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  },

  /**
   * Get list of available dietary options
   */
  async getDietaryOptions(): Promise<string[]> {
    const response = await axios.get(`${API_BASE_URL}/dietary_options`);
    return response.data;
  },

  /**
   * Get list of popular dog breeds with descriptions
   */
  async getPopularBreeds(): Promise<Record<string, string>> {
    const response = await axios.get(`${API_BASE_URL}/popular_breeds`);
    return response.data;
  },

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<any> {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data;
  },
};
