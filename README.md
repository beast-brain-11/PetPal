# 🐕 PetPal Frontend

A clean, minimal Next.js frontend for the PetPal API - an AI-powered dog breed analyzer and nutrition recipe generator.

## Features

✨ **Image-Based Breed Detection** - Upload a dog photo and instantly identify the breed using BioCLIP neural networks

🔍 **Text-Based Search** - Search by breed name to get instant recipe recommendations

🐶 **Age-Appropriate Recipes** - Select dog age group (Puppy, Adult, Senior) for tailored nutrition recommendations

🍖 **Personalized Recipes** - Generate breed-specific healthy dog food recipes with detailed nutritional information

🥗 **Dietary Preferences** - Filter recipes by 8+ dietary options (grain-free, high-protein, vegan, etc.)

💬 **Nutrition Chatbot** - Ask breed-specific diet and health questions with AI-powered answers

📊 **Nutrition Breakdown** - Complete information on calories, protein, fat, carbs, and micronutrients

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Axios** - API communication
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd petpal-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Backend

This frontend connects to the PetPal API hosted at:
- **Base URL**: `https://priaansh-petpal.hf.space`
- **Documentation**: [https://priaansh-petpal.hf.space/docs](https://priaansh-petpal.hf.space/docs)
- **OpenAPI Spec**: [https://priaansh-petpal.hf.space/openapi.json](https://priaansh-petpal.hf.space/openapi.json)

## Project Structure

```
petpal-frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── ImageUpload.tsx  # Image upload component
│   │   ├── BreedSearch.tsx  # Breed search component
│   │   ├── RecipeCard.tsx   # Recipe display component
│   │   ├── Chatbot.tsx      # Nutrition chatbot component
│   │   └── DietaryOptions.tsx # Dietary filter component
│   └── lib/
│       └── api.ts           # API service layer
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints Used

### Breed Detection
- `POST /predict_dog_breed_image` - Upload image for breed detection
- `POST /predict_dog_breed_text` - Search by breed name

### Recipe Management
- `POST /get_recipes` - Get recipes for a breed
- `POST /generate_more_recipes` - Generate fresh recipes

### Chatbot & Utilities
- `POST /chatbot` - Ask nutrition questions
- `GET /dietary_options` - Get available dietary filters
- `GET /age_groups` - Get available age groups (puppyhood, adult, senior)
- `GET /popular_breeds` - Get popular breed list
- `GET /health` - API health check

## Age Groups

The app supports age-specific nutrition recommendations:

- **🐶 Puppyhood** - Recipes for growing puppies with higher protein and calcium
- **🐕 Adult** - Balanced nutrition for adult dogs (default)
- **🦮 Senior** - Recipes for older dogs with joint support and easier digestion

## Dietary Options

The app supports the following dietary preferences:

- **grain-free** - No grains (wheat, oats, rice)
- **high-protein** - High protein content for active dogs
- **low-fat** - Reduced fat for weight management
- **low-carb** - Reduced carbohydrates
- **allergy-friendly** - Hypoallergenic ingredients
- **veg** - Vegetarian recipes
- **vegan** - Fully plant-based
- **non-veg** - Traditional meat-based

## Features in Detail

### Image Upload
- Drag-and-drop support
- Image preview
- Age group selection for appropriate recipes
- Instant breed detection with confidence score
- Automatic recipe generation

### Breed Search
- Text-based search
- Popular breeds quick access
- Age group selection
- Real-time results
- Dietary preference filtering

### Recipe Cards
- Beautiful card design
- Detailed ingredients list
- Step-by-step instructions
- Complete nutritional breakdown
- Dietary tags

### Nutrition Chatbot
- Breed-specific advice
- Interactive Q&A
- AI-powered responses
- Conversation history

## Customization

### Changing the API URL

Edit `src/lib/api.ts`:
```typescript
const API_BASE_URL = 'https://your-api-url.com';
```

### Styling

The app uses Tailwind CSS. Customize colors in `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#6366f1', // Change primary color
      secondary: '#3b82f6', // Change secondary color
    },
  },
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with one click

### Other Platforms

The app can be deployed to:
- Netlify
- Railway
- Render
- Any Node.js hosting platform

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- API powered by [Google Gemini AI](https://ai.google.dev/)
- Breed detection by [BioCLIP](https://huggingface.co/imageomics/bioclip)
- Icons by [Lucide](https://lucide.dev/)

---

Made with ❤️ for dogs and their humans
