"use server";

import { Suspense } from "react";

import InstrumentsPageClient from "./components/InstrumentsPageClient";
import InstrumentsLoading from "./components/InstrumentsLoading"; // For Suspense fallback
import { getInstruments } from "./api/instruments/route";

export default async function HomePage() {
  const initialInstruments = await getInstruments();

  if (!initialInstruments || initialInstruments.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md text-center">
          <h1 className="text-xl font-semibold text-gray-700 mb-4">
            No Instruments Available
          </h1>
          <p className="text-gray-600">
            It seems there are no instruments to display at the moment. Please
            check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<InstrumentsLoading />}>
      <InstrumentsPageClient initialInstruments={initialInstruments} />
    </Suspense>
  );
}
