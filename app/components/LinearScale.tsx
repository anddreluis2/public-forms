"use client";

import { motion } from "framer-motion";

interface LinearScaleProps {
  minLabel: string;
  maxLabel: string;
  currentValue?: number;
}

export default function LinearScale({
  minLabel,
  maxLabel,
  currentValue = 4,
}: LinearScaleProps) {
  return (
    <div className="space-y-3 md:space-y-4">
      <div className="relative">
        <div className="w-full h-2 bg-[#e2e8f0] rounded-full"></div>
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-[#7375fc] rounded-full flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
        >
          <motion.svg
            className="w-3 h-3 md:w-5 md:h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            ></path>
          </motion.svg>
        </motion.div>
        <motion.div
          className="absolute -top-8 md:-top-10 left-1/2 transform -translate-x-1/2 bg-[#2c2c3f] text-white px-2 py-1 rounded text-xs md:text-sm font-semibold"
          animate={{ y: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          {currentValue}
        </motion.div>
      </div>
      <div className="flex justify-between text-xs md:text-sm font-semibold text-[#2c2c3f]">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
