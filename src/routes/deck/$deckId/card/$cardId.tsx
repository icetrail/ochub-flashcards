import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { AppLayout } from '../../../../components/layout';
import { FlashcardForm } from '../../../../components/flashcard';
import { useDecks, useFlashcards } from '../../../../hooks';
import type { Flashcard } from '../../../../types';

export const Route = createFileRoute('/deck/$deckId/card/$cardId')({
  component: EditCardPage,
});

function EditCardPage() {
  const { deckId, cardId } = Route.useParams();
  const navigate = useNavigate();
  const { getDeck } = useDecks();
  const { getCard, editCard } = useFlashcards(deckId);

  const deck = getDeck(deckId);
  const card = getCard(cardId);

  if (!deck) {
    return (
      <AppLayout title="Deck Not Found" showBack>
        <div className="text-center py-12">
          <p className="text-gray-500">This deck doesn't exist.</p>
        </div>
      </AppLayout>
    );
  }

  if (!card) {
    return (
      <AppLayout title="Card Not Found" showBack>
        <div className="text-center py-12">
          <p className="text-gray-500">This card doesn't exist.</p>
        </div>
      </AppLayout>
    );
  }

  const handleSubmit = (data: Pick<Flashcard, 'front' | 'back'>) => {
    editCard(cardId, data);
    navigate({ to: '/deck/$deckId', params: { deckId } });
  };

  const handleCancel = () => {
    navigate({ to: '/deck/$deckId', params: { deckId } });
  };

  return (
    <AppLayout title="Edit Card" showBack>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <FlashcardForm card={card} onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </AppLayout>
  );
}
