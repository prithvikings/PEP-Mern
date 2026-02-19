import { ArrowRight, Trophy, Ghost } from "lucide-react";
import { TOPICS } from "../../data/mockData";

export function RightPanel() {
  return (
    <aside className="w-full flex-shrink-0 hidden xl:flex flex-col border-l border-linear-border bg-linear-bg h-screen p-5 overflow-y-auto sticky top-0">
      <div className="mb-8">
        <h2 className="text-linear-text font-medium text-xs tracking-wider mb-4 text-linear-text-muted">
          Trending Topics
        </h2>
        <div className="flex flex-col gap-1">
          {TOPICS.map((topic) => (
            <a
              key={topic.tag}
              href="#"
              className="flex justify-between items-center group py-2 px-2 -mx-2 rounded hover:bg-white/5 transition-colors"
            >
              <div>
                <p className="text-linear-text text-[13px] font-medium group-hover:text-white transition-colors">
                  {topic.tag}
                </p>
                <p className="text-linear-text-muted text-[11px]">
                  {topic.count}
                </p>
              </div>
              <ArrowRight
                size={14}
                className="text-zinc-700 group-hover:text-zinc-400"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Daily Top */}
      <div className="bg-linear-surface/40 rounded-lg p-4 border border-linear-border mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Trophy size={12} className="text-yellow-500/80" />
          <span className="text-[10px] font-bold text-linear-text-muted uppercase tracking-wider">
            Daily Top
          </span>
        </div>
        <p className="text-linear-text/90 text-[13px] leading-relaxed italic mb-3">
          "My roommate thinks our apartment is haunted. It's me moving things
          slightly to the left."
        </p>
        <div className="flex items-center gap-2">
          <div className="size-5 rounded bg-zinc-800 flex items-center justify-center text-[10px] text-white">
            <Ghost size={12} />
          </div>
          <span className="text-[11px] text-linear-text-muted">
            Spooky Ghost #404
          </span>
        </div>
      </div>

      {/* Suggested */}
      <div>
        <h2 className="text-linear-text font-semibold text-xs uppercase tracking-wider mb-4 text-linear-text-muted">
          Suggested
        </h2>
        <div className="flex flex-col gap-3">
          {["Gossip Queen", "Tech Insider"].map((name) => (
            <div key={name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded bg-zinc-800 flex items-center justify-center border border-zinc-700 text-zinc-400">
                  <div className="size-2 bg-zinc-500 rounded-full" />
                </div>
                <span className="text-[12px] text-linear-text font-medium">
                  {name}
                </span>
              </div>
              <button className="text-linear-text-muted hover:text-white text-[10px] font-medium border border-linear-border px-2 py-1 rounded hover:bg-white/5 transition-all cursor-pointer">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
