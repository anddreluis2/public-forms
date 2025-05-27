import { NextResponse } from "next/server";
// Import the single Instrument type
import { Instrument } from "../../types";

// CATEGORY_STYLES map is REMOVED from this file.
// Colors will be applied by the client-side rendering component.

interface RawApiCategoryOrTag {
  name: string;
  // If your API might send other known properties for categories/tags,
  // you can add them here as optional, e.g., id?: string, description?: string.
  // For now, we only strictly need 'name' for the transformation.
  [key: string]: unknown; // Allows other properties but encourages known ones to be defined
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
  const externalApiUrl = process.env.EXTERNAL_API_URL;

  if (!externalApiUrl) {
    console.error("EXTERNAL_API_URL is not set in environment variables.");
    return NextResponse.json(
      { error: "Server configuration error: Missing external API URL." },
      { status: 500 }
    );
  }

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
    return NextResponse.json(
      {
        error: `Failed to fetch instruments from external source. Status: ${res.status}. Response: ${errorText}`,
      },
      { status: res.status }
    );
  }

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
