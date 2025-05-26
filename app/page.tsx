"use client";

import { motion } from "framer-motion";
import { FigmaInstrument } from "./types"; // Assuming types.ts is in the same app directory for now, will adjust if components are moved deeper
import { useState } from "react"; // useEffect removed

// Import newly created components
import InstrumentsLoading from "./components/InstrumentsLoading";
import InstrumentsGrid from "./components/InstrumentsGrid";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import Pagination from "./components/Pagination";
import { IconOnly } from "./components/Logo";
// InstrumentCard is used by InstrumentsGrid, so it doesn't need to be imported here directly if InstrumentsGrid handles it.

// ApiInstrument interface is no longer needed if we only use mock data
/*
interface ApiInstrument {
  id: string;
  title: string;
  acronym: string;
  category: string;
  description: string;
  metadata: {
    author: string;
    year: string;
    reference: string;
    purpose: string;
    targetPopulation: string;
    reliability: string;
    validity: string;
    scoring: string;
  };
}
*/

// export const metadata: Metadata = {
//   // Note: static metadata in client components has limitations. Consider moving to layout.tsx if possible.
//   title: "Biblioteca de Instrumentos | HumanTrack",
//   description:
//     "Explore nossa biblioteca e encontre mais de 50 ferramentas clínicas e terapêuticas. Navegue por categoria ou busque por nome.",
//   keywords:
//     "instrumentos clínicos, avaliação psicológica, GAD-7, PHQ-9, ansiedade, depressão, burnout, TDAH, autismo, psicométricos, escalas, questionários",
//   openGraph: {
//     title: "Biblioteca de Instrumentos | HumanTrack",
//     description:
//       "Explore nossa biblioteca e encontre mais de 50 ferramentas clínicas e terapêuticas.",
//     type: "website",
//     locale: "pt_BR",
//     siteName: "HumanTrack Instrumentos",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Biblioteca de Instrumentos | HumanTrack",
//     description:
//       "Explore nossa vasta coleção de instrumentos clínicos validados.",
//   },
//   alternates: {
//     canonical: "https://humantrack.com/instrumentos",
//   },
// };

// REMOVED: async function getInstruments()
/*
async function getInstruments(): Promise<ApiInstrument[]> { 
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/instruments`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch instruments");
  }

  return res.json();
}
*/

// Updated InstrumentCard to match Figma design

// MockInstrumentCard is removed as per the direction to use FigmaInstrument structure for all cards.
/*
function MockInstrumentCard({
// ... 
}) {
  // ...
}
*/

