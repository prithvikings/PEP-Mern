import { useRef } from "react";
import { useNavigate } from "react-router-dom"; // Added import
import {
  Search,
  Command,
  ChevronDown,
  Coffee,
  Briefcase,
  Smartphone,
  Dog,
} from "lucide-react";

import { ArrowBigUpIcon } from "../components/ui/arrow-big-up";
import { ArrowBigDownIcon } from "../components/ui/arrow-big-down";
import { MessageCircleIcon } from "../components/ui/message-circle";
import { SendIcon as ShareIcon } from "../components/ui/send-icon";
import { CircleDollarSignIcon } from "../components/ui/circle-dollar-sign";

import { TRENDING_POSTS } from "../data/mockData";
import { cn } from "../lib/utils";
import { PostOptionsMenu } from "../components/modals/post-options-menu";

// IMPORT THIS FROM YOUR NEW FILE. DO NOT DECLARE IT HERE.
import { InteractiveAction } from "../components/ui/interactive-action";

const getIconData = (iconName) => {
  switch (iconName) {
    case "Coffee":
      return {
        icon: <Coffee size={14} />,
        theme:
          "text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/20",
      };
    case "Briefcase":
      return {
        icon: <Briefcase size={14} />,
        theme:
          "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
      };
    case "Smartphone":
      return {
        icon: <Smartphone size={14} />,
        theme:
          "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
      };
    case "Dog":
      return {
        icon: <Dog size={14} />,
        theme:
          "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      };
    default:
      return {
        icon: <Coffee size={14} />,
        theme:
          "text-linear-text-muted bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10",
      };
  }
};

export function TrendingTea() {
  const navigate = useNavigate(); // Initialized hook

  return (
    <div className="min-h-screen bg-linear-bg text-linear-text font-sans selection:bg-black/10 dark:selection:bg-white/20">
      <div className="sticky top-0 z-20 bg-linear-bg/90 backdrop-blur-xl border-b border-linear-border font-poppins">
        <div className="px-5 pt-5 pb-4">
          <div className="relative mb-5">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-linear-text-muted"
              size={16}
            />
            <input
              type="text"
              placeholder="Search for secrets, tags, or keywords..."
              className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md py-2 pl-9 pr-12 text-[13px] text-linear-text focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-all placeholder:text-linear-text-muted/60"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 border border-black/10 dark:border-white/10 rounded-sm px-1.5 py-0.5 flex items-center gap-1 bg-black/5 dark:bg-white/5">
              <Command size={10} className="text-linear-text-muted" />
              <span className="text-[10px] font-medium text-linear-text-muted font-sans">
                K
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            <div className="flex gap-1.5 shrink-0">
              {["All", "Funny", "Work", "Relationships", "Embarrassing"].map(
                (filter, i) => (
                  <button
                    key={filter}
                    className={cn(
                      "px-3 py-1 text-[12px] font-medium rounded-md transition-all border",
                      i === 0
                        ? "bg-black/5 dark:bg-white/10 text-linear-text border-black/10 dark:border-white/10 shadow-sm"
                        : "text-linear-text-muted border-transparent hover:text-linear-text hover:bg-black/5 dark:hover:bg-white/5",
                    )}
                  >
                    {filter}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pb-24">
        <div className="flex flex-col gap-3">
          {TRENDING_POSTS.map((post) => {
            const iconData = getIconData(post.icon);

            return (
              <div
                key={post.id}
                onClick={() => navigate(`/confession/${post.id}`)} // Added navigation
                className="group relative p-5 rounded-lg border border-linear-border bg-linear-bg hover:bg-black/[0.02] dark:hover:bg-white/[0.02] hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-linear-text-muted">
                    <div
                      className={cn(
                        "flex items-center justify-center size-6 rounded-sm border",
                        iconData.theme,
                      )}
                    >
                      {iconData.icon}
                    </div>
                    <span className="text-[12px] font-medium text-linear-text">
                      {post.author}
                    </span>
                  </div>
                  <PostOptionsMenu
                    postId={post.id}
                    isOwnPost={post.author === "Ghost User #99"}
                  />
                </div>

                <p className="text-[13px] text-linear-text/90 leading-relaxed font-poppins mb-5">
                  {post.content}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-linear-border/50">
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full px-3 py-1">
                      <InteractiveAction
                        icon={ArrowBigUpIcon}
                        label={post.likes}
                        hoverTextClass="hover:text-rose-500 dark:hover:text-rose-400"
                        iconHoverClass="group-hover:fill-rose-500/20"
                      />
                      <div className="w-px h-3 bg-black/10 dark:bg-white/10" />
                      <InteractiveAction
                        icon={ArrowBigDownIcon}
                        label={post.dislikes || 0}
                        hoverTextClass="hover:text-blue-500 dark:hover:text-blue-400"
                        iconHoverClass="group-hover:fill-blue-500/20"
                      />
                    </div>

                    <InteractiveAction
                      icon={MessageCircleIcon}
                      label={post.comments}
                      hoverTextClass="hover:text-indigo-500 dark:hover:text-indigo-400"
                    />
                    <InteractiveAction
                      icon={CircleDollarSignIcon}
                      label={post.comments}
                      hoverTextClass="hover:text-green-500 dark:hover:text-green-400"
                    />
                  </div>

                  <InteractiveAction
                    icon={ShareIcon}
                    hoverTextClass="hover:text-linear-text"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
