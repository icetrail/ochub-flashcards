import type { Deck } from '../../types';
import { DeckCard } from './DeckCard';

interface DeckListProps {
  decks: Deck[];
  onDelete?: (id: string) => void;
}

export function DeckList({ decks, onDelete }: DeckListProps) {
  if (decks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto"
          >
            <rect x="3" y="3" width="7" height="9" rx="1" />
            <rect x="14" y="3" width="7" height="5" rx="1" />
            <rect x="14" y="12" width="7" height="9" rx="1" />
            <rect x="3" y="16" width="7" height="5" rx="1" />
          </svg>
        </div>
        <p className="text-gray-500">No decks yet</p>
        <p className="text-sm text-gray-400">Create your first deck to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} onDelete={onDelete} />
      ))}
    </div>
  );
}
