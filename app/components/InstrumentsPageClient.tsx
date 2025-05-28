"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Instrument } from "../types";
import InstrumentsGrid from "./InstrumentsGrid";
import SearchBar from "./SearchBar";
import FilterTabs from "./FilterTabs";
import Pagination from "./Pagination";
import LogoWithText from "./LogoWithText";

const ITEMS_PER_PAGE = 9;

interface InstrumentsPageClientProps {
  initialInstruments: Instrument[];
}

export default function InstrumentsPageClient({
  initialInstruments,
}: InstrumentsPageClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const allCategories = initialInstruments.flatMap(
    (instrument) => instrument.categories?.map((cat) => cat.name) || []
  );
  const uniqueCategories = [...new Set(allCategories)];

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Filter initialInstruments directly
  const filteredInstruments = initialInstruments.filter((instrument) => {
    const matchesCategory =
      selectedCategory === "Todas" ||
      instrument.categories.some((cat) => cat.name === selectedCategory);
    const matchesSearchTerm =
      instrument.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instrument.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instrument.categories.some((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearchTerm;
  });

  const totalPages = Math.ceil(filteredInstruments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedInstruments = filteredInstruments.slice(startIndex, endIndex);

  const displayInstruments = paginatedInstruments;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Show loading state during hydration
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <div className="relative overflow-hidden bg-gradient-to-b from-[#EDF1FF] to-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 text-center">
            {/* Logo and Brand - Static */}
            <div className="mb-8 sm:mb-10 lg:mb-12">
              <LogoWithText logoSize="md" animated={false} />
            </div>

            {/* Static content without animations */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2C2C3F] mb-4 sm:mb-6 tracking-tight max-w-3xl mx-auto px-2">
              Explore nossa biblioteca e encontre mais de{" "}
              <span className="text-[#675ef6] font-bold">50 ferramentas</span>{" "}
              clínicas e terapêuticas
            </h1>

            {/* Loading placeholder for search */}
            <div className="px-4">
              <div className="max-w-md mx-auto h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading placeholder for content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7375fc]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="relative overflow-hidden bg-gradient-to-b from-[#EDF1FF] to-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 text-center">
          {/* Logo and Brand - Responsive with Hover */}
          <motion.div
            className="mb-8 sm:mb-10 lg:mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <LogoWithText logoSize="md" animated={true} />
          </motion.div>

          {/* Main Title - Responsive */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2C2C3F] mb-4 sm:mb-6 tracking-tight max-w-3xl mx-auto px-2"
          >
            Explore nossa biblioteca e encontre mais de{" "}
            <motion.span
              className="text-[#675ef6] font-bold cursor-default"
              whileHover={{ scale: 1.1, color: "#7375FC" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              50 ferramentas
            </motion.span>{" "}
            clínicas e terapêuticas
          </motion.h1>

          {/* Subtitle - Responsive */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm sm:text-base lg:text-lg text-[#64748B] max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-10 px-4"
          >
            São mais de <span className="font-semibold">50 ferramentas</span>{" "}
            clínicas. Navegue por categoria ou busque por nome.
          </motion.p>

          {/* Search Bar - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="px-4"
          >
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />
          </motion.div>
        </div>
      </div>

      {/* Filter Tabs - Responsive Container */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <FilterTabs
          categories={uniqueCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleFilterChange}
        />
      </motion.div>

      {/* Instruments Grid - Responsive Container and Spacing */}
      <motion.div
        id="instruments"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        {paginatedInstruments.length > 0 ? (
          <InstrumentsGrid instruments={displayInstruments} />
        ) : filteredInstruments.length === 0 &&
          (searchTerm !== "" || selectedCategory !== "Todas") ? (
          <div className="text-center py-8 sm:py-12 px-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
              Nenhum instrumento encontrado
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              Tente ajustar sua busca ou filtros.
            </p>
          </div>
        ) : initialInstruments.length === 0 ? (
          // This case now means no instruments were loaded initially from the prop
          <div className="text-center py-8 sm:py-12 px-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
              Nenhum instrumento disponível no momento.
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              Verifique mais tarde.
            </p>
          </div>
        ) : (
          // Fallback for paginatedInstruments.length === 0 but initialInstruments.length > 0 (e.g. page beyond total pages after filtering)
          <div className="text-center py-8 sm:py-12 px-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
              Nenhum instrumento para exibir nesta página.
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              Tente ir para outra página ou ajustar os filtros.
            </p>
          </div>
        )}
      </motion.div>

      {/* Pagination - Responsive Container */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </motion.div>

      {/* Footer - Responsive */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="bg-[#2C2C3F] border-t border-[#CBCBCB]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-2 sm:gap-0">
            <p className="text-xs sm:text-sm text-white cursor-default hover:text-gray-300 transition-colors duration-200">
              © 2025 Humantrack. Todos os direitos reservados
            </p>
            <p className="text-xs sm:text-sm text-white cursor-default hover:text-gray-300 transition-colors duration-200">
              💜 Feito com amor por HumanTrack
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
