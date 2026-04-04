'use client';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

function CodeBlock({ inline, className, children, ...props }: any) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const codeString = String(children).replace(/\n$/, '');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!inline && match) {
    return (
      <div className="my-8 rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 shadow-xl bg-white dark:bg-zinc-900">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200/50 dark:hover:text-zinc-300 dark:hover:bg-zinc-800/50 transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <div className="p-4 overflow-x-auto bg-zinc-900 dark:bg-zinc-950">
          <pre className="text-sm font-mono text-zinc-100 dark:text-zinc-300 whitespace-pre-wrap break-all">
            <code>{codeString}</code>
          </pre>
        </div>
      </div>
    );
  }

  return (
    <code className="bg-zinc-100 dark:bg-zinc-800/50 px-1.5 py-0.5 rounded-md text-sm font-mono text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/50" {...props}>
      {children}
    </code>
  );
}

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="markdown-body">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-zinc-900 dark:text-zinc-50 mt-12 mb-6">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-display font-medium text-zinc-900 dark:text-zinc-50 mt-8 mb-4">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-6 text-lg text-zinc-600 dark:text-zinc-400">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-6 text-lg text-zinc-600 dark:text-zinc-400">
              {children}
            </ol>
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-4">
              {children}
            </a>
          ),
          code: CodeBlock
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
