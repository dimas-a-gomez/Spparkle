'use client';

import { useState, useMemo } from 'react';
import { IconCard } from './icon-card';
import { IconModal } from './icon-modal';
import { SearchBar } from './search-bar';
import { motion, AnimatePresence } from 'motion/react';

interface Icon {
  name: string;
  content: string;
  innerContent: string;
  viewBox: string;
}

interface IconGridProps {
  icons: Icon[];
}

export function IconGrid({ icons }: IconGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null);

  const filteredIcons = useMemo(() => {
    if (!searchQuery) return icons;
    return icons.filter((icon) =>
      icon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [icons, searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Spparkle Remix
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
          A beautiful, minimalist collection of custom SVG icons.
        </p>
      </div>

      <div className="mb-12">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {filteredIcons.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">No icons found matching &quot;{searchQuery}&quot;</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 text-zinc-900 dark:text-zinc-50 font-medium hover:underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6"
        >
          <AnimatePresence>
            {filteredIcons.map((icon) => (
              <motion.div
                key={icon.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <IconCard
                  icon={icon}
                  onClick={() => setSelectedIcon(icon)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {selectedIcon && (
        <IconModal
          icon={selectedIcon}
          onClose={() => setSelectedIcon(null)}
        />
      )}
    </div>
  );
}
