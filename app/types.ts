// This will be the single source of truth for the instrument data structure used by the page.
export interface Instrument {
  id: string;
  title: string;
  description: string;
  categories: { name: string }[];
  tags?: { id: number; name: string; createdAt: string; updatedAt: string }[];
  creationDate: string;
  author?: string;
  href: string;
  shortTitle?: string;
  isPublic?: boolean;
  isScorable?: boolean;
  isNew?: boolean;
}
