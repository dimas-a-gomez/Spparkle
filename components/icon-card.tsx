'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface IconCardProps {
  icon: {
    name: string;
    path: string;
    viewBox: string;
    isSolid: boolean;
  };
  onClick: () => void;
}

export function IconCard({ icon, onClick }: IconCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(icon.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm dark:hover:shadow-none transition-all cursor-pointer aspect-square"
    >
      <svg 
        className="w-8 h-8 text-zinc-800 dark:text-zinc-200 mb-3 transition-transform group-hover:scale-110"
        viewBox={icon.viewBox}
        fill={icon.isSolid ? "currentColor" : "none"}
        stroke={icon.isSolid ? "none" : "currentColor"}
        strokeWidth={icon.isSolid ? undefined : "2"}
        strokeLinecap="round"
        strokeLinejoin="round"
        dangerouslySetInnerHTML={{ __html: icon.path }}
      />
      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate w-full text-center">
        {icon.name}
      </span>
      
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 text-zinc-400 dark:text-zinc-500 opacity-0 group-hover:opacity-100 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-all"
        title="Copy name"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
