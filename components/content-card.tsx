"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { VideoPlayer } from '@/components/video-player';
import { Play, Info } from 'lucide-react';
import { type Content } from '@/lib/content';

interface ContentCardProps {
  content: Content;
  variant?: 'default' | 'featured';
}

export function ContentCard({ content, variant = 'default' }: ContentCardProps) {
  const [showDialog, setShowDialog] = useState(false);

  if (variant === 'featured') {
    return (
      <div className="relative h-[70vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${content.thumbnailUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-2xl mx-4 md:mx-8 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">{content.title}</h1>
            <p className="text-lg text-foreground/80">{content.description}</p>
            <div className="flex space-x-4">
              <Button size="lg" onClick={() => setShowDialog(true)}>
                <Play className="mr-2 h-5 w-5" /> Play
              </Button>
              <Button size="lg" variant="secondary">
                <Info className="mr-2 h-5 w-5" /> More Info
              </Button>
            </div>
          </div>
        </div>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-6xl h-[80vh] p-0">
            <VideoPlayer
              url={content.videoUrl}
              title={content.title}
              onClose={() => setShowDialog(false)}
              className="w-full h-full"
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <Card className="group relative aspect-video overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundImage: `url(${content.thumbnailUrl})` }}
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
          <div className="flex items-center space-x-2 text-sm">
            <span>{content.rating}</span>
            <span>•</span>
            <span>{content.duration}</span>
          </div>
          <div className="flex space-x-2 mt-2">
            <Button size="sm" onClick={() => setShowDialog(true)}>
              <Play className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary">
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-6xl h-[80vh] p-0">
          <VideoPlayer
            url={content.videoUrl}
            title={content.title}
            onClose={() => setShowDialog(false)}
            className="w-full h-full"
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}