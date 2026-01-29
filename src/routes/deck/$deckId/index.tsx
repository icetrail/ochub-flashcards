import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '../../../components/ui';
import { AppLayout } from '../../../components/layout';
import { FlashcardList } from '../../../components/flashcard';
import { useDecks, useFlashcards } from '../../../hooks';

export const Route = createFileRoute('/deck/$deckId/')({
  component: DeckDetailPage,
});

function DeckDetailPage() {
  const { deckId } = Route.useParams();
  const navigate = useNavigate();
  const { getDeck } = useDecks();
  const { cards, removeCard } = useFlashcards(deckId);

  const deck = getDeck(deckId);

  if (!deck) {
    return (
      <AppLayout title="Deck Not Found" showBack>
        <div className="text-center py-12">
          <p className="text-gray-500">This deck doesn't exist.</p>
        </div>
      </AppLayout>
    );
  }

  const handleEdit = (cardId: string) => {
    navigate({
      to: '/deck/$deckId/card/$cardId',
      params: { deckId, cardId },
    });
  };

  return (
    <AppLayout title={deck.name} showBack>
      <div className="space-y-4">
        {deck.description && (
          <p className="text-gray-500 text-sm">{deck.description}</p>
        )}

        <Button
          onClick={() =>
            navigate({ to: '/deck/$deckId/card/new', params: { deckId } })
          }
          className="w-full"
        >
          + Add Card
        </Button>

        <FlashcardList cards={cards} onEdit={handleEdit} onDelete={removeCard} />
      </div>
    </AppLayout>
  );
}
