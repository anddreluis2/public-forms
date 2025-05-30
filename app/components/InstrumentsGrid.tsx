"use client";

import { Instrument } from "../types";
import InstrumentCard from "./InstrumentCard";

interface InstrumentsGridProps {
  instruments: Instrument[];
}

export default function InstrumentsGrid({ instruments }: InstrumentsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {instruments.map((instrument) => (
        <InstrumentCard key={instrument.id} instrument={instrument} />
      ))}
    </div>
  );
}
