import { Instrument } from "@/app/types";

export async function getInstruments(): Promise<{
  initialInstruments: Instrument[];
  error?: string | null;
}> {
  const baseUrl = "https://instrumentos-psicologicos.vercel.app";
  const internalApiUrl = `${baseUrl}/api/instruments`;

  const response = await fetch(internalApiUrl, {
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

  console.log("------------", JSON.stringify(data, null, 2));

  return { initialInstruments: data, error: null };
}
