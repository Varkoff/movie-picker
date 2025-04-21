'use client';
import { addHistoryItem } from '../server/movies';

export function AddHistoryItemButton({
  itemId,
  type,
}: {
  itemId: number;
  type: 'movie' | 'serie';
}) {
  return (
    <button
      onClick={() => addHistoryItem({ itemId, type })}
      className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-b-lg transition-colors duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-pulse"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
      Add to history
    </button>
  );
}
