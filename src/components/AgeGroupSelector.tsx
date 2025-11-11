'use client';

interface AgeGroupSelectorProps {
  ageGroups: string[];
  selected: string;
  onChange: (ageGroup: string) => void;
  darkMode?: boolean;
}

export default function AgeGroupSelector({ ageGroups, selected, onChange, darkMode = false }: AgeGroupSelectorProps) {
  const ageGroupIcons: Record<string, string> = {
    puppyhood: '🐶',
    adult: '🐕',
    senior: '🦮',
  };

  const ageGroupLabels: Record<string, string> = {
    puppyhood: 'Puppy',
    adult: 'Adult',
    senior: 'Senior',
  };

  return (
    <div className="space-y-2">
      <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Dog Age Group:
      </p>
      <div className="flex gap-3">
        {ageGroups.map((ageGroup) => (
          <button
            key={ageGroup}
            onClick={() => onChange(ageGroup)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selected === ageGroup
                ? darkMode
                  ? 'bg-gray-700 text-white shadow-md scale-105'
                  : 'bg-indigo-500 text-white shadow-md scale-105'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="text-lg">{ageGroupIcons[ageGroup] || '🐕'}</span>
            <span>{ageGroupLabels[ageGroup] || ageGroup}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
