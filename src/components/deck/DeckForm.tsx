import { useState } from 'react';
import { Button } from '../ui';
import type { Deck } from '../../types';

const COLORS = [
  '#3B82F6', // blue
  '#10B981', // emerald
  '#F59E0B', // amber
  '#EF4444', // red
  '#8B5CF6', // violet
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#84CC16', // lime
];

interface DeckFormProps {
  deck?: Deck;
  onSubmit: (data: Pick<Deck, 'name' | 'description' | 'color'>) => void;
  onCancel?: () => void;
}

export function DeckForm({ deck, onSubmit, onCancel }: DeckFormProps) {
  const [name, setName] = useState(deck?.name || '');
  const [description, setDescription] = useState(deck?.description || '');
  const [color, setColor] = useState(deck?.color || COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      color,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="e.g., Spanish Vocabulary"
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          rows={3}
          placeholder="Add a description..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
        <div className="flex gap-2 flex-wrap">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full transition-transform ${
                color === c ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
              }`}
              style={{ backgroundColor: c }}
              aria-label={`Select color ${c}`}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        )}
        <Button type="submit" className="flex-1">
          {deck ? 'Update Deck' : 'Create Deck'}
        </Button>
      </div>
    </form>
  );
}
