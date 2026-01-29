import type { Flashcard } from '../../types';

interface FlashcardListProps {
  cards: Flashcard[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function FlashcardList({ cards, onEdit, onDelete }: FlashcardListProps) {
  if (cards.length === 0) {
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
            <path d="M12 3v18" />
            <rect x="4" y="8" width="16" height="8" rx="1" />
          </svg>
        </div>
        <p className="text-gray-500">No cards in this deck</p>
        <p className="text-sm text-gray-400">Add your first flashcard</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{card.front}</p>
              <p className="text-sm text-gray-500 mt-1 truncate">{card.back}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {onEdit && (
                <button
                  onClick={() => onEdit(card.id)}
                  className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                  aria-label="Edit card"
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
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this card?')) {
                      onDelete(card.id);
                    }
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Delete card"
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
      ))}
    </div>
  );
}
