"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instrument } from "../types";
import { formatDateToBrazilian } from "../utils/dateUtils";

interface InstrumentCardProps {
  instrument: Instrument;
}

export default function InstrumentCard({ instrument }: InstrumentCardProps) {
  const formattedCreationDate = formatDateToBrazilian(instrument.creationDate);

  return (
    <Link href={`/instrument/${instrument.id}`} className="block h-full">
      <motion.div
        whileHover={{
          scale: 1.02,
          y: -4,
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          borderColor: "#7375FC",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 h-full flex flex-col justify-between
                   cursor-pointer group transition-all duration-200 ease-in-out"
      >
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {instrument.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 bg-[#7375FC] text-white py-1 text-xs font-bold rounded-full
                           transition-all duration-200 group-hover:bg-[#5A5CDD] group-hover:scale-105"
              >
                {tag.name}
              </span>
            ))}
          </div>
          <h2
            className="text-xl font-bold text-[#2C2C3F] mb-3 leading-tight
                         group-hover:text-[#7375FC] transition-colors duration-200"
          >
            {instrument.title}
          </h2>
          <p
            className="text-sm text-[#64748B] mb-4 line-clamp-3
                       group-hover:text-[#4A5568] transition-colors duration-200"
            dangerouslySetInnerHTML={{ __html: instrument.description }}
          />
        </div>
        <div>
          <div className="text-xs text-[#94A3B8] mb-4">
            Criado em: {formattedCreationDate}
          </div>
          <div
            className="group/link inline-flex items-center text-sm font-semibold text-[#7375FC] 
                       hover:text-[#5A5CDD] cursor-pointer transition-all duration-200"
          >
            Ver instrumento
            <svg
              className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200"
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
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
