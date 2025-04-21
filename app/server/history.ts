'use server';
import { prisma } from './db';
import { getMovie, getSerie } from './movies';
import { requireUser } from './session';

export async function getHistoryQuery({ email }: { email: string }) {
  const history = await prisma.historyItem.findMany({
    where: {
      user: {
        email: email,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const uniqueMovieIds = new Set();
  const uniqueSerieIds = new Set();
  for (const item of history) {
    if (item.movieId) {
      uniqueMovieIds.add(item.movieId);
    }
    if (item.serieId) {
      uniqueSerieIds.add(item.serieId);
    }
  }

  return await Promise.all(
    history.map(async historyItem => {
      return {
        ...historyItem,
        movie: historyItem.movieId ? await getMovie({ movieId: historyItem.movieId }) : null,
        serie: historyItem.serieId ? await getSerie({ serieId: historyItem.serieId }) : null,
      };
    })
  );
}

export async function getHistory() {
  const user = await requireUser();
  return await getHistoryQuery({ email: user.email });
}
