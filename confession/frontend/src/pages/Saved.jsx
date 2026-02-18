import {
  Search,
  Bookmark,
  SlidersHorizontal,
  StickyNote,
  ArrowUpRight,
  FolderOpen,
} from "lucide-react";
import { ConfessionCard } from "../components/feed/ConfessionCard";
import { SAVED_POSTS } from "../data/mockData";

export function Saved() {
  return (
    <div className="min-h-screen bg-linear-bg text-linear-text font-sans">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-linear-bg/95 backdrop-blur-xl border-b border-linear-border">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
                <Bookmark size={16} className="fill-current" />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-linear-text">
                  Saved Collection
                </h1>
                <p className="text-[11px] text-linear-text-muted">
                  3 items • Updated just now
                </p>
              </div>
            </div>

            <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-linear-border bg-linear-surface hover:bg-white/5 transition-colors text-xs font-medium text-linear-text-muted hover:text-linear-text">
              <FolderOpen size={14} />
              <span>New Collection</span>
            </button>
          </div>

          {/* Search & Sort */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                size={14}
              />
              <input
                type="text"
                placeholder="Search within saved items..."
                className="w-full bg-linear-surface/50 border border-linear-border rounded-lg py-2 pl-9 pr-4 text-[13px] text-linear-text focus:outline-none focus:ring-1 focus:ring-linear-border transition-all placeholder:text-zinc-600"
              />
            </div>
            <button className="px-3 rounded-lg border border-linear-border bg-transparent hover:bg-white/5 text-zinc-500 hover:text-linear-text transition-colors">
              <SlidersHorizontal size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-6 pb-20 space-y-6">
        {SAVED_POSTS.map((post) => (
          <div key={post.id} className="relative group">
            {/* Private Note Badge (If applicable) */}
            {post.note && (
              <div className="absolute -top-2.5 left-4 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-500/90 text-[10px] font-medium shadow-sm">
                <StickyNote size={10} className="fill-current" />
                Note: {post.note}
              </div>
            )}

            {/* Custom Wrapper for Hover Effect */}
            <div className="relative">
              <ConfessionCard data={post} />

              {/* Quick Action Overlay (Visible on Hover) */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button className="p-2 rounded-md bg-linear-bg/90 border border-linear-border text-linear-text-muted hover:text-linear-text shadow-sm backdrop-blur-sm transition-colors">
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State / Bottom Message */}
        <div className="pt-12 pb-8 text-center border-t border-linear-border border-dashed">
          <div className="inline-flex items-center justify-center size-12 rounded-full bg-linear-surface mb-3 text-zinc-600">
            <Bookmark size={20} />
          </div>
          <p className="text-sm font-medium text-linear-text-muted">
            End of your saved items
          </p>
          <button className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 font-medium hover:underline">
            Browse Trending Tea
          </button>
        </div>
      </div>
    </div>
  );
}
