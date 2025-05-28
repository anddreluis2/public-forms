"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("💥 Error page:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Erro ao carregar instrumento
        </h1>
        <p className="text-gray-600 mb-6 max-w-md">
          Ocorreu um erro inesperado. Isso pode ser temporário.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-[#7375FC] text-white px-6 py-3 rounded-lg hover:bg-[#5A5CDD] transition-colors"
          >
            Tentar novamente
          </button>
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
