"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ContentCardProps {
  title: string;
  children: ReactNode;
  customIndex?: number;
}

export default function ContentCard({
  title,
  children,
  customIndex = 0,
}: ContentCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  return (
    <motion.div
      className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6"
      custom={customIndex}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3 className="text-xl md:text-2xl font-bold text-[#2c2c3f] mb-3 md:mb-4">
        {title}
      </h3>
      {children}
    </motion.div>
  );
}
