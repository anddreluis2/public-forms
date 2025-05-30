"use client";

import React from "react"; // Import React for ChangeEvent type

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
}: SearchBarProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="my-8">
      <input
        type="text"
        placeholder="Busque por nome do instrumento"
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full max-w-2xl text-black mx-auto p-4 rounded-full border border-gray-300 shadow-sm cursor-text
                   focus:ring-2 focus:ring-[#7375FC] focus:border-transparent focus:outline-none
                   hover:border-[#7375FC] hover:shadow-md
                   transition-all duration-300 ease-in-out
                   placeholder:text-gray-400"
      />
    </div>
  );
}
