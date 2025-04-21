import { MovieCard, SerieCard } from './components/MovieCard';
import { getMovies, getSeries } from './server/movies';
import { getOptionalUser } from './server/session';

export default async function Home() {
  const [movies, series, user] = await Promise.all([getMovies(), getSeries(), getOptionalUser()]);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Movies</h1>
        <div className="flex flex-wrap flex-row gap-4">
          {movies.map(movie => (
            <MovieCard action="add" user={user} key={movie.id} movie={movie} />
          ))}
        </div>
        <h1 className="text-4xl font-bold">Series</h1>
        <div className="flex flex-wrap flex-row gap-4">
          {series.map(serie => (
            <SerieCard action="add" user={user} key={serie.id} serie={serie} />
          ))}
        </div>
      </main>
    </div>
  );
}
