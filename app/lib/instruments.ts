import { Instrument } from "@/app/types";

export async function getInstruments(): Promise<Instrument[]> {
  const baseUrl = "http://ht-prod-backend.fly.dev";
  const response = await fetch(`${baseUrl}/forms/public/library/`, {
    cache: "no-store",
  });

  return response.json();
}
