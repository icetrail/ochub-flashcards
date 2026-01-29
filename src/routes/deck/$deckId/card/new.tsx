import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { AppLayout } from '../../../../components/layout';
import { FlashcardForm } from '../../../../components/flashcard';
import { useDecks, useFlashcards } from '../../../../hooks';
import type { Flashcard } from '../../../../types';

export const Route = createFileRoute('/deck/$deckId/card/new')({
  component: NewCardPage,
});

function NewCardPage() {
  const { deckId } = Route.useParams();
  const navigate = useNavigate();
  const { getDeck } = useDecks();
  const { addCard } = useFlashcards(deckId);

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

  const handleSubmit = (data: Pick<Flashcard, 'front' | 'back'>) => {
    addCard(data);
    navigate({ to: '/deck/$deckId', params: { deckId } });
  };

  const handleCancel = () => {
    navigate({ to: '/deck/$deckId', params: { deckId } });
  };

  return (
    <AppLayout title="New Card" showBack>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <FlashcardForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </AppLayout>
  );
}
