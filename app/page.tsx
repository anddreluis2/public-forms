"use server";

import { Suspense } from "react";

import { Instrument } from "./types";
import InstrumentsPageClient from "./components/InstrumentsPageClient";
import InstrumentsLoading from "./components/InstrumentsLoading"; // For Suspense fallback

async function getInstruments(): Promise<{
  initialInstruments: Instrument[];
  error?: string | null;
}> {
  console.log(process.env.NEXT_PUBLIC_APP_URL);
  const baseUrl = "https://instrumentos-psicologicos.vercel.app";
  const internalApiUrl = `${baseUrl}/api/instruments`;

  const response = await fetch(internalApiUrl, {
    next: { revalidate: 3600 },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response
      .text()
      .catch(() => "Could not retrieve error text.");
    const errorMessage = `API Error (${response.status} ${response.statusText}): ${errorText}`;
    console.error(errorMessage);
    return {
      initialInstruments: [],
      error: errorMessage,
    };
  }

  const data: Instrument[] = await response.json();

  return { initialInstruments: data, error: null };
}

// Page component is now an async Server Component
export default async function HomePage() {
  const { initialInstruments, error } = await getInstruments();

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Oops! Something went wrong.
          </h1>
          <p className="text-gray-700 mb-2">
            We encountered an error while trying to load the instruments:
          </p>
          <p className="text-sm text-red-500 bg-red-100 p-3 rounded-md break-all">
            {error}
          </p>
          <p className="text-gray-600 mt-4 text-sm">
            Please try again later. If the problem persists, contact support.
          </p>
        </div>
      </div>
    );
  }

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
