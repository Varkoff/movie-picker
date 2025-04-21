import { MovieCard, SerieCard } from '../components/MovieCard';
import { getHistory } from '../server/history';
import { getOptionalUser } from '../server/session';

// Inline history item component
export function HistoryMediaItem({
  item,
  user,
  removeHistoryItemOptimisticly,
}: {
  item: Awaited<ReturnType<typeof getHistory>>[number];
  user: Awaited<ReturnType<typeof getOptionalUser>>;
  removeHistoryItemOptimisticly?: (removedHistoryItemId: string) => void;
}) {
  if (item.movie) {
    return (
      <MovieCard
        removeHistoryItemOptimisticly={removeHistoryItemOptimisticly}
        historyItemId={item.id}
        action="remove"
        movie={item.movie}
        user={user}
      />
    );
  }
  if (item.serie) {
    return (
      <SerieCard
        removeHistoryItemOptimisticly={removeHistoryItemOptimisticly}
        historyItemId={item.id}
        action="remove"
        serie={item.serie}
        user={user}
      />
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
      Unknown item
    </span>
  );
}
