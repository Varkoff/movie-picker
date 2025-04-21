import Image from 'next/image';
import Link from 'next/link';
import { getMovies, getSeries } from '../server/movies';
import { getOptionalUser } from '../server/session';
import { AddHistoryItemButton } from './AddHistoryItemButton';
import { RemoveHistoryItemButton } from './RemoveHistoryItemButton';

export function MovieCard({
  movie,
  user,
  action,
  historyItemId,
  removeHistoryItemOptimisticly,
}: {
  movie: Awaited<ReturnType<typeof getMovies>>[number];
  user: Awaited<ReturnType<typeof getOptionalUser>>;
  action: 'add' | 'remove';
  historyItemId?: string;
  removeHistoryItemOptimisticly?: (removedHistoryItemId: string) => void;
}) {
  return (
    <div className="basis-[180px] shrink-0 overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white dark:bg-gray-800">
      <div className="relative h-[300px] w-full">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 truncate">{movie.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(movie.release_date).getFullYear()}
        </p>
      </div>
      <>
        {action === 'add' ? (
          <>
            {user ? (
              <AddHistoryItemButton itemId={movie.id} type="movie" />
            ) : (
              <Link
                className="flex items-center justify-center gap-1 w-auto py-1 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-b-lg transition-colors duration-200"
                href="/login"
              >
                Login to add to history
              </Link>
            )}
          </>
        ) : null}
        {action === 'remove' && user && historyItemId && removeHistoryItemOptimisticly ? (
          <RemoveHistoryItemButton
            removeHistoryItemOptimisticly={removeHistoryItemOptimisticly}
            historyItemId={historyItemId}
          />
        ) : null}
      </>
    </div>
  );
}

export function SerieCard({
  serie,
  user,
  action,
  historyItemId,
  removeHistoryItemOptimisticly,
}: {
  serie: Awaited<ReturnType<typeof getSeries>>[number];
  user: Awaited<ReturnType<typeof getOptionalUser>>;
  action: 'add' | 'remove';
  historyItemId?: string;
  removeHistoryItemOptimisticly?: (removedHistoryItemId: string) => void;
}) {
  return (
    <div className="basis-[180px] shrink-0 overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white dark:bg-gray-800">
      <div className="relative h-[300px] w-full">
        <Image
          src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
          alt={serie.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 truncate">{serie.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(serie.first_air_date).getFullYear()}
        </p>
      </div>
      <>
        {action === 'add' ? (
          <>
            {user ? (
              <AddHistoryItemButton itemId={serie.id} type="serie" />
            ) : (
              <Link
                className="flex items-center justify-center gap-1 w-auto py-1 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-b-lg transition-colors duration-200"
                href="/login"
              >
                Login to add to history
              </Link>
            )}
          </>
        ) : null}
        {action === 'remove' && user && historyItemId && removeHistoryItemOptimisticly ? (
          <RemoveHistoryItemButton
            removeHistoryItemOptimisticly={removeHistoryItemOptimisticly}
            historyItemId={historyItemId}
          />
        ) : null}
      </>
    </div>
  );
}
