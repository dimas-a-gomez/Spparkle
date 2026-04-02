'use client';

import { Download } from 'lucide-react';

interface AvatarCardProps {
  avatar: {
    name: string;
    path: string;
    viewBox: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
  };
  onClick: () => void;
}

export function AvatarCard({ avatar, onClick }: AvatarCardProps) {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="${avatar.viewBox}" fill="${avatar.fill || 'none'}" stroke="${avatar.stroke || 'none'}" ${avatar.strokeWidth ? `stroke-width="${avatar.strokeWidth}"` : ''} stroke-linecap="round" stroke-linejoin="round">\n  ${avatar.path}\n</svg>`;
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
    <div
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm dark:hover:shadow-none transition-all cursor-pointer aspect-square"
    >
      <svg 
        className="w-12 h-12 text-zinc-800 dark:text-zinc-200 mb-3 transition-transform group-hover:scale-110"
        viewBox={avatar.viewBox}
        fill={avatar.fill || "none"}
        stroke={avatar.stroke || "none"}
        strokeWidth={avatar.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        dangerouslySetInnerHTML={{ __html: avatar.path }}
      />
      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate w-full text-center">
        {avatar.name}
      </span>
      
      <button
        onClick={handleDownload}
        className="absolute top-2 right-2 p-1.5 text-zinc-400 dark:text-zinc-500 opacity-0 group-hover:opacity-100 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-all"
        title="Download SVG"
      >
        <Download className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
