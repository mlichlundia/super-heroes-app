export interface Hero {
  appearance: Appearence;
  biography: Biography;
  connections: Record<string, string>;
  id: number;
  images: Record<string, string>;
  name: string;
  powerstats: Record<string, number>;
  slug: string;
  work: Record<string, string>;
}

interface Appearence {
  eyeColor: string;
  gender: string;
  hairColor: string;
  height: string[];
  race: string;
  weight: string[];
}

interface Biography {
  aliases: string[];
  alignment: string;
  alterEgos: string;
  firstAppearance: string;
  fullName: string;
  placeOfBirth: string;
  publisher: string;
}
