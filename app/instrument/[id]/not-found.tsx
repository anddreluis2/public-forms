"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-red-500 text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Instrumento não encontrado
        </h1>
        <p className="text-gray-600 mb-6 max-w-md">
          O instrumento que você está procurando não existe ou pode ter sido
          removido.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-[#7375FC] text-white px-6 py-3 rounded-lg hover:bg-[#5A5CDD] transition-colors"
          >
            Ver todos os instrumentos
          </Link>
          <button
            onClick={() => window.history.back()}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Voltar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
