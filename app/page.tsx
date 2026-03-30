import { IconGrid } from '@/components/icon-grid';
import { Header } from '@/components/header';
import iconsData from '@/public/icons.json';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-zinc-50 relative pt-16">
      <Header />
      <div className="flex-grow">
        <IconGrid icons={iconsData} />
      </div>
      <footer className="w-full py-8 text-center text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800">
        Spparkle Remix Icons &bull; 2026 &bull; By Dimas G&oacute;mez | Under Apache License 2.0
      </footer>
    </main>
  );
}
