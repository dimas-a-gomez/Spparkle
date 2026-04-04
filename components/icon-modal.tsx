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
    strokeLinecap?: string;
    strokeLinejoin?: string;
    width?: string;
    height?: string;
    xmlns?: string;
  } | null;
  onClose: () => void;
}

export function IconModal({ icon, onClose }: IconModalProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'svg' | 'html' | 'blogger' | 'react' | 'wordpress'>('svg');

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

  const getSvgCode = () => {
    const attrs = [];
    if (icon.xmlns) attrs.push(`xmlns="${icon.xmlns}"`);
    if (icon.width) attrs.push(`width="${icon.width}"`);
    if (icon.height) attrs.push(`height="${icon.height}"`);
    if (icon.viewBox) attrs.push(`viewBox="${icon.viewBox}"`);
    if (icon.fill) attrs.push(`fill="${icon.fill}"`);
    if (icon.stroke) attrs.push(`stroke="${icon.stroke}"`);
    if (icon.strokeWidth) attrs.push(`stroke-width="${icon.strokeWidth}"`);
    if (icon.strokeLinecap) attrs.push(`stroke-linecap="${icon.strokeLinecap}"`);
    if (icon.strokeLinejoin) attrs.push(`stroke-linejoin="${icon.strokeLinejoin}"`);
    
    return `<svg ${attrs.join(' ')}>\n  ${icon.path}\n</svg>`;
  };

  const svgCode = getSvgCode();
  const htmlCode = `<i class="icon-${icon.name}"></i>`;
  const bloggerCode = `<b:include name='icon-${icon.name}'/>`;
  const reactCode = `<Icon name="${icon.name}" />`;
  const wordpressCode = `[spkr icon="${icon.name}"]`;

  const tabs = [
    { id: 'svg', label: 'SVG', icon: <Code className="w-4 h-4" />, code: svgCode },
    { id: 'html', label: 'HTML', icon: <FileCode className="w-4 h-4" />, code: htmlCode },
    { id: 'blogger', label: 'Blogger', icon: <Terminal className="w-4 h-4" />, code: bloggerCode },
    { id: 'react', label: 'React', icon: <Code className="w-4 h-4" />, code: reactCode },
    { id: 'wordpress', label: 'WordPress', icon: <Terminal className="w-4 h-4" />, code: wordpressCode },
  ] as const;

  const activeTabData = tabs.find(t => t.id === activeTab) || tabs[0];

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
                fill={icon.fill}
                stroke={icon.stroke}
                strokeWidth={icon.strokeWidth}
                strokeLinecap={icon.strokeLinecap as any}
                strokeLinejoin={icon.strokeLinejoin as any}
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

            <div className="flex flex-col gap-4">
              <div className="flex overflow-x-auto hide-scrollbar space-x-1 bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-xl">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-sm'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                >
                  <CodeBlock
                    code={activeTabData.code}
                    copied={copiedType === activeTab}
                    onCopy={() => handleCopy(activeTabData.code, activeTab)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function CodeBlock({ code, copied, onCopy }: any) {
  return (
    <div className="flex flex-col gap-2">
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
