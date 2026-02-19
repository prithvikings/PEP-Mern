import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MoreHorizontal, Moon, PawPrint, Zap } from "lucide-react";

import { ArrowBigUpIcon } from "../components/ui/arrow-big-up";
import { ArrowBigDownIcon } from "../components/ui/arrow-big-down";
import { MessageCircleIcon } from "../components/ui/message-circle";
import { SendIcon as ShareIcon } from "../components/ui/send-icon";
import { TriangleAlertIcon as FlagIcon } from "../components/ui/triangle-alert-icon";
import { CircleDollarSignIcon as BadgeDollarSignIcon } from "../components/ui/circle-dollar-sign";

import { THREAD_DATA } from "../data/mockData";
import { cn } from "../lib/utils";

const AvatarIcon = ({ name }) => {
  if (name.includes("Tiger")) return <PawPrint size={14} />;
  if (name.includes("Owl")) return <Moon size={14} />;
  return <Zap size={14} />;
};

const InteractiveAction = ({
  icon: Icon,
  label,
  onClick,
  hoverTextClass = "hover:text-linear-text",
  iconHoverClass = "",
}) => {
  const iconRef = useRef(null);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
      className={cn(
        "flex items-center gap-1.5 text-linear-text-muted transition-colors group",
        hoverTextClass,
      )}
    >
      <Icon
        ref={iconRef}
        size={18}
        className={cn(
          "opacity-70 group-hover:opacity-100 transition-all",
          iconHoverClass,
        )}
      />
      {label !== undefined && (
        <span className="text-xs font-medium">{label}</span>
      )}
    </button>
  );
};

