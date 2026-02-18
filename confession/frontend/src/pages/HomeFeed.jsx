import { Search } from "lucide-react";
import { ConfessionCard } from "../components/feed/ConfessionCard";
import { CONFESSIONS } from "../data/mockData";

export function HomeFeed() {
  return (
    <div className="min-h-screen bg-linear-bg">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-linear-border bg-linear-bg/80 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4">
          {/* Search */}
          <div className="relative w-full max-w-sm group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-linear-text-muted transition-colors"
              size={16}
            />
            <input
              type="text"
              placeholder="Search secrets..."
              className="w-full bg-transparent border border-linear-border text-linear-text text-[13px] rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-linear-border focus:border-linear-text-muted transition-all placeholder:text-zinc-600"
            />
          </div>

          {/* Sort Toggles */}
          <div className="flex items-center gap-1 bg-linear-surface/50 p-1 rounded-md border border-linear-border">
            <button className="px-3 py-1 rounded text-xs font-medium bg-linear-border text-linear-text shadow-sm transition-all cursor-pointer">
              Latest
            </button>
            <button className="px-3 py-1 rounded text-xs font-medium text-linear-text-muted hover:text-linear-text hover:bg-white/5 transition-all cursor-pointer">
              Popular
            </button>
          </div>
        </div>

        {/* Filter Chips */}
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
              className={`
                flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium border transition-all cursor-pointer
                ${
                  i === 0
                    ? "bg-linear-text text-linear-bg border-linear-text"
                    : "bg-transparent text-linear-text-muted hover:text-linear-text hover:bg-linear-surface border border-linear-border"
                }
              `}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      {/* Feed Content */}
      <div className="px-6 py-6 pb-20">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {CONFESSIONS.map((post) => (
            <ConfessionCard key={post.id} data={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
