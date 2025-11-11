'use client';

interface DietaryOptionsProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function DietaryOptions({ options, selected, onChange }: DietaryOptionsProps) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((o) => o !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">Dietary Preferences (Optional):</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => toggleOption(option)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selected.includes(option)
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <p className="text-xs text-gray-500 mt-2">
          Selected: {selected.join(', ')}
        </p>
      )}
    </div>
  );
}
