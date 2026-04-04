import fs from 'fs';
import path from 'path';
import { Header } from '@/components/header';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MarkdownRenderer } from '@/components/markdown-renderer';

export default async function DocsPage() {
  const filePath = path.join(process.cwd(), 'content', 'docs', 'installation.mdx');
  const content = fs.readFileSync(filePath, 'utf8');

  return (
    <main className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-zinc-50 relative pt-16">
      <Header />
      
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <MarkdownRenderer content={content} />
      </div>

      <footer className="w-full py-8 text-center text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
        Copyright 2026 | Spparkle | Under Apache License 2.0.
      </footer>
    </main>
  );
}
