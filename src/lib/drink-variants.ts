export type DrinkVariant = {
  name: string;
  subtitle: string;
  description: string;
  sequenceUrl: string;
  frameCount: number;
};

export const DRINK_VARIANTS: DrinkVariant[] = [
  {
    name: 'Cherry',
    subtitle: 'Soda',
    description:
      'A sweet and tart beverage that delivers the essence of perfectly ripe cherries in every bubbly sip.',
    sequenceUrl: 'https://sfrkmhhomfrjfjjccwjg.supabase.co/storage/v1/object/public/cherry/frame_000_delay-0.04s.webp',
    frameCount: 240,
  },
  {
    name: 'Lemon',
    subtitle: 'Soda',
    description:
      "Made from real lemon juice, this beverage brings a tangy, zesty flavour that's both tart and slightly sweet.",
    sequenceUrl: 'https://sfrkmhhomfrjfjjccwjg.supabase.co/storage/v1/object/public/lemon/frame_000_delay-0.04s.webp',
    frameCount: 240,
  },
  {
    name: 'Apple',
    subtitle: 'Soda',
    description:
      'Every sip is like biting into a freshly picked apple, delivering a refreshingly sweet and tangy experience.',
    sequenceUrl: 'https://sfrkmhhomfrjfjjccwjg.supabase.co/storage/v1/object/public/apple/frame_000_delay-0.04s.webp',
    frameCount: 240,
  },
];
