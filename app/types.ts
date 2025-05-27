// This will be the single source of truth for the instrument data structure used by the page.
export interface Instrument {
  id: string;
  title: string;
  description: string;
  categories: { name: string }[]; // Only names; colors applied at render time
  creationDate: string;
  author?: string;
  href: string;
  shortTitle?: string; // Keep fields that are useful for display
  isPublic?: boolean;
  isScorable?: boolean;
  isNew?: boolean;
}

// ApiInstrumentItem and ApiInstrumentTag are removed as distinct exported types.
// The structure of the raw data from the external API will be implicitly handled
// within the /api/instruments route.
