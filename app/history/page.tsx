'use server';
import { getHistory } from '../server/history';
import { requireUser } from '../server/session';
import { HistoryList } from './HistoryList';

export default async function History() {
  const user = await requireUser();
  const initialHistoryItems = await getHistory();
  return <HistoryList user={user} initialHistoryItems={initialHistoryItems} />;
}
