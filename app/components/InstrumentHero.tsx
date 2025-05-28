"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instrument } from "../types";
import LogoWithText from "./LogoWithText";

interface InstrumentHeroProps {
  instrument: Instrument;
}

export default function InstrumentHero({ instrument }: InstrumentHeroProps) {
  return (
    <motion.div
      className="bg-white py-8 md:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Brand */}
      <motion.div
        className="flex justify-center mb-6 md:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <LogoWithText logoSize="md" animated={true} />
      </motion.div>

      {/* Header Container */}
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Breadcrumb */}
        <motion.div
          className="flex items-center gap-2 mb-4 md:mb-6 overflow-x-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link
            href="/"
            className="text-[#7375fc] font-medium text-xs md:text-sm whitespace-nowrap hover:text-[#5A5CDD] transition-colors cursor-pointer
                       hover:scale-105 transform transition-transform duration-200"
          >
            Biblioteca de instrumentos
          </Link>
          <motion.svg
            className="w-4 h-4 md:w-6 md:h-6 text-gray-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ x: [0, 2, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </motion.svg>
          <span className="text-[#020617] font-bold text-xs md:text-sm">
            {instrument.title}
          </span>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="flex gap-2 mb-4 md:mb-6 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {instrument.categories?.map((category, index) => (
            <motion.span
              key={index}
              className="px-2 md:px-3 py-1 rounded-full text-xs font-extrabold tracking-wide cursor-default"
              style={{
                backgroundColor: index === 0 ? "#fae6e6" : "#dff1ff",
                color: index === 0 ? "#712b2b" : "#094871",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-2xl md:text-4xl lg:text-[56px] font-bold text-[#2c2c3f] leading-tight md:leading-[73px] mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {instrument.title}
        </motion.h1>
      </div>
    </motion.div>
  );
}
