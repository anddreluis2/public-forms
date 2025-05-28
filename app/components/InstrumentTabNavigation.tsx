"use client";

import { motion, AnimatePresence } from "framer-motion";

interface InstrumentTabNavigationProps {
  activeView: "overview" | "questions";
  onViewChange: (view: "overview" | "questions") => void;
}

export default function InstrumentTabNavigation({
  activeView,
  onViewChange,
}: InstrumentTabNavigationProps) {
  return (
    <motion.div
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <div className="flex bg-[#f4f6fa] rounded-2xl p-2 w-full md:w-auto">
        <motion.button
          onClick={() => onViewChange("overview")}
          className={`flex-1 md:flex-initial px-4 md:px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
            activeView === "overview"
              ? "bg-[#7375fc] text-white"
              : "text-[#7375fc] hover:bg-gray-100"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Visão geral
        </motion.button>
        <motion.button
          onClick={() => onViewChange("questions")}
          className={`flex-1 md:flex-initial px-4 md:px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
            activeView === "questions"
              ? "bg-[#7375fc] text-white"
              : "text-[#7375fc] hover:bg-gray-100"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Questões
        </motion.button>
      </div>

      <div className="flex gap-3 flex-col sm:flex-row">
        <motion.button
          className="px-4 md:px-6 py-3 border border-[#7375fc] text-[#7375fc] rounded-lg font-semibold text-sm hover:bg-gray-50"
          whileHover={{ scale: 1.05, borderColor: "#5A5CDD", color: "#5A5CDD" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Baixar PDF
        </motion.button>
        <AnimatePresence>
          {activeView === "questions" && (
            <motion.button
              className="px-4 md:px-6 py-3 bg-[#7375fc] text-white rounded-lg font-semibold text-sm hover:bg-[#5A5CDD]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.05, backgroundColor: "#5A5CDD" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Aplicar instrumento
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
