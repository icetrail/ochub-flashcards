import { useNavigate } from '@tanstack/react-router';
import type { Deck } from '../../types';

interface DeckCardProps {
  deck: Deck;
  onDelete?: (id: string) => void;
}

export function DeckCard({ deck, onDelete }: DeckCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: '/deck/$deckId', params: { deckId: deck.id } });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && confirm('Are you sure you want to delete this deck?')) {
      onDelete(deck.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full flex-shrink-0"
            style={{ backgroundColor: deck.color }}
          />
          <div>
            <h3 className="font-medium text-gray-900">{deck.name}</h3>
            {deck.description && (
              <p className="text-sm text-gray-500 mt-1">{deck.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">{deck.cardCount} cards</span>
          {onDelete && (
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Delete deck"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
