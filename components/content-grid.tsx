"use client";

import { ContentCard } from '@/components/content-card';
import { useContent } from '@/lib/content';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface ContentGridProps {
  title: string;
  filter?: (content: ReturnType<typeof useContent.getState>['contents'][0]) => boolean;
}

export function ContentGrid({ title, filter }: ContentGridProps) {
  const contents = useContent((state) => state.contents);
  const filteredContents = filter ? contents.filter(filter) : contents;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold px-4">{title}</h2>
      <ScrollArea>
        <div className="flex space-x-4 pb-4 px-4">
          {filteredContents.map((content) => (
            <div key={content.id} className="w-80 flex-none">
              <ContentCard content={content} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}