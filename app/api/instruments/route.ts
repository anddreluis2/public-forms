import { Instrument } from "@/app/types";

export async function getInstruments(): Promise<Instrument[]> {
  const baseUrl = "https://instrumentos-psicologicos.vercel.app";

  const response = await fetch(`${baseUrl}/api/instruments`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch instruments: ${response.status}`);
  }

  return response.json();
}
