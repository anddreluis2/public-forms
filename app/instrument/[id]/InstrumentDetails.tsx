"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Instrument } from "../../types";
import { formatDateToBrazilian } from "../../utils/dateUtils";

interface InstrumentDetailsProps {
  instrument: Instrument;
}

export default function InstrumentDetails({
  instrument,
}: InstrumentDetailsProps) {
  const router = useRouter();

  const formattedCreationDate = formatDateToBrazilian(instrument.creationDate);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header with back button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center text-[#7375FC] hover:text-[#5A5CDD] transition-colors mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            Voltar aos instrumentos
          </button>
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {instrument.categories.map((category, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[#7375FC] text-white text-sm font-bold rounded-full"
              >
                {category.name}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#2C2C3F] mb-4 leading-tight">
            {instrument.title}
          </h1>

          {/* Short title if available */}
          {instrument.shortTitle &&
            instrument.shortTitle !== instrument.title && (
              <h2 className="text-xl text-gray-600 mb-6 font-medium">
                {instrument.shortTitle}
              </h2>
            )}

          {/* Metadata */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Criado em:</span>
                <p className="text-gray-600">{formattedCreationDate}</p>
              </div>

              {instrument.isPublic !== undefined && (
                <div>
                  <span className="font-semibold text-gray-700">
                    Visibilidade:
                  </span>
                  <p className="text-gray-600">
                    {instrument.isPublic ? "Público" : "Privado"}
                  </p>
                </div>
              )}

              {instrument.isScorable !== undefined && (
                <div>
                  <span className="font-semibold text-gray-700">
                    Pontuação:
                  </span>
                  <p className="text-gray-600">
                    {instrument.isScorable ? "Com pontuação" : "Sem pontuação"}
                  </p>
                </div>
              )}

              {instrument.isNew && (
                <div>
                  <span className="font-semibold text-gray-700">Status:</span>
                  <p className="text-green-600 font-medium">Novo</p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#2C2C3F] mb-4">
              Descrição
            </h3>
            <div
              className="text-gray-700 leading-relaxed prose max-w-none"
              dangerouslySetInnerHTML={{ __html: instrument.description }}
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={instrument.href}
              className="flex-1 bg-[#7375FC] text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-[#5A5CDD] transition-colors"
            >
              Acessar Instrumento
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: instrument.title,
                    text: instrument.description.replace(/<[^>]*>/g, ""),
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copiado para a área de transferência!");
                }
              }}
              className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-300 transition-colors"
            >
              Compartilhar
            </motion.button>
          </div>
        </motion.div>

        {/* Additional info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-200"
        >
          <h4 className="font-semibold text-blue-900 mb-2">
            ℹ️ Informações importantes
          </h4>
          <p className="text-blue-800 text-sm">
            Este instrumento faz parte da plataforma HumanTrack. Para utilizá-lo
            completamente, você será redirecionado para o formulário
            correspondente onde poderá preenchê-lo e acompanhar os resultados.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
