import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, BarChart2, Lock, Globe } from "lucide-react";
import { MY_WHISPERS } from "../data/mockData";
import { cn } from "../lib/utils";
import { CreateConfessionModal } from "../components/modals/CreateConfessionModal";
import { PostOptionsMenu } from "../components/modals/post-options-menu";

export function MyWhispers() {
  const navigate = useNavigate();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Derived Pagination Logic
  const totalItems = MY_WHISPERS.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Slice the mock data for the current page
  const currentWhispers = MY_WHISPERS.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-linear-bg text-linear-text font-sans selection:bg-black/10 dark:selection:bg-white/20">
      {/* Header Section */}
      <div className="sticky top-0 z-20 bg-linear-bg/90 backdrop-blur-xl border-b border-linear-border px-8 py-5 flex items-center justify-between font-poppins">
        <div className="flex items-center gap-4">
          <h1 className="text-[15px] font-semibold tracking-tight">
            My Whispers
          </h1>
          <span className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-linear-text-muted text-[11px] px-2 py-0.5 rounded-sm font-medium tracking-wide">
            {totalItems} ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-linear-text-muted transition-colors"
              size={14}
            />
            <input
              type="text"
              placeholder="Search your secrets..."
              className="w-64 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md py-1.5 pl-8 pr-8 text-[13px] text-linear-text focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-all placeholder:text-linear-text-muted/60"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium text-linear-text-muted border border-black/10 dark:border-white/10 px-1 py-px rounded-sm bg-black/5 dark:bg-white/5">
              ⌘K
            </div>
          </div>

          <CreateConfessionModal>
            <button className="flex items-center gap-1.5 bg-linear-text text-linear-bg hover:opacity-90 px-3 py-1.5 rounded-md text-[13px] font-medium transition-opacity shadow-sm cursor-pointer">
              <Plus size={14} />
              New Secret
            </button>
          </CreateConfessionModal>
        </div>
      </div>

      {/* Table Content */}
      <div className="p-8">
        <div className="border border-linear-border rounded-lg overflow-hidden bg-linear-bg shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-[3fr_1fr_1fr_1fr_0.5fr] gap-4 px-6 py-3 border-b border-linear-border bg-black/[0.02] dark:bg-white/[0.02] text-[11px] font-semibold text-linear-text-muted uppercase tracking-wider">
            <div>Confession</div>
            <div>Views</div>
            <div>Reactions</div>
            <div>Created</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-linear-border/50">
            {currentWhispers.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/confession/${item.id}`)}
                className="grid grid-cols-[3fr_1fr_1fr_1fr_0.5fr] gap-4 px-6 py-4 items-center hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group cursor-pointer"
              >
                {/* Content Column */}
                <div className="pr-8 min-w-0">
                  <p className="text-[13px] font-medium text-linear-text line-clamp-2 mb-1.5 font-poppins">
                    {item.content}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-linear-text-muted mt-2">
                    <span className="font-mono bg-black/5 dark:bg-white/5 px-1 rounded-sm">
                      ID: {item.id}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-linear-text-muted/50" />
                    <div className="flex items-center gap-1.5">
                      {item.status === "Public" ? (
                        <Globe size={12} className="opacity-70" />
                      ) : (
                        <Lock size={12} className="opacity-70" />
                      )}
                      <span className="font-medium">{item.status}</span>
                    </div>
                  </div>
                </div>

                {/* Views Column */}
                <div className="flex items-center gap-2 text-[13px] text-linear-text-muted tabular-nums">
                  <BarChart2 size={14} className="opacity-70" />
                  {item.views.toLocaleString()}
                </div>

                {/* Reactions Column */}
                <div className="flex items-center gap-2">
                  {item.reactions.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 px-2 py-0.5 rounded-sm text-[11px] text-linear-text-muted"
                    >
                      <span className="opacity-80 grayscale group-hover:grayscale-0 transition-all">
                        {r.emoji}
                      </span>
                      <span className="font-medium">{r.count}</span>
                    </div>
                  ))}
                </div>

                {/* Created Column */}
                <div className="text-[12px] text-linear-text-muted font-medium">
                  {item.createdAt}
                </div>

                {/* Actions Column */}
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <PostOptionsMenu postId={item.id} isOwnPost={true} />
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer / Pagination */}
          <div className="px-6 py-3 border-t border-linear-border bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between">
            <span className="text-[11px] font-medium text-linear-text-muted">
              Showing {totalItems > 0 ? startIndex + 1 : 0}-
              {Math.min(endIndex, totalItems)} of {totalItems} secrets
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                }}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-[11px] font-medium border border-linear-border rounded-md text-linear-text-muted hover:text-linear-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                }}
                disabled={currentPage === totalPages || totalItems === 0}
                className="px-3 py-1.5 text-[11px] font-medium border border-linear-border rounded-md text-linear-text-muted hover:text-linear-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
