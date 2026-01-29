import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { AppLayout } from '../components/layout';
import { FlashcardWidget } from '../components/flashcard';
import { useDecks } from '../hooks';

interface PracticeSearch {
  deckId?: string;
}

export const Route = createFileRoute('/practice')({
  component: PracticePage,
  validateSearch: (search: Record<string, unknown>): PracticeSearch => {
    return {
      deckId: typeof search.deckId === 'string' ? search.deckId : undefined,
    };
  },
});

function PracticePage() {
  const { deckId } = Route.useSearch();
  const navigate = useNavigate();
  const { decks } = useDecks();

  const handleDeckChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    navigate({
      to: '/practice',
      search: value ? { deckId: value } : {},
    });
  };

  return (
    <AppLayout title="Practice" showBack>
      <div className="space-y-4">
        <select
          value={deckId || ''}
          onChange={handleDeckChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="">All Decks</option>
          {decks.map((deck) => (
            <option key={deck.id} value={deck.id}>
              {deck.name} ({deck.cardCount} cards)
            </option>
          ))}
        </select>

        <div className='h-72'>
          <FlashcardWidget deckId={deckId} />
        </div>
      </div>
    </AppLayout>
  );
}
