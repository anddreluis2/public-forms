import { notFound } from "next/navigation";
import InstrumentDetails from "@/app/instrument/[id]/InstrumentDetails";
import { getInstruments } from "@/app/lib/instruments";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InstrumentDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const instruments = await getInstruments();

  console.log("instruments", instruments);
  const instrument = instruments.find((inst) => inst.id === id);

  if (!instrument) {
    notFound();
  }

  return <InstrumentDetails instrument={instrument} />;
}
