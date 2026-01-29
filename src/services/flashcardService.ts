import { v4 as uuidv4 } from 'uuid';
import type { Flashcard } from '../types';
import { getItem, setItem, StorageKeys } from './storage';

export function getAllCards(): Flashcard[] {
  return getItem<Flashcard[]>(StorageKeys.CARDS, []);
}

export function getCardsByDeckId(deckId: string): Flashcard[] {
  const cards = getAllCards();
  return cards.filter((card) => card.deckId === deckId);
}

export function getCardById(id: string): Flashcard | undefined {
  const cards = getAllCards();
  return cards.find((card) => card.id === id);
}

export function createCard(
  data: Pick<Flashcard, 'deckId' | 'front' | 'back'>
): Flashcard {
  const now = new Date().toISOString();
  const newCard: Flashcard = {
    id: uuidv4(),
    deckId: data.deckId,
    front: data.front,
    back: data.back,
    createdAt: now,
    updatedAt: now,
    reviewCount: 0,
  };

  const cards = getAllCards();
  cards.push(newCard);
  setItem(StorageKeys.CARDS, cards);

  return newCard;
}

export function updateCard(
  id: string,
  data: Partial<Pick<Flashcard, 'front' | 'back' | 'reviewCount'>>
): Flashcard | undefined {
  const cards = getAllCards();
  const index = cards.findIndex((card) => card.id === id);

  if (index === -1) {
    return undefined;
  }

  const updatedCard: Flashcard = {
    ...cards[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  cards[index] = updatedCard;
  setItem(StorageKeys.CARDS, cards);

  return updatedCard;
}

export function deleteCard(id: string): boolean {
  const cards = getAllCards();
  const filteredCards = cards.filter((card) => card.id !== id);

  if (filteredCards.length === cards.length) {
    return false;
  }

  setItem(StorageKeys.CARDS, filteredCards);
  return true;
}

export function deleteCardsByDeckId(deckId: string): void {
  const cards = getAllCards();
  const filteredCards = cards.filter((card) => card.deckId !== deckId);
  setItem(StorageKeys.CARDS, filteredCards);
}

export function getRandomCard(deckId?: string): Flashcard | undefined {
  const cards = deckId ? getCardsByDeckId(deckId) : getAllCards();

  if (cards.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}

export function incrementReviewCount(id: string): void {
  const card = getCardById(id);
  if (card) {
    updateCard(id, { reviewCount: card.reviewCount + 1 });
  }
}
