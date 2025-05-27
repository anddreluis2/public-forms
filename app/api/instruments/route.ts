import { NextResponse } from "next/server";
// Import the single Instrument type
import { Instrument } from "../../types";

interface RawApiCategoryOrTag {
  name: string;
  [key: string]: unknown;
}

// Define an internal interface for the raw data structure from the external API
// This is only used within this API route and not exported.
interface RawApiInstrument {
  id: string;
  title: string;
  description?: string;
  categories?: RawApiCategoryOrTag[];
  tags?: RawApiCategoryOrTag[];
  creationDate?: string;
  updatedAt?: string;
  href?: string;
  shortTitle?: string;
  isPublic?: boolean;
  isScorable?: boolean;
  isNew?: boolean;
  // Add any other fields that your external API might return
}

export async function GET() {
  const externalApiUrl = process.env.EXTERNAL_API_URL!;

  const res = await fetch(externalApiUrl, {
    headers: { "Content-Type": "application/json" },
    // next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(
      `Error fetching from external API: ${res.status} ${res.statusText}`,
      errorText
    );
  }

  // Assuming res.json() always succeeds and returns data matching RawApiInstrument[]
  const rawDataArray: RawApiInstrument[] = await res.json();

  // Transform rawData to Instrument[] here
  // Color information from rawData.categories/tags is ignored.
  const instruments: Instrument[] = rawDataArray.map(
    (item: RawApiInstrument) => {
      let categoryNames: { name: string }[] = [];
      const sourceForCategories = item.categories || item.tags || [];

      if (sourceForCategories.length > 0) {
        categoryNames = sourceForCategories.map((sourceCat) => ({
          name: sourceCat.name, // Only extract the name
        }));
      }

      return {
        id: item.id,
        title: item.title,
        description: item.description || "Descrição não disponível",
        categories: categoryNames, // Array of { name: string }
        creationDate:
          item.creationDate ||
          item.updatedAt ||
          new Date().toLocaleDateString("pt-BR"),
        href: item.href || `/forms/instrument/${item.id}`,
        shortTitle: item.shortTitle,
        isPublic: item.isPublic,
        isScorable: item.isScorable,
        isNew: item.isNew,
        // author: item.author, // Map other relevant fields to the Instrument type if needed
      };
    }
  );
  return NextResponse.json(instruments);
}
