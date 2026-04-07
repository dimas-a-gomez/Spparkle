'use client';

import { useState } from 'react';
import { IconGrid } from './icon-grid';
import { ComingSoon } from './coming-soon';
import { motion, AnimatePresence } from 'motion/react';
import { Shapes, User, Type, Smile, Box, Image as ImageIcon, Palette, Music, Hexagon } from 'lucide-react';

interface MainContentProps {
  iconsData: any[];
  avatarsData: any[];
}

type TabId = 'icons' | 'avatars' | 'fonts' | 'emojis' | '3d-design' | 'illustrations' | 'palette' | 'music' | '3d-objects';

const TABS: { id: TabId; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'icons', label: 'Icons', icon: <Shapes className="w-5 h-5" />, description: 'A beautiful, minimalist collection of custom SVG icons.' },
  { id: 'avatars', label: 'Avatars', icon: <User className="w-5 h-5" />, description: 'A collection of beautiful, diverse avatars for your projects.' },
  { id: 'fonts', label: 'Fonts', icon: <Type className="w-5 h-5" />, description: 'A curated collection of beautiful, open-source typography.' },
  { id: 'emojis', label: 'Emojis', icon: <Smile className="w-5 h-5" />, description: 'Expressive and fun emojis for your applications.' },
  { id: '3d-design', label: '3D Design', icon: <Box className="w-5 h-5" />, description: 'Stunning 3D design elements and assets.' },
  { id: 'illustrations', label: 'Illustrations', icon: <ImageIcon className="w-5 h-5" />, description: 'Hand-crafted illustrations to bring your UI to life.' },
  { id: 'palette', label: 'Palette', icon: <Palette className="w-5 h-5" />, description: 'Curated color palettes for perfect harmony.' },
  { id: 'music', label: 'Music', icon: <Music className="w-5 h-5" />, description: 'Royalty-free music tracks and sound effects.' },
  { id: '3d-objects', label: '3D Objects', icon: <Hexagon className="w-5 h-5" />, description: 'Ready-to-use 3D objects and models.' },
];

export function MainContent({ iconsData, avatarsData }: MainContentProps) {
  const [activeTab, setActiveTab] = useState<TabId>('icons');

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex overflow-x-auto hide-scrollbar space-x-1 bg-zinc-200/50 dark:bg-zinc-800/50 p-1 rounded-xl w-fit mx-auto max-w-full">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
              }`}
              title={tab.label}
            >
              {tab.icon}
              {activeTab === tab.id && <span>{tab.label}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-grow relative">
        <AnimatePresence mode="wait">
          {activeTab === 'icons' ? (
            <motion.div key="icons" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <IconGrid icons={iconsData} />
            </motion.div>
          ) : (
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <ComingSoon 
                title={TABS.find(t => t.id === activeTab)?.label || ''} 
                description={TABS.find(t => t.id === activeTab)?.description || ''}
                icon={<div className="scale-150">{TABS.find(t => t.id === activeTab)?.icon}</div>}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
