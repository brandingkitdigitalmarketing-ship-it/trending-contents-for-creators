import { SEED_TRENDS } from '@/data/seedTrends';
import TrendDetailsClient from './TrendDetailsClient';

export function generateStaticParams() {
  return SEED_TRENDS.map((t) => ({
    id: t.id,
  }));
}

export default function TrendDetailsPage() {
  return <TrendDetailsClient />;
}
