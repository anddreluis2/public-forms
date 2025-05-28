"use client";

import { useState } from "react";
import { Instrument } from "../../types";

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
      <div className="bg-white py-12">
        {/* Brand */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-[70px] h-[70px] bg-gray-200 rounded-lg"></div>
            <div>
              <div className="text-[26px] font-normal text-[#393a56] text-center">
                Biblioteca de
              </div>
              <div className="text-[26px] font-bold text-[#393a56] text-center">
                instrumentos
              </div>
              <div className="text-[17px] font-bold text-[#393a56] text-center">
                by humantrack
              </div>
            </div>
          </div>
        </div>

        {/* Header Container */}
        <div className="max-w-[1240px] mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[#7375fc] font-medium text-sm">
              Biblioteca de instrumentos
            </span>
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span className="text-[#020617] font-bold text-sm">
              {instrument.title}
            </span>
          </div>

          {/* Categories */}
          <div className="flex gap-2 mb-6">
            {instrument.categories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wide"
                style={{
                  backgroundColor: index === 0 ? "#fae6e6" : "#dff1ff",
                  color: index === 0 ? "#712b2b" : "#094871",
                }}
              >
                {category.name}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-[56px] font-bold text-[#2c2c3f] leading-[73px] mb-8">
            {instrument.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white py-8">
        <div className="max-w-[1240px] mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex bg-[#f4f6fa] rounded-2xl p-2">
              <button
                onClick={() => setActiveView("overview")}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  activeView === "overview"
                    ? "bg-[#7375fc] text-white"
                    : "text-[#7375fc] hover:bg-gray-100"
                }`}
              >
                Visão geral
              </button>
              <button
                onClick={() => setActiveView("questions")}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  activeView === "questions"
                    ? "bg-[#7375fc] text-white"
                    : "text-[#7375fc] hover:bg-gray-100"
                }`}
              >
                Questões
              </button>
            </div>

            <div className="flex gap-3">
              <button className="px-6 py-3 border border-[#7375fc] text-[#7375fc] rounded-lg font-semibold text-sm hover:bg-gray-50">
                Baixar PDF
              </button>
              {activeView === "questions" && (
                <button className="px-6 py-3 bg-[#7375fc] text-white rounded-lg font-semibold text-sm hover:bg-[#5A5CDD]">
                  Aplicar instrumento
                </button>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-[#dfe4ff] rounded-[32px] p-14 relative overflow-hidden">
            {/* Decorative Circle */}
            <div className="absolute top-0 right-0 w-[949px] h-[949px] border border-[#4b33cf] rounded-full opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>

            <div className="relative z-10">
              {activeView === "overview" ? (
                <OverviewContent instrument={instrument} />
              ) : (
                <QuestionsContent />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2c2c3f] py-12">
        <div className="max-w-[1240px] mx-auto px-4 flex justify-between items-center">
          <span className="text-white">
            © 2025 Humantrack. Todos os direitos reservados
          </span>
          <span className="text-white">💜 Feito com amor por HumanTrack</span>
        </div>
      </footer>
    </div>
  );
}

function OverviewContent({ instrument }: { instrument: Instrument }) {
  return (
    <div className="space-y-6">
      {/* Description Card */}
      <div className="bg-white rounded-3xl p-6">
        <h3 className="text-2xl font-bold text-[#2c2c3f] mb-4">Descrição</h3>
        <div
          className="text-[#64748b] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: instrument.description }}
        />
      </div>

      {/* Interpretation Card */}
      <div className="bg-white rounded-3xl p-6">
        <h3 className="text-2xl font-bold text-[#2c2c3f] mb-4">
          Interpretação
        </h3>
        <div className="text-[#64748b] leading-relaxed space-y-4">
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
      </div>

      {/* Instructions Card */}
      <div className="bg-white rounded-3xl p-6">
        <h3 className="text-2xl font-bold text-[#2c2c3f] mb-4">
          Instruções do paciente
        </h3>
        <p className="text-[#64748b] leading-relaxed">
          Preencha o instrumento logo após cada episódio, anotando de forma
          detalhada e objetiva as informações solicitadas, como intensidade do
          medo, sintomas físicos, pensamentos e comportamentos. Quanto mais
          preciso e consistente for o registro, maior será o benefício para seu
          processo terapêutico.
        </p>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-2 gap-6">
        {/* Developers Card */}
        <div className="bg-white rounded-3xl p-6">
          <h3 className="text-2xl font-bold text-[#2c2c3f] mb-4">
            Desenvolvedores
          </h3>
          <p className="text-[#64748b] leading-relaxed">
            Construída e desenvolvida por Júlio Cézar Gonçalves do Pinho
            (CRP-12/17614).
          </p>
        </div>

        {/* References Card */}
        <div className="bg-white rounded-3xl p-6">
          <h3 className="text-2xl font-bold text-[#2c2c3f] mb-4">
            Referências
          </h3>
          <div className="text-[#64748b] leading-relaxed space-y-2">
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
        </div>
      </div>
    </div>
  );
}

function QuestionsContent() {
  return (
    <div className="space-y-6">
      {/* Scoring Card */}
      <div className="bg-white rounded-3xl p-6">
        <h3 className="text-2xl font-bold text-[#2c2c3f] mb-4">Pontuação</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Score Items */}
          <div className="border border-[#cbd5e1] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-[#07eb03] rounded-full"></div>
              <span className="font-bold text-[#2c2c3f]">Baixo risco</span>
            </div>
            <div className="text-sm text-[#64748b]">
              <div>Pontuação mínima: 0</div>
              <div>Pontuação máxima: 7</div>
            </div>
          </div>

          <div className="border border-[#cbd5e1] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-[#0c9ff7] rounded-full"></div>
              <span className="font-bold text-[#2c2c3f]">Uso de risco</span>
            </div>
            <div className="text-sm text-[#64748b]">
              <div>Pontuação mínima: 8</div>
              <div>Pontuação máxima: 15</div>
            </div>
          </div>

          <div className="border border-[#cbd5e1] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-[#f101e9] rounded-full"></div>
              <span className="font-bold text-[#2c2c3f]">Uso nocivo</span>
            </div>
            <div className="text-sm text-[#64748b]">
              <div>Pontuação mínima: 16</div>
              <div>Pontuação máxima: 19</div>
            </div>
          </div>

          <div className="border border-[#cbd5e1] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-[#f70f0e] rounded-full"></div>
              <span className="font-bold text-[#2c2c3f]">
                Provável dependência
              </span>
            </div>
            <div className="text-sm text-[#64748b]">
              <div>Pontuação mínima: 20</div>
              <div>Pontuação máxima: 40</div>
            </div>
          </div>
        </div>
      </div>

      {/* Question 1 - Discursive */}
      <div className="bg-white rounded-3xl p-6">
        <div className="bg-[#d2f9e8] text-[#074d40] px-3 py-1 rounded-full text-xs font-extrabold tracking-wide inline-block mb-4">
          1 - Discursiva
        </div>
        <h4 className="text-xl font-bold text-[#2c2c3f]">
          Situação ativadora (o que estava fazendo, onde estava, com quem,
          etc.):
        </h4>
      </div>

      {/* Question 2 - Multiple Choice */}
      <div className="bg-white rounded-3xl p-6">
        <div className="bg-[#d2f9e8] text-[#074d40] px-3 py-1 rounded-full text-xs font-extrabold tracking-wide inline-block mb-4">
          2 - Múltipla escolha
        </div>
        <h4 className="text-xl font-bold text-[#2c2c3f] mb-6">
          Com que frequência você sofre ataques de pânico?
        </h4>

        <div className="space-y-3">
          {[
            { text: "Nunca", score: 0 },
            { text: "Uma vez por mês ou menos", score: 7 },
            { text: "Duas a quatro vezes por mês", score: 15 },
            { text: "Duas a três vezes por mês", score: 20 },
            { text: "Quatro ou mais vezes por semana", score: 40 },
          ].map((option, index) => (
            <div
              key={index}
              className="bg-[#edf1ff] border border-[#a2abff] rounded-lg p-4 flex items-center justify-between"
            >
              <span className="font-bold text-[#2c2c3f]">{option.text}</span>
              <div className="bg-[#352b84] text-white px-3 py-1 rounded text-sm font-semibold">
                Pontuação: {option.score}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Question 3 - Linear Scale */}
      <div className="bg-white rounded-3xl p-6">
        <div className="bg-[#d2f9e8] text-[#074d40] px-3 py-1 rounded-full text-xs font-extrabold tracking-wide inline-block mb-4">
          3 - Escala linear
        </div>
        <h4 className="text-xl font-bold text-[#2c2c3f] mb-6">
          Com que frequência você sofre ataques de pânico?
        </h4>

        <div className="space-y-4">
          <div className="relative">
            <div className="w-full h-2 bg-[#e2e8f0] rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#7375fc] rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                ></path>
              </svg>
            </div>
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#2c2c3f] text-white px-2 py-1 rounded text-sm font-semibold">
              4
            </div>
          </div>
          <div className="flex justify-between text-sm font-semibold text-[#2c2c3f]">
            <span>1 - Discordo totalmente</span>
            <span>7 - Concordo totalmente</span>
          </div>
        </div>
      </div>
    </div>
  );
}
