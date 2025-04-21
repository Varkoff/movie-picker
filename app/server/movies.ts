'use server';
const THEMOVIEDB_API_KEY = process.env.THEMOVIEDB_API_KEY;
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from './db';
import { requireUser } from './session';

const GetMoviesSchema = z.object({
  page: z.number(),
  results: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      poster_path: z.string(),
      release_date: z.string(),
    })
  ),
});

export async function getMovies() {
  const data = await fetchMovieDb({ url: '/movie/popular' });
  const { results } = GetMoviesSchema.parse(data);

  return results;
}

const GetMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string(),
  release_date: z.string(),
});

export async function getMovie({ movieId }: { movieId: number }) {
  'use cache';
  const data = await fetchMovieDb({ url: `/movie/${movieId}` });
  const result = GetMovieSchema.parse(data);

  console.log(result);
  return result;
}

const GetSeriesSchema = z.object({
  page: z.number(),
  results: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      poster_path: z.string(),
      first_air_date: z.string(),
    })
  ),
});

export async function getSeries() {
  const data = await fetchMovieDb({ url: '/tv/popular' });
  const { results } = GetSeriesSchema.parse(data);

  return results;
}

const GetSerieSchema = z.object({
  id: z.number(),
  name: z.string(),
  poster_path: z.string(),
  first_air_date: z.string(),
});

export async function getSerie({ serieId }: { serieId: number }) {
  'use cache';
  const data = await fetchMovieDb({ url: `/tv/${serieId}` });
  const result = GetSerieSchema.parse(data);

  return result;
}
export async function fetchMovieDb({ url }: { url: `/${string}` }) {
  const response = await fetch(`https://api.themoviedb.org/3${url}`, {
    method: 'GET',
    headers: { accept: 'application/json', Authorization: `Bearer ${THEMOVIEDB_API_KEY}` },
  });
  const data = await response.json();
  return data;
}

export async function addHistoryItem({
  itemId,
  type,
}: {
  itemId: number;
  type: 'movie' | 'serie';
}) {
  const user = await requireUser();

  await prisma.historyItem.create({
    data: {
      user: {
        connect: {
          email: user.email,
        },
      },
      ...(type === 'movie' && {
        movieId: itemId,
      }),
      ...(type === 'serie' && {
        serieId: itemId,
      }),
    },
  });
}

export async function removeHistoryItem({ historyItemId }: { historyItemId: string }) {
  await requireUser();

  // simulate 1000ms delay

  await prisma.historyItem.delete({
    where: {
      id: historyItemId,
    },
  });

  revalidatePath('/history');
}
