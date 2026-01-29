import { useState } from 'react';
import { Button } from '../ui';
import type { Flashcard } from '../../types';

interface FlashcardFormProps {
  card?: Flashcard;
  onSubmit: (data: Pick<Flashcard, 'front' | 'back'>) => void;
  onCancel?: () => void;
}

export function FlashcardForm({ card, onSubmit, onCancel }: FlashcardFormProps) {
  const [front, setFront] = useState(card?.front || '');
  const [back, setBack] = useState(card?.back || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!front.trim() || !back.trim()) return;

    onSubmit({
      front: front.trim(),
      back: back.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="front" className="block text-sm font-medium text-gray-700 mb-1">
          Front (Question)
        </label>
        <textarea
          id="front"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          rows={3}
          placeholder="Enter the question or prompt..."
          required
        />
      </div>

      <div>
        <label htmlFor="back" className="block text-sm font-medium text-gray-700 mb-1">
          Back (Answer)
        </label>
        <textarea
          id="back"
          value={back}
          onChange={(e) => setBack(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          rows={3}
          placeholder="Enter the answer..."
          required
        />
      </div>

      <div className="flex gap-3 pt-2">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        )}
        <Button type="submit" className="flex-1">
          {card ? 'Update Card' : 'Create Card'}
        </Button>
      </div>
    </form>
  );
}
