import { Instrument } from "@/app/types";

export async function getInstruments(): Promise<Instrument[]> {
  const baseUrl = "http://ht-prod-backend.fly.dev";
  const response = await fetch(`${baseUrl}/forms/public/library/`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch instruments: ${response.status}`);
  }

  return response.json();
}
