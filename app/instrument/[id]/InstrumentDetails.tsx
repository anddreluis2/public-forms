"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instrument } from "../../types";
import InstrumentHero from "../../components/InstrumentHero";
import InstrumentTabNavigation from "../../components/InstrumentTabNavigation";
import ContentCard from "../../components/ContentCard";
import MultipleChoiceOption from "../../components/MultipleChoiceOption";
import LinearScale from "../../components/LinearScale";

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
      <InstrumentHero instrument={instrument} />

      {/* Main Content */}
      <motion.div
        className="bg-white py-6 md:py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="max-w-[1240px] mx-auto px-4">
          {/* Tab Navigation */}
          <InstrumentTabNavigation
            activeView={activeView}
            onViewChange={setActiveView}
          />

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
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Description Card */}
      <ContentCard title="Descrição" customIndex={0}>
        <div
          className="text-[#64748b] leading-relaxed text-sm md:text-base"
          dangerouslySetInnerHTML={{ __html: instrument.description }}
        />
      </ContentCard>

      {/* Interpretation Card */}
      <ContentCard title="Interpretação" customIndex={1}>
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
      </ContentCard>

      {/* Instructions Card */}
      <ContentCard title="Instruções do paciente" customIndex={2}>
        <p className="text-[#64748b] leading-relaxed text-sm md:text-base">
          Preencha o instrumento logo após cada episódio, anotando de forma
          detalhada e objetiva as informações solicitadas, como intensidade do
          medo, sintomas físicos, pensamentos e comportamentos. Quanto mais
          preciso e consistente for o registro, maior será o benefício para seu
          processo terapêutico.
        </p>
      </ContentCard>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Developers Card */}
        <ContentCard title="Desenvolvedores" customIndex={3}>
          <p className="text-[#64748b] leading-relaxed text-sm md:text-base">
            Construída e desenvolvida por Júlio Cézar Gonçalves do Pinho
            (CRP-12/17614).
          </p>
        </ContentCard>

        {/* References Card */}
        <ContentCard title="Referências" customIndex={4}>
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
        </ContentCard>
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

  const scoreItems = [
    { color: "#07eb03", label: "Baixo risco", min: 0, max: 7 },
    { color: "#0c9ff7", label: "Uso de risco", min: 8, max: 15 },
    { color: "#f101e9", label: "Uso nocivo", min: 16, max: 19 },
    { color: "#f70f0e", label: "Provável dependência", min: 20, max: 40 },
  ];

  const multipleChoiceOptions = [
    { text: "Nunca", score: 0 },
    { text: "Uma vez por mês ou menos", score: 7 },
    { text: "Duas a quatro vezes por mês", score: 15 },
    { text: "Duas a três vezes por mês", score: 20 },
    { text: "Quatro ou mais vezes por semana", score: 40 },
  ];

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
          {scoreItems.map((item, index) => (
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
          {multipleChoiceOptions.map((option, index) => (
            <MultipleChoiceOption
              key={index}
              text={option.text}
              score={option.score}
            />
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

        <LinearScale
          minLabel="1 - Discordo totalmente"
          maxLabel="7 - Concordo totalmente"
          currentValue={4}
        />
      </motion.div>
    </div>
  );
}
