import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Trophy, User, Calendar, Star } from 'lucide-react';

interface HallOfFameListItemProps {
  entry: {
    slug: string;
    title: string;
    category: string;
    year: number;
    description: string;
    story: string;
    imageUrl: string;
    featured: boolean;
    published: boolean;
  };
}

export function HallOfFameListItem({ entry }: HallOfFameListItemProps) {
  const categoryLabels: Record<string, string> = {
    'MEMBER_OF_THE_YEAR': 'Member of the Year',
    'BEST_CONTRIBUTOR': 'Best Contributor',
    'LEADERSHIP': 'Leadership',
    'TOURNAMENT_CHAMPION': 'Tournament Champion',
    'COMMUNITY_SERVICE': 'Community Service',
    'SPECIAL_RECOGNITION': 'Special Recognition',
    'HISTORICAL': 'Historical',
    'OTHER': 'Other',
  };

  const category = categoryLabels[entry.category] || entry.category;

  return (
    <article
      key={entry.slug}
      className={`group rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 p-5 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-(--color-gekko-500)/40 hover:bg-(--color-bg-card)/60 hover:shadow-[0_8px_16px_-3px_rgba(0,0,0,0.3)]`}
    >
      <Image
        src={entry.imageUrl}
        alt={entry.title}
        width={400}
        height={250}
        className="rounded-t-xl object-cover h-48 w-full mb-4"
        loading="lazy"
      />
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-(family-name:--font-heading) text-xl font-bold tracking-tight text-(--color-text-primary) line-clamp-2">
            {entry.title}
          </h3>
          <p className="mt-2 text-(--color-text-secondary) text-sm line-clamp-3">
            {entry.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Star className="size-4 text-(--color-gekko-400)" />
          <span className="text-xs text-(--color-gekko-400) font-medium">
            {entry.year}
          </span>
        </div>
      </div>
      <footer className="mt-3 text-xs text-(--color-text-secondary)">
        {category}
      </footer>
      <a
        href={`/hall-of-fame/${entry.slug}`}
        className="mt-3 text-(--color-gekko-400) hover:text-(--color-text-primary) transition-colors flex items-center gap-1"
      >
        View details
        <svg
          className="size-3"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M9 18l6-6-6-6m5 6l6-6 6 6m-6-6l-6 6 6 6" />
        </svg>
      </a>
    </article>
  );
}
