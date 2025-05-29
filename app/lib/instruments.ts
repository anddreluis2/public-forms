import { Instrument } from "@/app/types";

export async function getInstruments(): Promise<Instrument[]> {
  const baseUrl = process.env.BASE_URL;
  console.log(process.env.BASE_URL);
  const response = await fetch(`${baseUrl}/forms/public/library/`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch instruments: ${response.status}`);
  }

  return response.json();
}
