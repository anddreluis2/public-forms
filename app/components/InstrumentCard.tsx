"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instrument } from "../types";

interface InstrumentCardProps {
  instrument: Instrument;
}

export default function InstrumentCard({ instrument }: InstrumentCardProps) {
  const formattedCreationDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(instrument.creationDate));

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        borderColor: "#7375FC",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 h-full flex flex-col justify-between"
    >
      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          {instrument.categories.map((category, index) => (
            <span
              key={index}
              className="px-3 bg-[#7375FC] text-white py-1 text-xs font-bold rounded-full"
            >
              {category.name}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold text-[#2C2C3F] mb-3 leading-tight">
          {instrument.title}
        </h2>
        <p
          className="text-sm text-[#64748B] mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: instrument.description }}
        />
      </div>
      <div>
        <div className="text-xs text-[#94A3B8] mb-4">
          Criado em: {formattedCreationDate}
        </div>
        <Link
          href={`/instrument/${instrument.id}`}
          className="group inline-flex items-center text-sm font-semibold text-[#7375FC] hover:text-[#5A5CDD]"
        >
          Ver instrumento
          <svg
            className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
