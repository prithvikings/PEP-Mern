import {
  Search,
  Plus,
  BarChart2,
  MoreHorizontal,
  Lock,
  Globe,
} from "lucide-react";
import { MY_WHISPERS } from "../data/mockData";
import { cn } from "../lib/utils";
import { CreateConfessionModal } from "../components/modals/CreateConfessionModal";

export function MyWhispers() {
  return (
    <div className="min-h-screen bg-linear-bg text-linear-text font-sans">
      {/* Header Section */}
      <div className="sticky top-0 z-20 bg-linear-bg/80 backdrop-blur-md border-b border-linear-border px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold tracking-tight">My Whispers</h1>
          <span className="bg-linear-surface border border-linear-border text-linear-text-muted text-xs px-2.5 py-0.5 rounded-full font-medium">
            12 active
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-linear-text-muted transition-colors group-focus-within:text-linear-text"
              size={14}
            />
            <input
              type="text"
              placeholder="Search your secrets..."
              className="w-64 bg-linear-surface border border-linear-border rounded-md py-1.5 pl-9 pr-8 text-xs text-linear-text focus:outline-none focus:ring-1 focus:ring-linear-border focus:border-linear-text-muted transition-all placeholder:text-zinc-600"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-zinc-600 border border-linear-border px-1 py-px rounded bg-black/20">
              ⌘K
            </div>
          </div>
          <CreateConfessionModal>
            <button className="flex items-center gap-2 bg-linear-primary hover:bg-linear-primary-hover text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all shadow-sm">
              <Plus size={14} />
              New Secret
            </button>
          </CreateConfessionModal>
        </div>
      </div>

      {/* Table Content */}
      <div className="p-8">
        <div className="border border-linear-border rounded-lg overflow-hidden bg-transparent">
          {/* Table Header */}
          <div className="grid grid-cols-[3fr_1fr_1fr_1fr_0.5fr] gap-4 px-6 py-3 border-b border-linear-border bg-linear-surface/30 text-[11px] font-semibold text-linear-text-muted uppercase tracking-wider">
            <div>Confession</div>
            <div>Views</div>
            <div>Reactions</div>
            <div>Created</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-linear-border/50">
            {MY_WHISPERS.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[3fr_1fr_1fr_1fr_0.5fr] gap-4 px-6 py-4 items-center hover:bg-linear-surface/40 transition-colors group cursor-default"
              >
                {/* Content Column */}
                <div className="pr-8">
                  <p className="text-[13px] font-medium text-linear-text truncate mb-1.5">
                    {item.content}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-linear-text-muted">
                    <span className="font-mono text-zinc-600">
                      ID: {item.id}
                    </span>
                    <span className="w-0.5 h-0.5 rounded-full bg-zinc-600" />
                    <div className="flex items-center gap-1.5">
                      {item.status === "Public" ? (
                        <Globe size={10} className="text-zinc-500" />
                      ) : (
                        <Lock size={10} className="text-zinc-500" />
                      )}
                      <span>{item.status}</span>
                    </div>
                  </div>
                </div>

                {/* Views Column */}
                <div className="flex items-center gap-2 text-[13px] text-linear-text-muted tabular-nums">
                  <BarChart2 size={14} className="text-zinc-600" />
                  {item.views.toLocaleString()}
                </div>

                {/* Reactions Column */}
                <div className="flex items-center gap-2">
                  {item.reactions.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 bg-linear-surface border border-linear-border px-2 py-0.5 rounded text-[11px] text-linear-text-muted"
                    >
                      <span className="opacity-80 grayscale group-hover:grayscale-0 transition-all">
                        {r.emoji}
                      </span>
                      <span className="font-medium">{r.count}</span>
                    </div>
                  ))}
                </div>

                {/* Created Column */}
                <div className="text-[12px] text-linear-text-muted">
                  {item.createdAt}
                </div>

                {/* Actions Column */}
                <div className="flex justify-end">
                  <button className="p-1.5 text-zinc-500 hover:text-linear-text hover:bg-white/5 rounded transition-colors opacity-0 group-hover:opacity-100">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer / Pagination */}
          <div className="px-6 py-3 border-t border-linear-border bg-linear-surface/20 flex items-center justify-between">
            <span className="text-[11px] text-linear-text-muted">
              Showing 1-5 of 12 secrets
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-[11px] font-medium border border-linear-border rounded text-linear-text-muted hover:text-linear-text hover:bg-white/5 transition-colors disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 text-[11px] font-medium border border-linear-border rounded text-linear-text-muted hover:text-linear-text hover:bg-white/5 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
