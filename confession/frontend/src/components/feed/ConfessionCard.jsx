import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  PawPrint,
  Zap,
  Moon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";

// Helper for dynamic icons
const AvatarIcon = ({ name }) => {
  if (name.includes("Tiger")) return <PawPrint size={14} />;
  if (name.includes("Owl")) return <Moon size={14} />;
  return <Zap size={14} />;
};

export function ConfessionCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/confession/${data.id}`)}
      className="relative rounded-lg bg-transparent border border-linear-border p-5 hover:bg-linear-surface/30 hover:border-linear-border/80 transition-all duration-200 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "size-8 rounded flex items-center justify-center text-white ring-1 ring-white/10",
              data.avatarColor || "bg-zinc-800",
            )}
          >
            <AvatarIcon name={data.author} />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <h3 className="text-linear-text font-medium text-[13px]">
                {data.author}
              </h3>
              <span className="text-linear-text-muted text-[11px]">
                • {data.time}
              </span>
            </div>
          </div>
        </div>
        <button className="text-linear-text-muted hover:text-linear-text transition-colors p-1">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Content */}
      <p className="text-linear-text/90 text-[14px] leading-relaxed font-normal mb-4">
        {data.content}
      </p>

      {/* Tags */}
      {data.tag && (
        <div className="flex items-center gap-2 mb-4">
          <span
            className={cn(
              "text-[11px] px-2 py-0.5 rounded border opacity-80",
              data.tag === "College"
                ? "text-blue-400 bg-blue-500/10 border-blue-500/20"
                : data.tag === "Spiciest"
                  ? "text-red-400 bg-red-500/10 border-red-500/20"
                  : data.tag === "DeepThoughts"
                    ? "text-purple-400 bg-purple-500/10 border-purple-500/20"
                    : "text-orange-400 bg-orange-500/10 border-orange-500/20",
            )}
          >
            #{data.tag}
          </span>
        </div>
      )}

      {/* Footer / Stats */}
      <div className="flex items-center justify-between pt-2 border-t border-linear-border/40 mt-2">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-linear-text-muted hover:text-rose-400 transition-colors group/like">
            <Heart size={16} className="group-hover/like:fill-rose-400/20" />
            <span className="text-xs font-medium">{data.likes}</span>
          </button>
          <button className="flex items-center gap-1.5 text-linear-text-muted hover:text-blue-400 transition-colors">
            <MessageCircle size={16} />
            <span className="text-xs font-medium">{data.comments}</span>
          </button>
        </div>

        {data.reaction && (
          <div className="flex items-center gap-1 text-linear-text-muted text-[11px]">
            {data.reaction}
          </div>
        )}
      </div>
    </div>
  );
}
