'use client';

import { useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AvatarModalProps {
  avatar: {
    name: string;
    path: string;
    viewBox: string;
    isSolid: boolean;
  } | null;
  onClose: () => void;
}

export function AvatarModal({ avatar, onClose }: AvatarModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    
    if (avatar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [avatar, onClose]);

  if (!avatar) return null;

  const handleDownload = () => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="${avatar.viewBox}" fill="${avatar.isSolid ? 'currentColor' : 'none'}" stroke="${avatar.isSolid ? 'none' : 'currentColor'}" stroke-width="${avatar.isSolid ? '0' : '2'}" stroke-linecap="round" stroke-linejoin="round">\n  ${avatar.path}\n</svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spkr-avatar-${avatar.name}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col max-h-[90vh]"
        >
          <div className="flex-none flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <div className="flex items-center gap-2">
              <button 
                onClick={onClose} 
                className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors flex items-center justify-center group" 
                title="Close"
              >
                <X className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
              </button>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <h2 className="text-sm font-display font-medium text-zinc-600 dark:text-zinc-400 capitalize absolute left-1/2 -translate-x-1/2">
              {avatar.name}.svg
            </h2>
            <div className="w-16" /> {/* Spacer to balance the header */}
          </div>

          <div className="p-6 overflow-y-auto">
            <div className="relative flex items-center justify-center p-16 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800/50 overflow-hidden text-zinc-900 dark:text-zinc-100">
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.1]" 
                style={{ 
                  backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', 
                  backgroundSize: '24px 24px' 
                }} 
              />
              <svg 
                className="relative z-10 w-[120px] h-[120px]"
                viewBox={avatar.viewBox}
                fill={avatar.isSolid ? "currentColor" : "none"}
                stroke={avatar.isSolid ? "none" : "currentColor"}
                strokeWidth={avatar.isSolid ? undefined : "2"}
                strokeLinecap="round"
                strokeLinejoin="round"
                dangerouslySetInnerHTML={{ __html: avatar.path }}
              />
              
              <button
                onClick={handleDownload}
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm z-20"
              >
                <Download className="w-4 h-4" />
                Download SVG
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
