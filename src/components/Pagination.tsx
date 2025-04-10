"use client";

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 rounded-lg mr-2 disabled:opacity-50 cursor-pointer"
      >
        Prev
      </button>

      {/* Numeracja stron */}
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === index + 1 ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 rounded-lg ml-2 disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
