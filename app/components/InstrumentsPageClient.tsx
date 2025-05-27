"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Instrument } from "../types";
import InstrumentsGrid from "./InstrumentsGrid";
import SearchBar from "./SearchBar";
import FilterTabs from "./FilterTabs";
import Pagination from "./Pagination";
import { IconOnly } from "./Logo";

const ITEMS_PER_PAGE = 6;

interface InstrumentsPageClientProps {
  initialInstruments: Instrument[];
  error?: string | null; // To pass potential server-side fetch errors
}

export default function InstrumentsPageClient({
  initialInstruments,
  error: initialError,
}: InstrumentsPageClientProps) {
  // Initialize instruments state with server-fetched data or an empty array if error
  const [instruments, setInstruments] = useState<Instrument[]>(
    initialError ? [] : initialInstruments
  );
  // isLoading state is removed as initial load is handled by server component / Suspense
  // error state for client-side errors or to display server-side error
  const [error, setError] = useState<string | null>(initialError || null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1);

  // If initialInstruments change (e.g. parent re-fetches), update state.
  // This might be useful if the parent Server Component has revalidation.
  useEffect(() => {
    if (!initialError) {
      setInstruments(initialInstruments);
      setError(null); // Clear previous errors if new initial data is good
    } else {
      setInstruments([]); // Clear instruments if there was an error fetching initial data
      setError(initialError);
    }
  }, [initialInstruments, initialError]);

  // Derive unique categories for FilterTabs from instruments state
  const allCategories = instruments.flatMap((instrument) =>
    instrument.categories.map((cat) => cat.name)
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

  const filteredInstruments = instruments.filter((instrument) => {
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

  if (error && !initialInstruments.length) {
    // Only show full page error if no initial instruments were loaded
    return (
      <div className="text-center py-20 min-h-screen bg-[#F8FAFC]">
        <h3 className="text-2xl font-semibold text-red-600 mb-2">
          Erro ao carregar instrumentos
        </h3>
        <p className="text-gray-500">{error}</p>
        <p className="text-gray-500 mt-4">
          Ocorreu um problema ao buscar os dados iniciais no servidor.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="relative overflow-hidden bg-gradient-to-b from-[#EDF1FF] to-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-4 lg:py-8 text-center">
          <div className="mb-12 flex justify-center items-center space-x-3 sm:space-x-4">
            <IconOnly className="h-24 w-24 sm:h-24 sm:w-24" />
            <div className="text-left">
              <p className="text-sm sm:text-base text-black leading-tight">
                Biblioteca de
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2C3F] leading-tight -mt-1">
                instrumentos
              </h1>
              <p className="text-xs sm:text-sm text-black leading-tight">
                by human<span className="font-bold">track</span>
              </p>
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-[#2C2C3F] mb-6 tracking-tight max-w-3xl mx-auto"
          >
            Explore nossa biblioteca e encontre mais de{" "}
            <span className="text-[#675ef6] font-bold">50 ferramentas</span>{" "}
            clínicas e terapêuticas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-[#64748B] max-w-2xl mx-auto mb-10"
          >
            São mais de <span>50 ferramentas</span> clínicas. Navegue por
            categoria ou busque por nome.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FilterTabs
          categories={uniqueCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleFilterChange}
        />
      </div>

      <div
        id="instruments"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        {/* Updated conditional rendering logic */}
        {
          filteredInstruments.length === 0 &&
          (searchTerm !== "" || selectedCategory !== "Todas") ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                Nenhum instrumento encontrado
              </h3>
              <p className="text-gray-500">
                Tente ajustar sua busca ou filtros.
              </p>
            </div>
          ) : paginatedInstruments.length === 0 && instruments.length > 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                Nenhum instrumento para exibir nesta página.
              </h3>
              <p className="text-gray-500">
                Tente ir para outra página ou ajustar os filtros.
              </p>
            </div>
          ) : paginatedInstruments.length > 0 ? (
            <InstrumentsGrid instruments={displayInstruments} />
          ) : instruments.length === 0 && !error ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                Nenhum instrumento disponível no momento.
              </h3>
              <p className="text-gray-500">
                Verifique mais tarde ou contate o suporte.
              </p>
            </div>
          ) : null // Removed isLoading condition, error is handled above, or covered by other conditions
        }
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-[#2C2C3F] border-t border-[#CBCBCB]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <p className="text-sm text-white mb-2 sm:mb-0">
              © 2025 Humantrack. Todos os direitos reservados
            </p>
            <p className="text-sm text-white">
              💜 Feito com amor por HumanTrack
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
