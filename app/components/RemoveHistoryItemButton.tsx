'use client';
import { useTransition } from 'react';
import { removeHistoryItem } from '../server/movies';

export function RemoveHistoryItemButton({
  historyItemId,
  removeHistoryItemOptimisticly,
}: {
  historyItemId: string;
  removeHistoryItemOptimisticly: (removedHistoryItemId: string) => void;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          removeHistoryItemOptimisticly(historyItemId);
          removeHistoryItem({ historyItemId });
        });
      }}
      className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-b-lg transition-colors duration-200"
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
      >
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
      Remove from history
    </button>
  );
}
