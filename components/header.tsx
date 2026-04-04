'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <header className="w-full flex justify-end items-center p-4 sm:px-8 gap-4 absolute top-0 right-0 z-10">
      <Link 
        href="/docs" 
        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors p-2 rounded-full hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
        aria-label="Documentation"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 6H16V8H8V6Z" fill="currentColor"/>
          <path d="M16 10H8V12H16V10Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M20 2H4V22H20V2ZM6 16H18V4H6V16ZM6 18V20H18V18H6Z" fill="currentColor"/>
        </svg>
      </Link>
      <a 
        href="https://github.com" 
        target="_blank" 
        rel="noreferrer" 
        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors p-2 rounded-full hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
        aria-label="GitHub Repository"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      </a>
      <a 
        href="https://discord.com" 
        target="_blank" 
        rel="noreferrer" 
        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors p-2 rounded-full hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
        aria-label="Discord Server"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      </a>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors p-2 rounded-full hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
        aria-label="Toggle theme"
      >
        {mounted ? (
          theme === 'dark' ? (
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 19.75V22H13V19.75H11Z" fill="currentColor"/>
              <path d="M11 2V4.25H13V2H11Z" fill="currentColor"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12ZM12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8Z" fill="currentColor"/>
              <path d="M2 11H4.25V13H2V11Z" fill="currentColor"/>
              <path d="M19.75 11H22V13H19.75V11Z" fill="currentColor"/>
              <path d="M5.63602 4.2218L7.22701 5.81279L5.81279 7.227L4.2218 5.63601L5.63602 4.2218Z" fill="currentColor"/>
              <path d="M18.1872 16.773L19.7782 18.364L18.364 19.7782L16.773 18.1872L18.1872 16.773Z" fill="currentColor"/>
              <path d="M5.81279 16.773L4.2218 18.364L5.63601 19.7782L7.227 18.1872L5.81279 16.773Z" fill="currentColor"/>
              <path d="M18.364 4.2218L16.773 5.81279L18.1872 7.227L19.7782 5.63601L18.364 4.2218Z" fill="currentColor"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="none" strokeLinecap="round" strokeLinejoin="round">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C14.5007 19 16.6951 17.6887 17.9331 15.7163C17.122 16.1218 16.2066 16.35 15.2375 16.35C11.9031 16.35 9.2 13.6469 9.2 10.3125C9.2 8.02376 10.4735 6.03246 12.3506 5.00861C12.2345 5.00289 12.1176 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C13.9337 3 15.7276 3.61095 17.1955 4.65026L16.3442 6.4283C15.9937 6.32866 15.6227 6.275 15.2375 6.275C13.0077 6.275 11.2 8.08265 11.2 10.3125C11.2 12.5423 13.0077 14.35 15.2375 14.35C17.0038 14.35 18.5076 13.2152 19.0547 11.632L20.9999 11.9536C21 11.969 21 11.9845 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="currentColor"/>
            </svg>
          )
        ) : (
          <div className="w-5 h-5" />
        )}
      </button>
    </header>
  );
}
