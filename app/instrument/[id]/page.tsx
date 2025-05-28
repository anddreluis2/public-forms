import { notFound } from "next/navigation";
import { Instrument } from "../../types";
import InstrumentDetails from "@/app/instrument/[id]/InstrumentDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getInstruments(): Promise<Instrument[]> {
  const baseUrl = "https://instrumentos-psicologicos.vercel.app";

  const response = await fetch(`${baseUrl}/api/instruments`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch instruments: ${response.status}`);
  }

  return response.json();
}

export default async function InstrumentDetailsPage({ params }: PageProps) {
  const { id } = await params;

  console.log("🔍 Server-side rendering for ID:", id);

  const instruments = await getInstruments();
  const instrument = instruments.find((inst) => inst.id === id);

  if (!instrument) {
    notFound();
  }

  console.log("✅ Found instrument:", instrument.title);

  return <InstrumentDetails instrument={instrument} />;
}
