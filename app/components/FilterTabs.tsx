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
          className={`px-4 py-2 text-sm font-medium rounded-full border cursor-pointer
                      transition-all duration-200 ease-in-out
                      transform hover:scale-105 active:scale-95
                      ${
                        tab === selectedCategory
                          ? "bg-[#7375FC] text-white border-[#7375FC] shadow-lg"
                          : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:border-gray-400 hover:shadow-md"
                      }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
