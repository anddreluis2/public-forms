export interface FigmaInstrument {
  id: string;
  title: string;
  description: string;
  categories: { name: string; color: string; backgroundColor: string }[];
  creationDate: string;
  author?: string;
  href: string;
}

// You can add other shared types here in the future
