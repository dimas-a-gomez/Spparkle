import { Header } from '@/components/header';
import { MainContent } from '@/components/main-content';
import iconsData from '@/public/icons.json';
import avatarsData from '@/public/avatars.json';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-zinc-50 relative pt-16">
      <Header />
      <MainContent iconsData={iconsData} avatarsData={avatarsData} />
      <footer className="w-full py-8 text-center text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800">
        Sparkkle &bull; 2026 &bull; By Dimas Gómez | Under Apache License 2.0
      </footer>
    </main>
  );
}
