export interface Deck {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  cardCount: number;
}

export interface Flashcard {
  id: string;
  deckId: string;
  front: string;
  back: string;
  createdAt: string;
  updatedAt: string;
  reviewCount: number;
}

export interface StorageData {
  decks: Deck[];
  cards: Flashcard[];
  settings: AppSettings;
}

export interface AppSettings {
  lastViewedDeckId?: string;
}
