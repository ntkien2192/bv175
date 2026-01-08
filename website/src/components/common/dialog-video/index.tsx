'use client';

import * as React from 'react';

import { X } from 'lucide-react';
import { useScrollSmoother } from '@/src/providers/ScrollSmootherProvider';
import { cn } from '@/src/lib/utils';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';

interface DialogVideoProps {
  open: any;
  trigger: React.ReactNode;
  className?: string;
  onToggle: React.Dispatch<React.SetStateAction<boolean>>;
  videoUrl: string;
}

export default function DialogVideo({
  open,
  trigger,
  className,
  onToggle,
  videoUrl,
}: DialogVideoProps) {
  const { smoother } = useScrollSmoother();

  return (
    <Dialog open={open} onOpenChange={onToggle}>
      <DialogTrigger
        onClick={() => smoother?.paused(true)}
        asChild
        className="!p-0"
      >
        {trigger}
      </DialogTrigger>
      <DialogContent
        className={cn('!scrollbar-hidden bg-black/80 !p-0', className)}
      >
        <div className="hidden">
          <DialogTitle>Video</DialogTitle>
          <DialogDescription>Video</DialogDescription>
        </div>
        <div
          onClick={() => {
            onToggle(false);
            smoother?.paused(false);
          }}
          className="flex h-full w-full cursor-auto items-center justify-center"
        >
          {open && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-video w-[90%] rounded-[2px] border-[2px] border-primary-600 bg-black md:w-[80%] xl:w-[70%]"
            >
              <iframe
                title="Video Bệnh viện Quân y 175"
                className="!m-0 h-full w-full object-cover !p-0"
                style={{ display: 'block', border: 'none' }}
                src={`https://www.youtube-nocookie.com/embed/${videoUrl}?autoplay=1&modestbranding=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              <DialogClose
                onClick={() => smoother?.paused(false)}
                className="data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary-600 p-[6px] focus:outline-none disabled:pointer-events-none md:p-2"
              >
                <X className="h-4 w-4 invert" />
              </DialogClose>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
