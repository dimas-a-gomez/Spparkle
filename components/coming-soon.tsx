export function ComingSoon({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center text-center">
      <div className="inline-flex items-center justify-center p-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl mb-8 text-zinc-900 dark:text-zinc-50">
        {icon}
      </div>
      <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
        {title}
      </h2>
      <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-8">
        {description}
      </p>
      <div className="inline-flex items-center justify-center px-6 py-2 border border-zinc-200 dark:border-zinc-800 rounded-full text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-950">
        Coming Soon
      </div>
    </div>
  );
}
