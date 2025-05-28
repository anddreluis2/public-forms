"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page or less
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Create page numbers array (e.g., [1, 2, 3, ..., 10])
  // Simple version: show all page numbers. Can be enhanced for many pages.
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-2 my-12">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out
                    transform active:scale-95
          ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 border border-gray-300 cursor-pointer hover:bg-gray-100 hover:border-gray-400 hover:shadow-md hover:scale-105"
          }`}
      >
        Anterior
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={currentPage === pageNumber}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out
                      transform active:scale-95
          ${
            currentPage === pageNumber
              ? "bg-[#7375FC] text-white border-[#7375FC] shadow-lg cursor-default"
              : "bg-white text-gray-700 border border-gray-300 cursor-pointer hover:bg-gray-100 hover:border-gray-400 hover:shadow-md hover:scale-105"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out
                    transform active:scale-95
          ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 border border-gray-300 cursor-pointer hover:bg-gray-100 hover:border-gray-400 hover:shadow-md hover:scale-105"
          }`}
      >
        Próximo
      </button>
    </div>
  );
}
