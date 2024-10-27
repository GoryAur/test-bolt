"use client";

import { useContent, type Content } from '@/lib/content';
import { ContentCard } from '@/components/content-card';
import { ContentGrid } from '@/components/content-grid';
import { SearchBar } from '@/components/search-bar';

export default function BrowsePage() {
  const contents = useContent((state) => state.contents);
  const featuredContent = contents[0];

  return (
    <main className="min-h-screen bg-background">
      {featuredContent && (
        <ContentCard content={featuredContent} variant="featured" />
      )}

      <div className="space-y-8 py-8">
        <ContentGrid
          title="Trending Now"
          filter={(content) => content.trending === true}
        />
        <ContentGrid
          title="Popular Movies"
          filter={(content) => content.type === 'movie'}
        />
        <ContentGrid
          title="Popular Series"
          filter={(content) => content.type === 'series'}
        />
      </div>
    </main>
  );
}