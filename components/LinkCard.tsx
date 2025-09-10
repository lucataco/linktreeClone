'use client';

import Image from "next/image";

interface LinkCardProps {
  href: string;
  title: string;
  image?: string;
  discontinued?: boolean;
  acquired?: boolean;
  priority?: boolean;
}

export default function LinkCard({
  href,
  title,
  image,
  discontinued,
  acquired,
  priority = false
}: LinkCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    // Prevent double-tap zoom on mobile
    e.preventDefault();
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Visit ${title}`}
      className="link-card relative flex items-center p-3 w-full rounded-xl bg-gray-100 mb-2 max-w-2xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-[64px]"
    >
      <div className="w-12 h-12 flex-shrink-0">
        {image && (
          <Image
            className="rounded-xl object-cover"
            alt={`${title} icon`}
            src={image}
            width={48}
            height={48}
            priority={priority}
            sizes="48px"
          />
        )}
      </div>
      <div className="flex-1 flex items-center justify-center px-4">
        <h2 className="font-semibold text-gray-700 text-center leading-tight">
          {title}
        </h2>
      </div>
      {(discontinued || acquired) && (
        <div className="flex-shrink-0 flex items-center">
          {discontinued && (
            <div className="bg-red-700 text-white text-sm rounded-full px-3 py-1 whitespace-nowrap shadow-sm">
              Discontinued
            </div>
          )}
          {acquired && (
            <div className="bg-emerald-700 text-white text-sm rounded-full px-3 py-1 whitespace-nowrap shadow-sm">
              Acquired
            </div>
          )}
        </div>
      )}
    </div>
  );
}
