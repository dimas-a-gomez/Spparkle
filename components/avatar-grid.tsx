'use client';

import { useState, useMemo } from 'react';
import { AvatarCard } from './avatar-card';
import { AvatarModal } from './avatar-modal';
import { SearchBar } from './search-bar';
import { motion, AnimatePresence } from 'motion/react';

interface Avatar {
  name: string;
  path: string;
  viewBox: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
}

interface AvatarGridProps {
  avatars: Avatar[];
}

export function AvatarGrid({ avatars }: AvatarGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  const filteredAvatars = useMemo(() => {
    if (!searchQuery) return avatars;
    return avatars.filter((avatar) =>
      avatar.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [avatars, searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Sparkkle Avatars
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
          A collection of vector-style characters and avatars.
        </p>
      </div>

      <div className="mb-12">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {filteredAvatars.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">No avatars found matching &quot;{searchQuery}&quot;</p>
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
            {filteredAvatars.map((avatar) => (
              <motion.div
                key={avatar.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <AvatarCard
                  avatar={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {selectedAvatar && (
        <AvatarModal
          avatar={selectedAvatar}
          onClose={() => setSelectedAvatar(null)}
        />
      )}
    </div>
  );
}
