"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = "" 
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={`mt-12 flex items-center justify-center gap-2 ${className}`}>
      <Button
        variant="outline"
        className="rounded-full border-2 border-gray-900 hover:border-red-600 hover:text-red-600 hover:bg-transparent disabled:opacity-30 disabled:border-gray-300 disabled:hover:border-gray-300 disabled:hover:text-gray-900"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            className={
              currentPage === page
                ? "rounded-full bg-red-600 text-white hover:bg-red-700 w-10 h-10 p-0"
                : "rounded-full border-2 border-gray-900 hover:border-red-600 hover:text-red-600 hover:bg-transparent w-10 h-10 p-0"
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        className="rounded-full border-2 border-gray-900 hover:border-red-600 hover:text-red-600 hover:bg-transparent disabled:opacity-30 disabled:border-gray-300 disabled:hover:border-gray-300 disabled:hover:text-gray-900"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
