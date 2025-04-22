import Link from "next/link";
import { Metadata } from "next";

interface Instrument {
  id: string;
  title: string;
  acronym: string;
  category: string;
  description: string;
  metadata: {
    author: string;
    year: string;
    reference: string;
    purpose: string;
    targetPopulation: string;
    reliability: string;
    validity: string;
    scoring: string;
  };
}

export const metadata: Metadata = {
  title: "Instrumentos Clínicos | Avaliações Psicológicas",
  description:
    "Explore nossa biblioteca de instrumentos clínicos para avaliação psicológica. Ferramentas validadas para diagnóstico e monitoramento terapêutico.",
  keywords:
    "instrumentos clínicos, avaliação psicológica, GAD-7, PHQ-9, ansiedade, depressão, burnout, TDAH, autismo",
  openGraph: {
    title: "Instrumentos Clínicos | Avaliações Psicológicas",
    description:
      "Explore nossa biblioteca de instrumentos clínicos para avaliação psicológica. Ferramentas validadas para diagnóstico e monitoramento terapêutico.",
    type: "website",
    locale: "pt_BR",
    siteName: "Instrumentos Clínicos",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instrumentos Clínicos | Avaliações Psicológicas",
    description:
      "Explore nossa biblioteca de instrumentos clínicos para avaliação psicológica.",
  },
  alternates: {
    canonical: "https://seusite.com",
  },
};

async function getInstruments(): Promise<Instrument[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/instruments`,
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch instruments");
  }

  return res.json();
}

export default async function Home() {
  const instruments = await getInstruments();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FF] via-[#F0E7FF] to-[#ECF9F7]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 via-[#6366F1]/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-[#F3F4FF] text-[#6366F1] mb-8">
              Monitoramento em tempo real
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1B1E] mb-6 tracking-tight">
              A próxima geração em monitoramento de saúde comportamental
            </h1>
            <p className="text-lg md:text-xl text-[#4A5568] max-w-3xl mx-auto leading-relaxed mb-12">
              Acompanhe seus pacientes utilizando dados e Inteligência
              Artificial.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <a
                href="#instruments"
                className="inline-flex items-center px-6 py-3 rounded-full text-white bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#7C3AED] hover:to-[#4F46E5] transition-all duration-200 font-medium shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30"
              >
                Comece a monitorar grátis →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Instruments Grid */}
      <div
        id="instruments"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#1A1B1E] mb-4">
            Biblioteca de Instrumentos Clínicos
          </h2>
          <p className="text-lg text-[#4A5568] max-w-2xl mx-auto">
            Explore nossa coleção de instrumentos validados para avaliação
            psicológica. Ferramentas confiáveis para diagnóstico e
            acompanhamento terapêutico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instruments.map((instrument) => (
            <Link
              key={instrument.id}
              href={`/forms/${instrument.id}`}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-8 border border-[#E2E8F0] hover:border-[#6B46C1]/20"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="px-4 py-2 text-sm font-medium text-[#805AD5] bg-[#FAF5FF] rounded-full group-hover:bg-[#F3E8FF] transition-colors duration-300">
                  {instrument.category}
                </span>
                <span className="text-sm font-semibold text-[#38A169] bg-[#F0FFF4] px-3 py-1 rounded-full">
                  {instrument.acronym}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-[#2D3748] mb-4 group-hover:text-[#6B46C1] transition-colors duration-300">
                {instrument.title}
              </h2>
              <p className="text-[#4A5568] mb-6 line-clamp-2">
                {instrument.description}
              </p>
              <div className="flex items-center text-sm text-[#718096]">
                <span className="mr-2">Desenvolvido por:</span>
                <span className="font-medium text-[#2D3748]">
                  {instrument.metadata.author}
                </span>
              </div>
            </Link>
          ))}

          {/* Mock Additional Instruments */}
          <Link
            href="/forms/3"
            className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-8 border border-[#E2E8F0] hover:border-[#6B46C1]/20"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="px-4 py-2 text-sm font-medium text-[#805AD5] bg-[#FAF5FF] rounded-full group-hover:bg-[#F3E8FF] transition-colors duration-300">
                TDAH
              </span>
              <span className="text-sm font-semibold text-[#38A169] bg-[#F0FFF4] px-3 py-1 rounded-full">
                ASRS
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#2D3748] mb-4 group-hover:text-[#6B46C1] transition-colors duration-300">
              Adult ADHD Self-Report Scale
            </h2>
            <p className="text-[#4A5568] mb-6 line-clamp-2">
              Escala de autoavaliação para sintomas de TDAH em adultos,
              desenvolvida em colaboração com a OMS.
            </p>
            <div className="flex items-center text-sm text-[#718096]">
              <span className="mr-2">Desenvolvido por:</span>
              <span className="font-medium text-[#2D3748]">
                Kessler, R. C., et al.
              </span>
            </div>
          </Link>

          <Link
            href="/forms/4"
            className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-8 border border-[#E2E8F0] hover:border-[#6B46C1]/20"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="px-4 py-2 text-sm font-medium text-[#805AD5] bg-[#FAF5FF] rounded-full group-hover:bg-[#F3E8FF] transition-colors duration-300">
                Burnout
              </span>
              <span className="text-sm font-semibold text-[#38A169] bg-[#F0FFF4] px-3 py-1 rounded-full">
                MBI
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#2D3748] mb-4 group-hover:text-[#6B46C1] transition-colors duration-300">
              Maslach Burnout Inventory
            </h2>
            <p className="text-[#4A5568] mb-6 line-clamp-2">
              Instrumento padrão-ouro para avaliação da síndrome de burnout em
              profissionais.
            </p>
            <div className="flex items-center text-sm text-[#718096]">
              <span className="mr-2">Desenvolvido por:</span>
              <span className="font-medium text-[#2D3748]">
                Maslach, C., & Jackson, S. E.
              </span>
            </div>
          </Link>

          <Link
            href="/forms/5"
            className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-8 border border-[#E2E8F0] hover:border-[#6B46C1]/20"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="px-4 py-2 text-sm font-medium text-[#805AD5] bg-[#FAF5FF] rounded-full group-hover:bg-[#F3E8FF] transition-colors duration-300">
                Autismo
              </span>
              <span className="text-sm font-semibold text-[#38A169] bg-[#F0FFF4] px-3 py-1 rounded-full">
                M-CHAT
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#2D3748] mb-4 group-hover:text-[#6B46C1] transition-colors duration-300">
              Modified Checklist for Autism in Toddlers
            </h2>
            <p className="text-[#4A5568] mb-6 line-clamp-2">
              Instrumento de triagem para transtorno do espectro autista em
              crianças pequenas.
            </p>
            <div className="flex items-center text-sm text-[#718096]">
              <span className="mr-2">Desenvolvido por:</span>
              <span className="font-medium text-[#2D3748]">
                Robins, D. L., et al.
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-[#4A5568]">
              © 2024{" "}
              <span className="font-semibold text-[#6366F1]">HumanTrack</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