export function PostDetails() {
  const navigate = useNavigate();
  const post = THREAD_DATA;

  const getTagStyles = (tag) => {
    switch (tag) {
      case "WorkLife":
        return "text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/20";
      case "Confession":
        return "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20";
      default:
        return "text-linear-text-muted bg-black/5 dark:bg-white/5 border-linear-border";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-linear-bg text-linear-text font-sans selection:bg-black/10 dark:selection:bg-white/20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-linear-bg/80 backdrop-blur-md border-b border-linear-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 -ml-1.5 text-linear-text-muted hover:text-linear-text hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-all"
        >
          <ArrowLeft size={16} />
        </button>
        <h2 className="font-medium text-[13px] tracking-tight text-linear-text-muted">
          Thread
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Main Post */}
        <article className="px-5 py-6 border-b border-linear-border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-sm bg-black/5 dark:bg-white/5 flex items-center justify-center text-linear-text-muted border border-black/10 dark:border-white/10">
                <AvatarIcon name={post.author} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-linear-text text-[13px]">
                    {post.author}
                  </span>
                  {post.isTrending && (
                    <span className="px-1.5 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-medium tracking-wide rounded-sm border border-indigo-500/20">
                      TRENDING
                    </span>
                  )}
                </div>
                <span className="text-linear-text-muted text-[11px]">
                  {post.time}
                </span>
              </div>
            </div>
            <button className="text-linear-text-muted hover:text-linear-text p-1 transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>

          <h1 className="text-[17px] font-medium leading-relaxed mb-5 text-linear-text tracking-tight">
            {post.content}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "px-2 py-1 rounded-sm text-[11px] font-medium border",
                  getTagStyles(tag),
                )}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-linear-border/50">
            <div className="flex items-center gap-5">
              <InteractiveAction
                icon={ArrowBigUpIcon}
                label={post.stats.likes}
                hoverTextClass="hover:text-rose-500 dark:hover:text-rose-400"
                iconHoverClass="group-hover:fill-rose-500/20"
              />
              <InteractiveAction
                icon={ArrowBigDownIcon}
                label={post.stats.dislikes}
                hoverTextClass="hover:text-blue-500 dark:hover:text-blue-400"
                iconHoverClass="group-hover:fill-blue-500/20"
              />
              <InteractiveAction
                icon={MessageCircleIcon}
                label={post.stats.comments}
                hoverTextClass="hover:text-indigo-500 dark:hover:text-indigo-400"
              />
              <InteractiveAction
                icon={BadgeDollarSignIcon}
                label={post.stats.dollarCoin}
                hoverTextClass="hover:text-emerald-500 dark:hover:text-emerald-400"
              />
              <InteractiveAction
                icon={ShareIcon}
                label="Share"
                hoverTextClass="hover:text-linear-text"
              />
            </div>
            <InteractiveAction
              icon={FlagIcon}
              hoverTextClass="hover:text-amber-500 dark:hover:text-amber-500"
            />
          </div>
        </article>

        {/* Discussion Header */}
        <div className="px-5 py-6">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-[11px] font-medium text-linear-text-muted uppercase tracking-wider">
              Discussion
            </h3>
            <span className="text-[10px] bg-black/5 dark:bg-white/10 text-linear-text px-1.5 py-0.5 rounded-sm">
              {post.stats.comments}
            </span>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {post.comments.map((comment) => (
              <div key={comment.id} className="relative group">
                {comment.replies && (
                  <div className="absolute left-3.5 top-8 bottom-0 w-[1px] bg-linear-border/50 group-hover:bg-linear-border transition-colors" />
                )}

                <div className="flex gap-3">
                  <div className="flex-shrink-0 size-7 rounded-sm bg-black/5 dark:bg-white/5 flex items-center justify-center text-[10px] text-linear-text-muted border border-black/10 dark:border-white/10">
                    {comment.author[0]}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-[13px] text-linear-text">
                        {comment.author}
                      </span>
                      <span className="text-[11px] text-linear-text-muted">
                        {comment.time}
                      </span>
                    </div>
                    <p className="text-linear-text/90 text-[13px] leading-relaxed mb-2.5">
                      {comment.content}
                    </p>
                    <div className="flex items-center gap-4">
                      <InteractiveAction
                        icon={ArrowBigUpIcon}
                        label={comment.votes}
                        hoverTextClass="hover:text-rose-500 dark:hover:text-rose-400"
                        iconHoverClass="group-hover:fill-rose-500/20"
                      />
                      <button className="text-[11px] font-medium text-linear-text-muted hover:text-linear-text transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>

                {/* Nested Replies */}
                {comment.replies && (
                  <div className="mt-4 pl-9 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3 relative">
                        <div className="absolute -left-5 top-0 w-3 h-4 border-l border-b border-linear-border/50 rounded-bl-sm" />

                        <div className="flex-shrink-0 size-6 rounded-sm bg-black/5 dark:bg-white/5 flex items-center justify-center text-[10px] text-linear-text-muted border border-black/10 dark:border-white/10">
                          {reply.author[0]}
                        </div>
                        <div className="flex-1 pt-0.5">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={cn(
                                "font-medium text-[13px]",
                                reply.isOp
                                  ? "text-linear-text font-semibold"
                                  : "text-linear-text",
                              )}
                            >
                              {reply.author}
                            </span>
                            {reply.isOp && (
                              <span className="bg-black dark:bg-white text-white dark:text-black text-[9px] font-bold px-1 rounded-sm tracking-tight">
                                OP
                              </span>
                            )}
                            <span className="text-[11px] text-linear-text-muted">
                              {reply.time}
                            </span>
                          </div>
                          <p className="text-linear-text/90 text-[13px] leading-relaxed mb-2.5">
                            {reply.content}
                          </p>
                          <div className="flex items-center gap-4">
                            <InteractiveAction
                              icon={ArrowBigUpIcon}
                              label={reply.votes}
                              hoverTextClass="hover:text-rose-500 dark:hover:text-rose-400"
                              iconHoverClass="group-hover:fill-rose-500/20"
                            />
                            <button className="text-[11px] font-medium text-linear-text-muted hover:text-linear-text transition-colors">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Input Footer */}
      <div className="sticky bottom-0 border-t border-linear-border bg-linear-bg/90 backdrop-blur-xl p-3">
        <div className="flex gap-2 max-w-3xl mx-auto">
          <div className="flex-1 relative group">
            <input
              type="text"
              placeholder="Add to the discussion..."
              className="w-full bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-md py-2 pl-3 pr-20 text-[13px] text-linear-text focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-all placeholder:text-linear-text-muted/50"
            />
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] font-medium text-linear-text-muted border border-black/10 dark:border-white/10 px-1.5 py-0.5 rounded-sm bg-black/5 dark:bg-white/5 transition-colors">
              ⌘ Enter
            </div>
          </div>
          <button className="bg-black dark:bg-white text-white dark:text-black font-medium px-4 py-2 rounded-md text-[13px] hover:bg-black/90 dark:hover:bg-white/90 transition-colors shadow-sm">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
