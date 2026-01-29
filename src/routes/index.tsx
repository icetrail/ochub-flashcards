import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { getInstance } from '@opencampus/ochub-utils';
import { Button } from '../components/ui';
import { AppLayout } from '../components/layout';
import { DeckList, DeckForm } from '../components/deck';
import { useDecks } from '../hooks';
import { config } from '../config';
import type { Deck } from '../types';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [ocId, setOcId] = useState<string | undefined>();
  const { decks, addDeck, removeDeck } = useDecks();

  useEffect(() => {
    const account = getInstance({
      sandboxMode: config.ocSandbox,
    });

    // Get initial state
    setOcId(account.getOCId());

    // Subscribe to auth state changes
    const unsubscribe = account.subscribe((authState) => {
      setOcId(authState.OCId);
    });

    return unsubscribe;
  }, []);

  const handleCreateDeck = (data: Pick<Deck, 'name' | 'description' | 'color'>) => {
    addDeck(data);
    setShowForm(false);
  };

  return (
    <AppLayout title="My Flashcards">
      <div className="space-y-4">
        {ocId && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-sm text-blue-700">
            OCID: {ocId}
          </div>
        )}

        {showForm ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Deck</h2>
            <DeckForm onSubmit={handleCreateDeck} onCancel={() => setShowForm(false)} />
          </div>
        ) : (
          <Button onClick={() => setShowForm(true)} className="w-full">
            + New Deck
          </Button>
        )}

        <DeckList decks={decks} onDelete={removeDeck} />
      </div>
    </AppLayout>
  );
}
