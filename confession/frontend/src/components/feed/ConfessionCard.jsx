import { useNavigate } from "react-router-dom";
import { PawPrint, Zap, Moon } from "lucide-react";

import { ArrowBigUpIcon } from "../ui/arrow-big-up";
import { ArrowBigDownIcon } from "../ui/arrow-big-down";
import { MessageCircleIcon } from "../ui/message-circle";
import { CircleDollarSignIcon as BadgeDollarSignIcon } from "../ui/circle-dollar-sign";
import { PostOptionsMenu } from "../modals/post-options-menu";

// IMPORT THIS ONCE.
import { InteractiveAction } from "../ui/interactive-action";
import { cn } from "../../lib/utils";

const AvatarIcon = ({ name }) => {
  if (name.includes("Tiger")) return <PawPrint size={14} />;
  if (name.includes("Owl")) return <Moon size={14} />;
  return <Zap size={14} />;
};

export function ConfessionCard({ data }) {
  const navigate = useNavigate();

  const getTagStyles = (tag) => {
    switch (tag) {
      case "College":
        return "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "Spiciest":
        return "text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20";
      case "DeepThoughts":
        return "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20";
      default:
        return "text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/20";
    }
  };

  return (
    <div
      onClick={() => navigate(`/confession/${data.id}`)}
      className="relative rounded-lg bg-linear-bg border font-sans border-linear-border p-5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "size-8 rounded-sm flex items-center justify-center text-linear-text-muted border border-black/10 dark:border-white/10",
              data.avatarColor
                ? data.avatarColor
                : "bg-black/5 dark:bg-white/5",
            )}
          >
            <AvatarIcon name={data.author} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="text-linear-text font-medium text-[13px]">
                {data.author}
              </h3>
            </div>
            <span className="text-linear-text-muted text-[11px]">
              {data.time}
            </span>
          </div>
        </div>
        {/* REPLACED DEAD BUTTON WITH ACTUAL MENU COMPONENT */}
        <PostOptionsMenu
          postId={data.id}
          isOwnPost={data.author === "Ghost User #99"}
        />
      </div>

      <p className="text-linear-text/90 text-[13px] leading-relaxed font-poppins mb-5">
        {data.content}
      </p>

      {data.tag && (
        <div className="flex items-center gap-2 mb-5">
          <span
            className={cn(
              "text-[11px] px-2 py-0.5 rounded-sm border font-medium",
              getTagStyles(data.tag),
            )}
          >
            #{data.tag}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-linear-border/50">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full px-3 py-1">
            <InteractiveAction
              icon={ArrowBigUpIcon}
              label={data.likes}
              hoverTextClass="hover:text-rose-500 dark:hover:text-rose-400"
              iconHoverClass="group-hover:fill-rose-500/20"
            />
            <div className="w-px h-3 bg-black/10 dark:bg-white/10" />
            <InteractiveAction
              icon={ArrowBigDownIcon}
              label={data.dislikes}
              hoverTextClass="hover:text-blue-500 dark:hover:text-blue-400"
              iconHoverClass="group-hover:fill-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-4">
            <InteractiveAction
              icon={MessageCircleIcon}
              label={data.comments}
              hoverTextClass="hover:text-indigo-500 dark:hover:text-indigo-400"
            />
            <InteractiveAction
              icon={BadgeDollarSignIcon}
              label={data.dollarCoin}
              hoverTextClass="hover:text-emerald-500 dark:hover:text-emerald-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
