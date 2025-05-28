"use client";

import { motion } from "framer-motion";

interface MultipleChoiceOptionProps {
  text: string;
  score: number;
}

export default function MultipleChoiceOption({
  text,
  score,
}: MultipleChoiceOptionProps) {
  return (
    <motion.div
      className="bg-[#edf1ff] border border-[#a2abff] rounded-lg p-3 md:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 cursor-pointer"
      whileHover={{
        scale: 1.02,
        backgroundColor: "#dfe4ff",
        borderColor: "#7375fc",
        x: 5,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <span className="font-bold text-[#2c2c3f] text-sm md:text-base">
        {text}
      </span>
      <motion.div
        className="bg-[#352b84] text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm font-semibold w-fit"
        whileHover={{ backgroundColor: "#7375fc", scale: 1.05 }}
      >
        Pontuação: {score}
      </motion.div>
    </motion.div>
  );
}
