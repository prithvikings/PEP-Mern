import {
  Search,
  Command,
  ChevronDown,
  MoreHorizontal,
  Heart,
  MessageSquare,
  Share2,
  Coffee,
  Briefcase,
  Smartphone,
  Dog,
} from "lucide-react";
import { TRENDING_POSTS } from "../data/mockData";
import { cn } from "../lib/utils";

// Icon mapping to match your reference image style
const getIcon = (iconName) => {
  switch (iconName) {
    case "Coffee":
      return <Coffee size={14} />;
    case "Briefcase":
      return <Briefcase size={14} />;
    case "Smartphone":
      return <Smartphone size={14} />;
    case "Dog":
      return <Dog size={14} />;
    default:
      return <Coffee size={14} />;
  }
};

export function TrendingTea() {
  return (
    <div className="min-h-screen bg-linear-bg text-linear-text font-sans">
      {/* Search & Filter Header */}
      <div className="sticky top-0 z-20 bg-linear-bg/95 backdrop-blur-xl border-b border-linear-border">
        <div className="px-6 pt-6 pb-4">
          {/* Search Input */}
          <div className="relative mb-6">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              size={16}
            />
            <input
              type="text"
              placeholder="Search for secrets, tags, or keywords..."
              className="w-full bg-linear-surface/50 border border-linear-border rounded-lg py-2.5 pl-10 pr-12 text-sm text-linear-text focus:outline-none focus:ring-1 focus:ring-linear-border transition-all placeholder:text-zinc-600 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 border border-linear-border rounded px-1.5 py-0.5 flex items-center gap-1 bg-linear-surface">
              <Command size={10} className="text-zinc-500" />
              <span className="text-[10px] font-medium text-zinc-500">K</span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold text-linear-text-muted uppercase tracking-wider">
                Filter By:
              </span>
              <div className="flex gap-1">
                {["All", "Funny", "Work", "Relationships", "Embarrassing"].map(
                  (filter, i) => (
                    <button
                      key={filter}
                      className={cn(
                        "px-3 py-1 text-[13px] font-medium rounded-md transition-all",
                        i === 0
                          ? "bg-linear-surface text-linear-text border border-linear-border shadow-sm"
                          : "text-linear-text-muted hover:text-linear-text hover:bg-white/5",
                      )}
                    >
                      {filter}
                    </button>
                  ),
                )}
              </div>
            </div>

            <button className="flex items-center gap-1.5 text-[13px] font-medium text-linear-text-muted hover:text-linear-text transition-colors">
              <span>Sort by: Trending</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Feed List */}
      <div className="p-6 pb-20">
        <h2 className="text-xs font-bold text-linear-text-muted uppercase tracking-wider mb-4">
          Trending Confessions
        </h2>

        <div className="flex flex-col gap-4">
          {TRENDING_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative p-5 rounded-xl border border-linear-border bg-transparent hover:bg-linear-surface/30 transition-all duration-200 cursor-pointer"
            >
              {/* Top Row: Icon + Author + Menu */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-linear-text-muted">
                  <span className="text-zinc-500">{getIcon(post.icon)}</span>
                  <span className="text-[12px] font-medium">{post.author}</span>
                </div>
                <button className="text-zinc-600 hover:text-linear-text transition-colors opacity-0 group-hover:opacity-100">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              {/* Content */}
              <p className="text-[15px] text-linear-text/90 leading-relaxed font-normal mb-4">
                {post.content}
              </p>

              {/* Bottom Row: Interactions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <button className="flex items-center gap-1.5 text-zinc-500 hover:text-rose-400 transition-colors group/btn">
                    <Heart
                      size={16}
                      className="group-hover/btn:fill-rose-500/20"
                    />
                    <span className="text-xs font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-zinc-500 hover:text-indigo-400 transition-colors">
                    <MessageSquare size={16} />
                    <span className="text-xs font-medium">{post.comments}</span>
                  </button>
                </div>

                <button className="text-zinc-600 hover:text-linear-text transition-colors">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
