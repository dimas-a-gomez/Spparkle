'use client';

import { useState } from 'react';
import { IconGrid } from './icon-grid';
import { AvatarGrid } from './avatar-grid';
import { FontsComingSoon } from './fonts-coming-soon';
import { motion, AnimatePresence } from 'motion/react';

interface MainContentProps {
  iconsData: any[];
  avatarsData: any[];
}

export function MainContent({ iconsData, avatarsData }: MainContentProps) {
  const [activeTab, setActiveTab] = useState<'icons' | 'avatars' | 'fonts'>('icons');

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex space-x-1 bg-zinc-200/50 dark:bg-zinc-800/50 p-1 rounded-xl w-full max-w-md mx-auto">
          {(['icons', 'avatars', 'fonts'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg capitalize transition-all ${
                activeTab === tab
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-grow relative">
        <AnimatePresence mode="wait">
          {activeTab === 'icons' && (
            <motion.div key="icons" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <IconGrid icons={iconsData} />
            </motion.div>
          )}
          {activeTab === 'avatars' && (
            <motion.div key="avatars" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <AvatarGrid avatars={avatarsData} />
            </motion.div>
          )}
          {activeTab === 'fonts' && (
            <motion.div key="fonts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <FontsComingSoon />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
