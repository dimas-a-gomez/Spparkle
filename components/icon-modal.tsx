'use client';

import { useState, useEffect } from 'react';
import { X, Copy, Check, Code, Terminal, FileCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IconModalProps {
  icon: {
    name: string;
    content: string;
    innerContent: string;
    viewBox: string;
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
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!icon) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const svgCode = icon.content;
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
          className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <h2 className="text-xl font-display font-semibold text-zinc-900 dark:text-zinc-50 capitalize flex items-center gap-2">
              <span className="w-6 h-6 text-zinc-800 dark:text-zinc-200" dangerouslySetInnerHTML={{ __html: icon.content }} />
              {icon.name}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center justify-center p-12 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800/50">
              <div 
                className="w-32 h-32 text-zinc-900 dark:text-zinc-100"
                dangerouslySetInnerHTML={{ __html: icon.content }}
              />
            </div>

            <div className="grid gap-4">
              <CodeBlock
                title="SVG Code"
                icon={<Code className="w-4 h-4" />}
                code={svgCode}
                type="svg"
                copied={copiedType === 'svg'}
                onCopy={() => handleCopy(svgCode, 'svg')}
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
      <div className="relative group">
        <pre className="p-4 bg-zinc-900 dark:bg-zinc-950 text-zinc-100 dark:text-zinc-300 rounded-xl text-sm font-mono overflow-x-auto border border-zinc-800 dark:border-zinc-800/80">
          <code>{code}</code>
        </pre>
        <button
          onClick={onCopy}
          className="absolute top-3 right-3 p-2 bg-zinc-800 dark:bg-zinc-800/50 text-zinc-300 hover:text-white hover:bg-zinc-700 dark:hover:bg-zinc-700 rounded-lg transition-colors border border-zinc-700 dark:border-zinc-700/50"
          title="Copy code"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
