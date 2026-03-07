import { TeamContent, FounderContent } from '@/lib/types';
import TeamSection from './TeamSection';
import FounderSection from './FounderSection';

interface Props {
  team: TeamContent;
  founder: FounderContent;
}

export default function TeamFounderSection({ team, founder }: Props) {
  return (
    <section className="py-6 md:py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Founder Card - first on desktop (left), second on mobile */}
          <div className="rounded-xl overflow-hidden shadow-sm order-2 lg:order-1">
            <FounderSection content={founder} />
          </div>
          {/* Team Card - first on mobile, second on desktop (right) */}
          <div className="rounded-xl overflow-hidden shadow-sm order-1 lg:order-2">
            <TeamSection content={team} />
          </div>
        </div>
      </div>
    </section>
  );
}
