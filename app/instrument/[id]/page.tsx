import { notFound } from "next/navigation";
import { Metadata } from "next";
import InstrumentDetails from "@/app/instrument/[id]/InstrumentDetails";
import { getInstruments } from "@/app/lib/instruments";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const instruments = await getInstruments();
  const instrument = instruments.find((inst) => inst.id === id);

  if (!instrument) {
    return {
      title: "Instrumento não encontrado",
      description: "O instrumento solicitado não foi encontrado.",
    };
  }

  // Remove HTML tags da descrição para metadata
  const cleanDescription = instrument.description
    .replace(/<[^>]*>/g, "")
    .substring(0, 160);

  const tags = instrument.tags?.map((tag) => tag.name) || [];

  return {
    title: instrument.title,
    description: cleanDescription,
    keywords: [...tags, "instrumento psicológico", "avaliação", "psicologia"],
  };
}

export default async function InstrumentDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const instruments = await getInstruments();

  const instrument = instruments.find((inst) => inst.id === id);

  if (!instrument) {
    notFound();
  }

  return <InstrumentDetails instrument={instrument} />;
}
