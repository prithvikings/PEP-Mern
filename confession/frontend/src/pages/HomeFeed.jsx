import { Search } from "lucide-react";
import { ConfessionCard } from "../components/feed/ConfessionCard";
import { CONFESSIONS } from "../data/mockData";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

export function HomeFeed() {
  const [user, setUser] = useState("Prithvi");
  return (
    <div className="min-h-screen bg-linear-bg">
      <Header />

      <div className="px-6 py-6 pb-20">
        <div className="w-full mx-auto flex flex-col gap-4">
          {CONFESSIONS.map((post) => (
            <ConfessionCard key={post.id} data={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Header() {
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-linear-border bg-linear-bg/80 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4">
        <div className="relative w-full max-w-sm group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-linear-text-muted transition-colors"
            size={16}
          />

          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search secrets..."
            className="w-full bg-transparent border border-linear-border text-linear-text text-[13px] rounded-sm py-2 pl-10 pr-14 focus:outline-none focus:ring-1 focus:ring-linear-border focus:border-linear-text-muted transition-all placeholder:text-zinc-600"
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 border border-linear-border bg-linear-surface/50 rounded text-[10px] font-medium text-linear-text-muted">
              <span className="text-[12px]">⌘</span>K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-linear-surface/50 p-1 rounded-md border border-linear-border">
          <button className="px-3 py-1 rounded text-xs font-semibold bg-linear-border text-linear-text shadow-sm transition-all cursor-pointer">
            Latest
          </button>
          <button className="px-3 py-1 rounded text-xs font-semibold text-linear-text-muted hover:text-linear-text hover:bg-white/5 transition-all cursor-pointer">
            Popular
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 px-6 pb-4 overflow-x-auto scrollbar-hide">
        {[
          "All",
          "Funny",
          "College",
          "Work",
          "Relationships",
          "Spiciest",
          "Deep Thoughts",
        ].map((filter, i) => (
          <button
            key={filter}
            className={cn(
              "px-2.5 py-1 text-[12px] font-medium rounded-sm transition-all border",
              i === 0
                ? "bg-black/5 dark:bg-white/10 text-linear-text border-black/10 dark:border-white/10 shadow-sm"
                : "text-linear-text-muted border-transparent hover:text-linear-text hover:bg-black/5 dark:hover:bg-white/5",
            )}
          >
            {filter}
          </button>
        ))}
      </div>
    </header>
  );
}
