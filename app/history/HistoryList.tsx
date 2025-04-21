'use client';
import Link from 'next/link';
import { Suspense, useOptimistic } from 'react';
import { getHistory } from '../server/history';
import { requireUser } from '../server/session';
import { HistoryMediaItem } from './HistoryMediaItem';
type HistoryItem = Awaited<ReturnType<typeof getHistory>>[number];
type HistoryByDate = Record<number, Record<string, HistoryItem[]>>;

export function HistoryList({
  initialHistoryItems,
  user,
}: {
  initialHistoryItems: Awaited<ReturnType<typeof getHistory>>;
  user: Awaited<ReturnType<typeof requireUser>>;
}) {
  const [historyItems, removeHistoryItemOptimisticly] = useOptimistic<
    Awaited<ReturnType<typeof getHistory>>,
    string
  >(initialHistoryItems, (optimicHistoryItems, removedHistoryItemId) =>
    optimicHistoryItems.filter(s => s.id !== removedHistoryItemId)
  );
  // Group history by date
  const historyByDate = historyItems.reduce((acc, item) => {
    const date = new Date(item.createdAt);
    const year = date.getFullYear();
    const formattedDate = `${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })}`;

    if (!acc[year]) acc[year] = {};
    if (!acc[year][formattedDate]) acc[year][formattedDate] = [];

    acc[year][formattedDate].push(item);
    return acc;
  }, {} as HistoryByDate);

  // Check if history is empty
  const isEmpty = Object.keys(historyByDate).length === 0;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Watch History</h1>

      <Suspense
        fallback={
          <div className="space-y-6">
            <div className="animate-pulse">
              <div className="h-7 bg-gray-200 dark:bg-gray-700 w-32 rounded mb-3"></div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded shadow">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 w-40 rounded mb-3"></div>
                <div className="flex flex-row flex-wrap gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-40 h-64 bg-gray-200 dark:bg-gray-700 rounded">
                      <div className="h-36 bg-gray-300 dark:bg-gray-600 rounded-t"></div>
                      <div className="p-2">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="animate-pulse">
              <div className="h-7 bg-gray-200 dark:bg-gray-700 w-32 rounded mb-3"></div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded shadow">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 w-40 rounded mb-3"></div>
                <div className="flex flex-row flex-wrap gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-40 h-64 bg-gray-200 dark:bg-gray-700 rounded">
                      <div className="h-36 bg-gray-300 dark:bg-gray-600 rounded-t"></div>
                      <div className="p-2">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      >
        {isEmpty ? (
          <div className="text-center py-8">
            <h3 className="text-xl mb-4">No watch history yet</h3>
            <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded">
              Browse Movies & Series
            </Link>
          </div>
        ) : (
          <>
            {Object.entries(historyByDate).map(([year, dates]) => (
              <div key={year} className="mb-6">
                <h2 className="text-2xl font-medium mb-3">{year}</h2>

                {Object.entries(dates).map(([date, items]) => (
                  <div key={date} className="mb-4 p-3 bg-white dark:bg-gray-800 rounded shadow">
                    <h3 className="font-medium border-b pb-2 mb-2">{date}</h3>

                    <ul className="flex flex-row flex-wrap gap-4">
                      {items.map(item => (
                        <HistoryMediaItem
                          removeHistoryItemOptimisticly={removeHistoryItemOptimisticly}
                          user={user}
                          key={item.id}
                          item={item}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </Suspense>
    </div>
  );
}
