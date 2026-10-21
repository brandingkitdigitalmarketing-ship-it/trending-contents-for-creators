import { ALL_PLATFORMS } from '@/data/seedTrends';
import PlatformClient from './PlatformClient';

export function generateStaticParams() {
  return ALL_PLATFORMS.map((p) => ({
    platform: p.id,
  }));
}

export default function PlatformPage() {
  return <PlatformClient />;
}
