'use client';

import { useState, useEffect } from 'react';
import { X, Copy, Check, Code, Terminal, FileCode, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IconModalProps {
  icon: {
    name: string;
    path: string;
    viewBox: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
    cleanSvg?: string;
  } | null;
  onClose: () => void;
}

export function IconModal({ icon, onClose }: IconModalProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    
    if (icon) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [icon, onClose]);

  if (!icon) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="${icon.viewBox}" fill="${icon.fill || 'none'}" stroke="${icon.stroke || 'none'}" ${icon.strokeWidth ? `stroke-width="${icon.strokeWidth}"` : ''} stroke-linecap="round" stroke-linejoin="round">\n  ${icon.path}\n</svg>`;
  const htmlCode = `<i class="icon-${icon.name}"></i>`;
  const bloggerCode = `<b:include name='icon-${icon.name}'/>`;

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
          className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col max-h-[90vh]"
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
              {icon.name}.svg
            </h2>
            <div className="w-16" /> {/* Spacer to balance the header */}
          </div>

          <div className="p-6 overflow-y-auto space-y-6">
            <div className="relative flex items-center justify-center p-12 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800/50 overflow-hidden text-zinc-900 dark:text-zinc-100">
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.1]" 
                style={{ 
                  backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', 
                  backgroundSize: '24px 24px' 
                }} 
              />
              <svg 
                className="relative z-10 w-[80px] h-[80px]"
                viewBox={icon.viewBox}
                fill={icon.fill || "none"}
                stroke={icon.stroke || "none"}
                strokeWidth={icon.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                dangerouslySetInnerHTML={{ __html: icon.path }}
              />
              
              <button
                onClick={() => {
                  const blob = new Blob([svgCode], { type: 'image/svg+xml' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `spkr-${icon.name}.svg`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm z-20"
              >
                <Download className="w-4 h-4" />
                Download SVG
              </button>
            </div>

            <div className="grid gap-4">
              <CodeBlock
                title="React Component"
                icon={<Code className="w-4 h-4" />}
                code={`<Icon name="${icon.name}" />`}
                type="react"
                copied={copiedType === 'react'}
                onCopy={() => handleCopy(`<Icon name="${icon.name}" />`, 'react')}
              />
              
              <CodeBlock
                title="WordPress Shortcode"
                icon={<Code className="w-4 h-4" />}
                code={`[spkr icon="${icon.name}"]`}
                type="wordpress"
                copied={copiedType === 'wordpress'}
                onCopy={() => handleCopy(`[spkr icon="${icon.name}"]`, 'wordpress')}
              />
              
              <CodeBlock
                title="SVG Code"
                icon={<Code className="w-4 h-4" />}
                code={icon.cleanSvg || svgCode}
                type="svg"
                copied={copiedType === 'svg'}
                onCopy={() => handleCopy(icon.cleanSvg || svgCode, 'svg')}
              />
              
              <CodeBlock
                title="HTML Element"
                icon={<FileCode className="w-4 h-4" />}
                code={htmlCode}
                type="html"
                copied={copiedType === 'html'}
                onCopy={() => handleCopy(htmlCode, 'html')}
              />
              
              <CodeBlock
                title="Blogger Include"
                icon={<Terminal className="w-4 h-4" />}
                code={bloggerCode}
                type="blogger"
                copied={copiedType === 'blogger'}
                onCopy={() => handleCopy(bloggerCode, 'blogger')}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function CodeBlock({ title, icon, code, type, copied, onCopy }: any) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
          {icon}
          {title}
        </label>
      </div>
      <div className="relative group cursor-pointer" onClick={onCopy} title="Click to copy">
        <pre className="p-4 pr-12 bg-zinc-900 dark:bg-zinc-950 text-zinc-100 dark:text-zinc-300 rounded-xl text-sm font-mono border border-zinc-800 dark:border-zinc-800/80 transition-colors hover:border-zinc-700 dark:hover:border-zinc-700 whitespace-pre-wrap break-all">
          <code>{code}</code>
        </pre>
        <button
          className="absolute top-3 right-3 p-2 bg-zinc-800 dark:bg-zinc-800/50 text-zinc-300 hover:text-white hover:bg-zinc-700 dark:hover:bg-zinc-700 rounded-lg transition-colors border border-zinc-700 dark:border-zinc-700/50"
          title="Copy code"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
