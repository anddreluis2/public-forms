"use client";

import { motion } from "framer-motion";

export default function InstrumentsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
          className="bg-white rounded-2xl shadow-sm p-8 border border-[#E2E8F0]"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="w-24 h-8 bg-gray-200 rounded-full"></div>
            <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
          </div>
          <div className="w-3/4 h-8 bg-gray-200 rounded-lg mb-4"></div>
          <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
          <div className="w-2/3 h-4 bg-gray-200 rounded mb-6"></div>
          <div className="flex items-center">
            <div className="w-40 h-4 bg-gray-200 rounded"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
