"use client";

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useContent } from '@/lib/content';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { contents, searchQuery, setSearchQuery } = useContent();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (id: string) => {
    setOpen(false);
    router.push(`/browse/${id}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search movies and TV shows..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Movies & TV Shows">
            {contents.map((content) => (
              <CommandItem
                key={content.id}
                onSelect={() => handleSelect(content.id)}
              >
                <div className="flex items-center">
                  <div
                    className="h-10 w-16 bg-cover bg-center rounded mr-2"
                    style={{ backgroundImage: `url(${content.thumbnailUrl})` }}
                  />
                  <div>
                    <div className="font-medium">{content.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {content.type} • {content.year}
                    </div>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}