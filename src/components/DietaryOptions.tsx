'use client';

interface DietaryOptionsProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  darkMode?: boolean;
}

export default function DietaryOptions({ options, selected, onChange, darkMode = false }: DietaryOptionsProps) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((o) => o !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="space-y-2">
      <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Dietary Preferences (Optional):
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => toggleOption(option)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selected.includes(option)
                ? darkMode
                  ? 'bg-gray-700 text-white'
                  : 'bg-indigo-500 text-white'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Selected: {selected.join(', ')}
        </p>
      )}
    </div>
  );
}
