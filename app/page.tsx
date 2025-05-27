import { Suspense } from "react";
import { Instrument } from "./types";
import InstrumentsPageClient from "./components/InstrumentsPageClient";
import InstrumentsLoading from "./components/InstrumentsLoading"; // For Suspense fallback

// Function to fetch instruments - runs on the server
async function getInstruments(): Promise<{
  initialInstruments: Instrument[];
  error?: string | null;
}> {
  const internalApiUrl = `http://localhost:3000/api/instruments`;

  const response = await fetch(internalApiUrl, {
    // next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `Failed to fetch instruments from /api/instruments. Status: ${response.status}`,
      errorText
    );
    const errorMessage = `Failed to load instruments: ${response.status} - ${
      response.statusText
    }.${errorText ? " Details: " + errorText : ""}`;
    return {
      initialInstruments: [],
      error: errorMessage,
    };
  }

  // If response.json() fails, the error will propagate to Next.js Server Component error handling.
  const data: Instrument[] = await response.json();
  return { initialInstruments: data, error: null };
}

// Page component is now an async Server Component
export default async function HomePage() {
  const { initialInstruments, error } = await getInstruments();

  return (
    <Suspense fallback={<InstrumentsLoading />}>
      <InstrumentsPageClient
        initialInstruments={initialInstruments}
        error={error}
      />
    </Suspense>
  );
}
