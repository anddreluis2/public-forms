import { NextResponse } from "next/server";
// Import the single Instrument type
import { Instrument } from "../../types";

interface RawApiCategoryOrTag {
  name: string;
  [key: string]: unknown;
}

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
    console.error("EXTERNAL_API_URL is not defined in .env file");
    return NextResponse.json(
      { error: "API endpoint configuration error. Please check server logs." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(externalApiUrl, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        `Error fetching from external API: ${res.status} ${res.statusText}`,
        errorText
      );
      return NextResponse.json(
        {
          error: "Failed to fetch data from external source.",
          status: res.status,
          statusText: res.statusText,
          details: errorText, // Provide details if available
        },
        { status: res.status }
      );
    }

    const rawDataArrayResponse = await res.json();

    // Validate that the response is an array
    if (!Array.isArray(rawDataArrayResponse)) {
      console.error(
        "External API did not return an array. Received:",
        rawDataArrayResponse
      );
      return NextResponse.json(
        {
          error: "Invalid data format from external source. Expected an array.",
        },
        { status: 500 } // Internal Server Error because our source is misbehaving
      );
    }

    const validRawDataItems = rawDataArrayResponse.filter(
      (item): item is RawApiInstrument => {
        if (item == null || typeof item !== "object") {
          console.warn(
            "Filtering out invalid item (null, undefined, or not an object):",
            item
          );
          return false;
        }
        if (typeof item.id !== "string" || typeof item.title !== "string") {
          console.warn(
            "Filtering out item with missing/invalid id or title:",
            item
          );
          return false;
        }
        return true;
      }
    );

    const instruments: Instrument[] = validRawDataItems.map(
      (item: RawApiInstrument) => {
        // Ensure categories/tags are arrays and their elements are valid
        const rawCategories = Array.isArray(item.categories)
          ? item.categories
          : [];
        const rawTags = Array.isArray(item.tags) ? item.tags : [];

        const sourceForCategories =
          rawCategories.length > 0 ? rawCategories : rawTags;

        const categoryNames: { name: string }[] = sourceForCategories
          .filter((cat) => cat != null && typeof cat.name === "string") // Filter invalid category objects/names
          .map((cat) => ({ name: cat.name }));

        return {
          id: item.id,
          title: item.title,
          description: item.description || "Descrição não disponível",
          categories: categoryNames, // This will always be an array (possibly empty)
          creationDate:
            item.creationDate ||
            item.updatedAt ||
            new Date().toLocaleDateString("pt-BR"),
          href: item.href || `/forms/instrument/${item.id}`,
          shortTitle: item.shortTitle,
          isPublic: item.isPublic,
          isScorable: item.isScorable,
          isNew: item.isNew,
        };
      }
    );

    return NextResponse.json(instruments);
  } catch (error) {
    console.error("Unhandled error in GET /api/instruments:", error);
    // Determine if the error is a TypeError or other specific error if needed
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      {
        error: "Internal server error while processing instruments.",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
