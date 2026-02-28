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
          {/* Team Card */}
          <div className="rounded-xl overflow-hidden shadow-sm">
            <TeamSection content={team} />
          </div>
          {/* Founder Card */}
          <div className="rounded-xl overflow-hidden shadow-sm">
            <FounderSection content={founder} />
          </div>
        </div>
      </div>
    </section>
  );
}
