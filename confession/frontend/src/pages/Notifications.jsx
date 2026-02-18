import {
  Heart,
  MessageCircle,
  Eye,
  ShieldCheck,
  Megaphone,
  Settings,
  Check,
} from "lucide-react";
import { NOTIFICATIONS } from "../data/mockData";
import { cn } from "../lib/utils";

// Icon mapping based on notification type
const getIcon = (type) => {
  switch (type) {
    case "like":
      return <Heart size={16} className="fill-current" />;
    case "comment":
      return <MessageCircle size={16} className="fill-current" />;
    case "view":
      return <Eye size={16} />;
    case "security":
      return <ShieldCheck size={16} />;
    case "system":
      return <Megaphone size={16} />;
    default:
      return <Bell size={16} />;
  }
};

export function Notifications() {
  return (
    <div className="min-h-screen bg-linear-bg text-linear-text font-sans">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-linear-bg/80 backdrop-blur-md border-b border-linear-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold tracking-tight">Activity</h1>
          <span className="bg-linear-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-[0_0_10px_-3px_rgba(99,102,241,0.4)]">
            3
          </span>
        </div>
        <button className="flex items-center gap-2 text-[11px] font-medium text-linear-text-muted hover:text-linear-text transition-colors">
          <Check size={14} />
          MARK ALL READ
        </button>
      </div>

      {/* List Container */}
      <div className="max-w-3xl mx-auto p-6 pb-20">
        <div className="flex flex-col">
          {NOTIFICATIONS.map((item) => (
            <div
              key={item.id}
              className={cn(
                "group relative flex gap-4 p-4 rounded-lg transition-all duration-200 border border-transparent hover:bg-linear-surface/40",
                item.unread ? "bg-linear-surface/10" : "",
              )}
            >
              {/* Unread Indicator Line (Left) */}
              {item.unread && (
                <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-blue-500 rounded-r-full" />
              )}

              {/* Icon Column */}
              <div className="pt-0.5">
                <div
                  className={cn(
                    "size-8 rounded-full flex items-center justify-center ring-1 ring-inset",
                    item.type === "like"
                      ? "bg-rose-500/10 text-rose-400 ring-rose-500/20"
                      : item.type === "comment"
                        ? "bg-blue-500/10 text-blue-400 ring-blue-500/20"
                        : item.type === "security"
                          ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20"
                          : "bg-zinc-800/50 text-zinc-400 ring-white/10",
                  )}
                >
                  {getIcon(item.type)}
                </div>
              </div>

              {/* Content Column */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-4">
                  <p className="text-[14px] leading-snug text-linear-text/90">
                    <span className="font-semibold text-linear-text">
                      {item.user}
                    </span>{" "}
                    <span className="text-linear-text-muted">
                      {item.action}
                    </span>{" "}
                    <span className="italic text-linear-text/80">
                      {item.target}
                    </span>
                  </p>

                  {/* Unread Dot (Right) */}
                  {item.unread && (
                    <div className="size-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  )}
                </div>
                <p className="text-[11px] text-zinc-500 mt-1.5 font-medium">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Settings Link */}
        <div className="mt-8 pt-6 border-t border-linear-border flex justify-center">
          <button className="flex items-center gap-2 text-xs font-medium text-linear-text-muted hover:text-linear-text transition-colors px-4 py-2 rounded-md hover:bg-white/5 border border-transparent hover:border-linear-border">
            <Settings size={14} />
            Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
}
