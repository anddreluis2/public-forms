import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

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
  fields: {
    id: string;
    type: string;
    label: string;
    options?: string[];
    required: boolean;
  }[];
  interpretation: string;
  patientInstructions: string;
  developers: string;
  references: string;
}

async function getInstrument(id: string): Promise<Instrument> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/instruments/${id}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const instrument = await getInstrument(params.id);

  return {
    title: `${instrument.title} (${instrument.acronym}) | Avaliação Psicológica`,
    description: instrument.description,
    keywords: `${instrument.title}, ${instrument.acronym}, ${instrument.category}, avaliação psicológica, instrumento clínico`,
    openGraph: {
      title: `${instrument.title} (${instrument.acronym})`,
      description: instrument.description,
      type: "website",
      locale: "pt_BR",
      siteName: "Instrumentos Clínicos",
    },
    twitter: {
      card: "summary_large_image",
      title: `${instrument.title} (${instrument.acronym})`,
      description: instrument.description,
    },
  };
}

export default async function FormPage({ params }: { params: { id: string } }) {
  const instrument = await getInstrument(params.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white">
      {/* Header Section */}
      <div className="relative mb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6B46C1]/10 to-[#805AD5]/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 mb-6">
              <Link
                href="/"
                className="text-[#6B46C1] hover:text-[#805AD5] transition-colors duration-300"
              >
                ← Voltar para a biblioteca
              </Link>
              <span className="px-4 py-2 text-sm font-medium text-[#6B46C1] bg-[#FAF5FF] rounded-full">
                {instrument.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2D3748] mb-4">
              {instrument.title}
            </h1>
            <p className="text-xl text-[#4A5568] max-w-3xl mx-auto">
              {instrument.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="space-y-8">
          {/* Details Sections */}
          <div className="space-y-6">
            {/* Pontuação */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#E2E8F0]">
              <h3 className="text-xl font-semibold text-[#2D3748] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#FAF5FF] text-[#6B46C1] flex items-center justify-center mr-3">
                  1
                </span>
                Pontuação
              </h3>
              <div className="prose prose-purple max-w-none">
                <p className="text-[#4A5568]">{instrument.metadata.scoring}</p>
              </div>
            </div>

            {/* Interpretação */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#E2E8F0]">
              <h3 className="text-xl font-semibold text-[#2D3748] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#FAF5FF] text-[#6B46C1] flex items-center justify-center mr-3">
                  2
                </span>
                Interpretação
              </h3>
              <div className="prose prose-purple max-w-none">
                <p className="text-[#4A5568]">
                  A interpretação dos resultados do {instrument.acronym} deve
                  ser feita considerando o contexto clínico do paciente.
                  Pontuações mais altas indicam maior gravidade dos sintomas. É
                  importante considerar que este instrumento é uma ferramenta de
                  rastreamento e não um diagnóstico definitivo. Recomenda-se que
                  profissionais de saúde mental realizem uma avaliação clínica
                  completa para confirmar o diagnóstico.
                </p>
              </div>
            </div>

            {/* Instruções do Paciente */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#E2E8F0]">
              <h3 className="text-xl font-semibold text-[#2D3748] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#FAF5FF] text-[#6B46C1] flex items-center justify-center mr-3">
                  3
                </span>
                Instruções do Paciente
              </h3>
              <div className="prose prose-purple max-w-none">
                <p className="text-[#4A5568]">
                  Por favor, leia atentamente cada questão e marque a resposta
                  que melhor descreve como você se sentiu nas últimas duas
                  semanas. Não há respostas certas ou erradas. Responda de
                  acordo com o que você realmente sentiu, sem pensar muito tempo
                  em cada questão. Se você tiver dúvidas sobre como responder,
                  peça esclarecimentos ao profissional de saúde.
                </p>
              </div>
            </div>

            {/* Desenvolvedores */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#E2E8F0]">
              <h3 className="text-xl font-semibold text-[#2D3748] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#FAF5FF] text-[#6B46C1] flex items-center justify-center mr-3">
                  4
                </span>
                Desenvolvedores
              </h3>
              <div className="prose prose-purple max-w-none">
                <p className="text-[#4A5568]">
                  O {instrument.acronym} foi desenvolvido por uma equipe de
                  pesquisadores liderada pelo Dr. {instrument.metadata.author}
                  em {instrument.metadata.year}. O instrumento foi validado em
                  diversos estudos e tem sido amplamente utilizado na prática
                  clínica e em pesquisas científicas.
                </p>
              </div>
            </div>

            {/* Referências */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#E2E8F0]">
              <h3 className="text-xl font-semibold text-[#2D3748] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#FAF5FF] text-[#6B46C1] flex items-center justify-center mr-3">
                  5
                </span>
                Referências
              </h3>
              <div className="prose prose-purple max-w-none">
                <p className="text-[#4A5568]">
                  {instrument.metadata.author} ({instrument.metadata.year}).{" "}
                  {instrument.title}. {instrument.metadata.reference}. Este
                  instrumento foi adaptado e validado para o português
                  brasileiro, mantendo suas propriedades psicométricas
                  originais.
                </p>
              </div>
            </div>

            {/* Questions Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#E2E8F0]">
              <h3 className="text-xl font-semibold text-[#2D3748] mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#FAF5FF] text-[#6B46C1] flex items-center justify-center mr-3">
                  6
                </span>
                Questões
              </h3>
              <div className="space-y-8">
                {instrument.fields.map((field, index) => (
                  <div key={field.id} className="space-y-3">
                    <div className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-[#FAF5FF] text-[#6B46C1] text-sm flex items-center justify-center mr-3 mt-1">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-[#2D3748] font-medium">
                          {field.label}
                        </p>
                        {field.type === "select" && (
                          <ul className="mt-3 space-y-2 text-[#4A5568]">
                            {field.options?.map((option) => (
                              <li key={option} className="flex items-center">
                                <span className="w-2 h-2 rounded-full bg-[#6B46C1]/20 mr-2" />
                                {option}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-[#4A5568]">
              Desenvolvido com ❤️ por{" "}
              <span className="font-semibold text-[#6B46C1]">HumanTrack</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