// MODIFIED: Home component is no longer async and uses only mock data
const ITEMS_PER_PAGE = 6; // Define items per page

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1); // Add currentPage state

  const mockFigmaInstruments: FigmaInstrument[] = [
    {
      id: "mock-tag",
      title: "Entrevista para Transtorno de Ansiedade Generalizada (TAG)",
      description:
        "A Entrevista para Transtorno de Ansiedade Generalizada é um instrumento de avaliação projetado para identificar sintomas relacionados ao TAG, pois oferece suporte e direcionamento em processos de acolhimento e direcionamento para avaliação diagnóstica formal.",
      categories: [
        { name: "Ansiedade", color: "#712B2B", backgroundColor: "#FAE6E6" }, // Colors from Figma
        {
          name: "Avaliação do Clínico",
          color: "#094871",
          backgroundColor: "#DFF1FF",
        },
      ],
      creationDate: "16/10/2024",
      href: "/forms/tag-example",
    },
    {
      id: "mock-asrs",
      title: "Adult ADHD Self-Report Scale (ASRS-18)",
      description:
        "A Adult Self-Report Scale (ASRS-18) é um questionário de auto-relato desenvolvido para triagem de sintomas de Transtorno do Déficit de Atenção/Hiperatividade (TDAH) em adultos.",
      categories: [
        { name: "TDAH", color: "#3F2D85", backgroundColor: "#E6E6FA" }, // Colors from Figma
        { name: "Diagnóstico", color: "#094871", backgroundColor: "#DFF1FF" },
      ],
      creationDate: "10/11/2024",
      href: "/forms/asrs-example",
    },
    {
      id: "mock-audit",
      title: "Alcohol Use Disorder Identification Test (AUDIT)",
      description:
        "O AUDIT (Alcohol Use Disorder Identification Test) é um instrumento de rastreio desenvolvido pela Organização Mundial da Saúde (OMS) para identificar padrões de consumo de álcool potencialmente prejudiciais.",
      categories: [
        { name: "Dependência", color: "#52315E", backgroundColor: "#F5EEF9" }, // Colors from Figma
        { name: "Mensuração", color: "#274553", backgroundColor: "#D3E4ED" },
      ],
      creationDate: "22/12/2024",
      href: "/forms/audit-example",
    },
    {
      id: "mock-mbi", // Using one of the original mocks as a template
      title: "Maslach Burnout Inventory (MBI)",
      description:
        "Instrumento padrão-ouro para avaliação da síndrome de burnout em profissionais.",
      categories: [
        { name: "Burnout", color: "#1E293B", backgroundColor: "#EDEDED" },
        { name: "Bem-estar", color: "#234424", backgroundColor: "#E5F4E4" },
      ],
      creationDate: "24/02/2025",
      href: "/forms/mbi-example",
    },
    // Add more mock instruments as needed to fill the grid, based on Figma if possible
    {
      id: "mock-aq10",
      title: "Autism Spectrum Quotient - Adult (AQ-10)",
      description:
        "A Escala AQ-10 é uma versão reduzida do Autism Spectrum Quotient, desenvolvida para rastrear traços de autismo mais rapidamente.",
      categories: [
        { name: "Autismo", color: "#3F2D85", backgroundColor: "#E6E6FA" },
        // Assuming a generic "Avaliação" badge if not specified
        { name: "Avaliação", color: "#094871", backgroundColor: "#DFF1FF" },
      ],
      creationDate: "01/09/2024",
      href: "/forms/aq10-example",
    },
    {
      id: "mock-core-om",
      title: "Clinical Outcomes in Routine Evaluation (CORE-OM)",
      description:
        "O CORE-OM é um instrumento de autorrelato para monitorar progresso e avaliar a eficácia de tratamentos em saúde mental.",
      categories: [
        {
          name: "Baseado em Feedback",
          color: "#274553",
          backgroundColor: "#D3E4ED",
        },
        {
          name: "Monitoramento de Progresso",
          color: "#274553",
          backgroundColor: "#D3E4ED",
        },
      ],
      creationDate: "01/09/2024",
      href: "/forms/core-om-example",
    },
    // Add a few more for pagination testing
    {
      id: "mock-phq9",
      title: "Patient Health Questionnaire (PHQ-9)",
      description:
        "O PHQ-9 é um questionário de nove itens para rastrear, diagnosticar e monitorar a gravidade da depressão.",
      categories: [
        { name: "Depressão", color: "#5A67D8", backgroundColor: "#EBF4FF" }, // Example colors
        { name: "Diagnóstico", color: "#094871", backgroundColor: "#DFF1FF" },
      ],
      creationDate: "15/01/2025",
      href: "/forms/phq9-example",
    },
    {
      id: "mock-gad7",
      title: "Generalized Anxiety Disorder (GAD-7)",
      description:
        "O GAD-7 é uma ferramenta de sete itens para rastrear e medir a gravidade do transtorno de ansiedade generalizada.",
      categories: [
        { name: "Ansiedade", color: "#712B2B", backgroundColor: "#FAE6E6" },
        { name: "Mensuração", color: "#274553", backgroundColor: "#D3E4ED" },
      ],
      creationDate: "20/02/2025",
      href: "/forms/gad7-example",
    },
    {
      id: "mock-sds",
      title: "Self-Directed Search (SDS)",
      description:
        "O SDS é um instrumento de avaliação de interesses vocacionais que ajuda pessoas a identificar carreiras que combinam com seus interesses.",
      categories: [
        { name: "Carreira", color: "#38A169", backgroundColor: "#E6FFFA" },
        { name: "Avaliação", color: "#094871", backgroundColor: "#DFF1FF" },
      ],
      creationDate: "10/03/2025",
      href: "/forms/sds-example",
    },
  ];

  // Derive unique categories for FilterTabs
  const allCategories = mockFigmaInstruments.flatMap((instrument) =>
    instrument.categories.map((cat) => cat.name)
  );
  const uniqueCategories = [...new Set(allCategories)];

  // Reset to page 1 when filters change
  // This will be improved with useEffect later if needed for more complex scenarios
  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredInstruments = mockFigmaInstruments.filter((instrument) => {
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

  // Pagination logic
  const totalPages = Math.ceil(filteredInstruments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedInstruments = filteredInstruments.slice(startIndex, endIndex);

  const displayInstruments = paginatedInstruments;

  // Handler for page change from Pagination component
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="relative overflow-hidden bg-gradient-to-b from-[#EDF1FF] to-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          {/* New Logo and Brand Text Section */}
          <div className="mb-12 flex justify-center items-center space-x-3 sm:space-x-4">
            <IconOnly className="h-24 w-24 sm:h-24 sm:w-24" />{" "}
            {/* Using IconOnly from Logo.tsx */}
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
          {/* End New Logo and Brand Text Section */}

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
        {filteredInstruments.length === 0 &&
        (searchTerm !== "" || selectedCategory !== "Todas") ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Nenhum instrumento encontrado
            </h3>
            <p className="text-gray-500">Tente ajustar sua busca ou filtros.</p>
          </div>
        ) : paginatedInstruments.length === 0 &&
          !(searchTerm === "" && selectedCategory === "Todas") ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Nenhum instrumento encontrado
            </h3>
            <p className="text-gray-500">
              Não há mais itens para exibir com os filtros atuais.
            </p>
          </div>
        ) : paginatedInstruments.length === 0 &&
          searchTerm === "" &&
          selectedCategory === "Todas" &&
          mockFigmaInstruments.length > 0 ? (
          // This case should ideally not be hit if mockFigmaInstruments has items initially,
          // as paginatedInstruments would have items unless ITEMS_PER_PAGE is 0 or less.
          // Kept for robustness or if mockFigmaInstruments could be empty initially.
          <InstrumentsLoading />
        ) : paginatedInstruments.length > 0 ? (
          <InstrumentsGrid instruments={displayInstruments} />
        ) : (
          // Default to loading if mockFigmaInstruments is truly empty from the start
          <InstrumentsLoading />
        )}
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
