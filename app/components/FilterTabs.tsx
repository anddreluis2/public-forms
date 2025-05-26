"use client";

interface FilterTabsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function FilterTabs({
  categories,
  selectedCategory,
  onSelectCategory,
}: FilterTabsProps) {
  const allTabs = ["Todas", ...categories]; // Ensure "Todas" is always an option

  return (
    <div className="my-8 flex flex-wrap justify-center gap-2 px-4">
      {allTabs.map((tab, index) => (
        <button
          key={index} // Using index as key is fine here as tab order is static
          onClick={() => onSelectCategory(tab)}
          className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors
            ${
              tab === selectedCategory
                ? "bg-[#7375FC] text-white border-[#7375FC]"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
