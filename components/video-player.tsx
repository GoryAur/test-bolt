"use client";

import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Maximize, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  url: string;
  title: string;
  onClose?: () => void;
  autoplay?: boolean;
  className?: string;
}

export function VideoPlayer({ url, title, onClose, autoplay = true, className }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(autoplay);
  const [muted, setMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("relative group", className)}>
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        muted={muted}
        controls={hasStarted}
        style={{ backgroundColor: 'black' }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {!hasStarted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <Button
              size="lg"
              onClick={() => setHasStarted(true)}
            >
              <Play className="mr-2 h-5 w-5" /> Start Playing
            </Button>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMuted(!muted)}
          >
            {muted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const elem = document.documentElement;
              if (elem.requestFullscreen) {
                elem.requestFullscreen();
              }
            }}
          >
            <Maximize className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}