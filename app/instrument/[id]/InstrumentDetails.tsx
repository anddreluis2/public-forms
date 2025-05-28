"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Instrument } from "../../types";
import LogoWithText from "../../components/LogoWithText";

interface InstrumentDetailsProps {
  instrument: Instrument;
}

export default function InstrumentDetails({
  instrument,
}: InstrumentDetailsProps) {
  const [activeView, setActiveView] = useState<"overview" | "questions">(
    "overview"
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Background */}
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
            {instrument.categories.map((category, index) => (
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

      {/* Main Content */}
      <motion.div
        className="bg-white py-6 md:py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="max-w-[1240px] mx-auto px-4">
          {/* Tab Navigation */}
          <motion.div
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="flex bg-[#f4f6fa] rounded-2xl p-2 w-full md:w-auto">
              <motion.button
                onClick={() => setActiveView("overview")}
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
                onClick={() => setActiveView("questions")}
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
                whileHover={{
                  scale: 1.05,
                  borderColor: "#5A5CDD",
                  color: "#5A5CDD",
                }}
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

          {/* Content Area */}
          <motion.div
            className="bg-[#dfe4ff] rounded-2xl md:rounded-[32px] p-6 md:p-10 lg:p-14 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          >
            {/* Decorative Circle */}
            <motion.div
              className="hidden lg:block absolute top-0 right-0 w-[949px] h-[949px] border border-[#4b33cf] rounded-full opacity-20 transform translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            ></motion.div>

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {activeView === "overview" ? (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <OverviewContent instrument={instrument} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="questions"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <QuestionsContent />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="bg-[#2c2c3f] py-8 md:py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="max-w-[1240px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.span
            className="text-white text-sm md:text-base text-center md:text-left cursor-default"
            whileHover={{ color: "#7375fc" }}
            transition={{ duration: 0.2 }}
          >
            © 2025 Humantrack. Todos os direitos reservados
          </motion.span>
          <motion.span
            className="text-white text-sm md:text-base text-center md:text-right cursor-default"
            whileHover={{ color: "#7375fc", scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            💜 Feito com amor por HumanTrack
          </motion.span>
        </div>
      </motion.footer>
    </div>
  );
}

function OverviewContent({ instrument }: { instrument: Instrument }) {
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
    <div className="space-y-4 md:space-y-6">
      {/* Description Card */}
      <motion.div
        className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-xl md:text-2xl font-bold text-[#2c2c3f] mb-3 md:mb-4">
          Descrição
        </h3>
        <div
          className="text-[#64748b] leading-relaxed text-sm md:text-base"
          dangerouslySetInnerHTML={{ __html: instrument.description }}
        />
      </motion.div>

      {/* Interpretation Card */}
      <motion.div
        className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-xl md:text-2xl font-bold text-[#2c2c3f] mb-3 md:mb-4">
          Interpretação
        </h3>
        <div className="text-[#64748b] leading-relaxed space-y-3 md:space-y-4 text-sm md:text-base">
          <p>
            <strong>Identificação de Gatilhos:</strong> Verifique os padrões nas
            situações ativadoras (esperadas ou inesperadas). Isso ajuda a
            identificar os contextos que mais contribuem para os ataques.
          </p>
          <p>
            <strong>Escala de Intensidade do Medo:</strong> Analise a
            intensidade do medo relatada ao longo dos registros. Isso pode
            indicar se o paciente está se habituando ou sensibilizando a certos
            gatilhos.
          </p>
          <p>
            <strong>Análise de Sintomas:</strong> Observe a frequência e
            variedade dos sintomas físicos. Isso auxilia na compreensão das
            respostas fisiológicas predominantes no paciente.
          </p>
          <p>
            <strong>Padrões Cognitivos:</strong> Avalie os pensamentos
            registrados para identificar distorções cognitivas recorrentes, como
            catastrofização ou pensamentos de perda de controle.
          </p>
          <p>
            <strong>Estratégias de Enfrentamento:</strong> Examine os
            comportamentos para entender as estratégias de enfrentamento
            utilizadas (funcionais ou disfuncionais).
          </p>
        </div>
      </motion.div>

      {/* Instructions Card */}
      <motion.div
        className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-xl md:text-2xl font-bold text-[#2c2c3f] mb-3 md:mb-4">
          Instruções do paciente
        </h3>
        <p className="text-[#64748b] leading-relaxed text-sm md:text-base">
          Preencha o instrumento logo após cada episódio, anotando de forma
          detalhada e objetiva as informações solicitadas, como intensidade do
          medo, sintomas físicos, pensamentos e comportamentos. Quanto mais
          preciso e consistente for o registro, maior será o benefício para seu
          processo terapêutico.
        </p>
      </motion.div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Developers Card */}
        <motion.div
          className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-[#2c2c3f] mb-3 md:mb-4">
            Desenvolvedores
          </h3>
          <p className="text-[#64748b] leading-relaxed text-sm md:text-base">
            Construída e desenvolvida por Júlio Cézar Gonçalves do Pinho
            (CRP-12/17614).
          </p>
        </motion.div>

        {/* References Card */}
        <motion.div
          className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6"
          custom={4}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-[#2c2c3f] mb-3 md:mb-4">
            Referências
          </h3>
          <div className="text-[#64748b] leading-relaxed space-y-2 text-sm md:text-base">
            <p>
              Craske, M. G., & Barlow, D. H. (2023) Transtorno de Pânico e
              Agorafobia. In: Barlow, D. H. Manual dos transtornos psicológicos:
              tratamento passo a passo (5nd ed.). Artmed.
            </p>
            <p>
              Craske, M. G., & Barlow, D. H. (2007). Mastery of your anxiety and
              panic: Therapist guide (4nd ed.). Oxford University Press.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function QuestionsContent() {
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
    <div className="space-y-4 md:space-y-6">
      {/* Scoring Card */}
      <motion.div
        className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-xl md:text-2xl font-bold text-[#2c2c3f] mb-4">
          Pontuação
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          {/* Score Items */}
          {[
            { color: "#07eb03", label: "Baixo risco", min: 0, max: 7 },
            { color: "#0c9ff7", label: "Uso de risco", min: 8, max: 15 },
            { color: "#f101e9", label: "Uso nocivo", min: 16, max: 19 },
            {
              color: "#f70f0e",
              label: "Provável dependência",
              min: 20,
              max: 40,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="border border-[#cbd5e1] rounded-lg p-3 md:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 md:w-5 md:h-5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="font-bold text-[#2c2c3f] text-sm md:text-base">
                  {item.label}
                </span>
              </div>
              <div className="text-xs md:text-sm text-[#64748b] pl-7 sm:pl-0">
                <div>Pontuação mínima: {item.min}</div>
                <div>Pontuação máxima: {item.max}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Question 1 - Discursive */}
      <motion.div
        className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="bg-[#d2f9e8] text-[#074d40] px-2 md:px-3 py-1 rounded-full text-xs font-extrabold tracking-wide inline-block mb-3 md:mb-4">
          1 - Discursiva
        </div>
        <h4 className="text-lg md:text-xl font-bold text-[#2c2c3f]">
          Situação ativadora (o que estava fazendo, onde estava, com quem,
          etc.):
        </h4>
      </motion.div>

      {/* Question 2 - Multiple Choice */}
      <motion.div
        className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="bg-[#d2f9e8] text-[#074d40] px-2 md:px-3 py-1 rounded-full text-xs font-extrabold tracking-wide inline-block mb-3 md:mb-4">
          2 - Múltipla escolha
        </div>
        <h4 className="text-lg md:text-xl font-bold text-[#2c2c3f] mb-4 md:mb-6">
          Com que frequência você sofre ataques de pânico?
        </h4>

        <div className="space-y-2 md:space-y-3">
          {[
            { text: "Nunca", score: 0 },
            { text: "Uma vez por mês ou menos", score: 7 },
            { text: "Duas a quatro vezes por mês", score: 15 },
            { text: "Duas a três vezes por mês", score: 20 },
            { text: "Quatro ou mais vezes por semana", score: 40 },
          ].map((option, index) => (
            <motion.div
              key={index}
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
                {option.text}
              </span>
              <motion.div
                className="bg-[#352b84] text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm font-semibold w-fit"
                whileHover={{ backgroundColor: "#7375fc", scale: 1.05 }}
              >
                Pontuação: {option.score}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Question 3 - Linear Scale */}
      <motion.div
        className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6"
        custom={3}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="bg-[#d2f9e8] text-[#074d40] px-2 md:px-3 py-1 rounded-full text-xs font-extrabold tracking-wide inline-block mb-3 md:mb-4">
          3 - Escala linear
        </div>
        <h4 className="text-lg md:text-xl font-bold text-[#2c2c3f] mb-4 md:mb-6">
          Com que frequência você sofre ataques de pânico?
        </h4>

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
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
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
              4
            </motion.div>
          </div>
          <div className="flex justify-between text-xs md:text-sm font-semibold text-[#2c2c3f]">
            <span>1 - Discordo totalmente</span>
            <span>7 - Concordo totalmente</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
