import { Instrument } from "@/app/types";

const baseUrl = process.env.BASE_URL;

export async function getInstruments(): Promise<Instrument[]> {
  const response = await fetch(`${baseUrl}/public/forms/library/`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch instruments: ${response.status}`);
  }

  return response.json();
}
