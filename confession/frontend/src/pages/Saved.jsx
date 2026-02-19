import { useState } from "react";
import {
  Search,
  Bookmark,
  SlidersHorizontal,
  StickyNote,
  ArrowUpRight,
  FolderOpen,
  Folder,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ConfessionCard } from "../components/feed/ConfessionCard";
import { SAVED_POSTS } from "../data/mockData";
import { CreateCollectionModal } from "../components/modals/CreateCollectionModal"; // Added Import
import { cn } from "../lib/utils";
import { SavedFilterModal } from "../components/modals/SavedFilterModal";

// Mock Collections Data
const MOCK_COLLECTIONS = [
  { id: "all", name: "All Saved", count: 12 },
  { id: "work", name: "Work Drama", count: 4 },
  { id: "funny", name: "Hilarious", count: 5 },
  { id: "tech", name: "Tech Rants", count: 3 },
];

export function Saved() {
  const navigate = useNavigate();
  const [activeCollection, setActiveCollection] = useState("all");

  return (
    <div className="min-h-screen bg-linear-bg text-linear-text font-sans selection:bg-black/10 dark:selection:bg-white/20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-linear-bg/90 backdrop-blur-xl border-b border-linear-border font-poppins">
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-md bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                <Bookmark size={16} className="fill-current" />
              </div>
              <div>
                <h1 className="text-[15px] font-semibold tracking-tight text-linear-text">
                  Saved Collection
                </h1>
                <p className="text-[11px] font-medium text-linear-text-muted">
                  {SAVED_POSTS.length} items • Updated just now
                </p>
              </div>
            </div>

            {/* Wrapped the button in the Modal */}
            <CreateCollectionModal>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-[12px] font-medium text-linear-text-muted hover:text-linear-text cursor-pointer">
                <FolderOpen size={14} />
                <span>New Collection</span>
              </button>
            </CreateCollectionModal>
          </div>

          {/* Search & Sort */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-linear-text-muted"
                size={14}
              />
              <input
                type="text"
                placeholder="Search within saved items..."
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md py-1.5 pl-8 pr-4 text-[13px] text-linear-text focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-all placeholder:text-linear-text-muted/60"
              />
            </div>
            <SavedFilterModal>
              <button className="px-3 py-1.5 rounded-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-linear-text-muted hover:text-linear-text transition-colors cursor-pointer">
                <SlidersHorizontal size={14} />
              </button>
            </SavedFilterModal>
          </div>

          {/* Collections Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {MOCK_COLLECTIONS.map((collection) => (
              <button
                key={collection.id}
                onClick={() => setActiveCollection(collection.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all whitespace-nowrap border",
                  activeCollection === collection.id
                    ? "bg-black/5 dark:bg-white/10 text-linear-text border-black/10 dark:border-white/10 shadow-sm"
                    : "bg-transparent text-linear-text-muted border-transparent hover:text-linear-text hover:bg-black/5 dark:hover:bg-white/5",
                )}
              >
                {collection.id === "all" ? (
                  <Bookmark
                    size={12}
                    className={activeCollection === "all" ? "fill-current" : ""}
                  />
                ) : (
                  <Folder
                    size={12}
                    className={
                      activeCollection === collection.id ? "fill-current" : ""
                    }
                  />
                )}
                {collection.name}
                <span
                  className={cn(
                    "text-[10px] font-mono px-1.5 rounded-sm ml-1",
                    activeCollection === collection.id
                      ? "bg-black/10 dark:bg-white/20"
                      : "bg-black/5 dark:bg-white/5",
                  )}
                >
                  {collection.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-5 pb-24 space-y-6">
        {SAVED_POSTS.map((post) => (
          <div key={post.id} className="relative group">
            {/* Private Note Badge */}
            {post.note && (
              <div className="absolute -top-2.5 left-4 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md">
                <StickyNote size={10} className="fill-current" />
                Note: {post.note}
              </div>
            )}

            {/* Custom Wrapper for Hover Effect */}
            <div className="relative">
              <ConfessionCard data={post} />

              {/* Quick Action Overlay (Visible on Hover) */}
              <div className="absolute top-4 right-12 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/confession/${post.id}`);
                  }}
                  className="p-1.5 rounded-md bg-linear-bg border border-black/10 dark:border-white/10 text-linear-text-muted hover:text-linear-text shadow-md transition-colors"
                >
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State / Bottom Message */}
        <div className="pt-10 pb-8 text-center border-t border-linear-border border-dashed">
          <div className="inline-flex items-center justify-center size-12 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-3 text-linear-text-muted">
            <Bookmark size={18} />
          </div>
          <p className="text-[13px] font-medium text-linear-text-muted">
            End of your saved items
          </p>
          <button
            onClick={() => navigate("/trending")}
            className="mt-2 text-[12px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium hover:underline transition-colors"
          >
            Browse Trending Tea
          </button>
        </div>
      </div>
    </div>
  );
}
