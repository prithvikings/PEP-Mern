import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Flag,
  MoreHorizontal,
  ArrowBigUp,
  PawPrint,
  Moon,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { THREAD_DATA } from "../data/mockData";
import { cn } from "../lib/utils";

// Reusing the avatar logic for consistency
const AvatarIcon = ({ name }) => {
  if (name.includes("Tiger")) return <PawPrint size={14} />;
  if (name.includes("Owl")) return <Moon size={14} />;
  return <Zap size={14} />;
};

export function PostDetails() {
  const navigate = useNavigate();
  const post = THREAD_DATA;

  return (
    <div className="flex flex-col min-h-screen bg-linear-bg text-linear-text font-sans">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-linear-bg/80 backdrop-blur-md border-b border-linear-border px-4 py-3 flex items-center gap-4 transition-all">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-linear-text-muted hover:text-linear-text hover:bg-white/5 rounded-md transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="font-semibold text-sm tracking-wide">Thread</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Main Post */}
        <article className="px-6 py-8 border-b border-linear-border">
          {/* Author Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded bg-zinc-800 flex items-center justify-center text-white ring-1 ring-white/10 shadow-sm">
                <AvatarIcon name={post.author} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-linear-text text-sm">
                    {post.author}
                  </span>
                  {post.isTrending && (
                    <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[10px] font-medium rounded border border-indigo-500/20">
                      Trending
                    </span>
                  )}
                </div>
                <span className="text-linear-text-muted text-xs">
                  {post.time}
                </span>
              </div>
            </div>
            <button className="text-linear-text-muted hover:text-linear-text p-1 transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Content */}
          <h1 className="text-xl md:text-2xl font-medium leading-snug mb-6 text-linear-text">
            {post.content}
          </h1>

          {/* Tags */}
          <div className="flex gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "px-2.5 py-1 rounded text-xs font-medium border transition-colors",
                  tag === "WorkLife"
                    ? "text-orange-400 bg-orange-500/10 border-orange-500/20"
                    : tag === "Confession"
                      ? "text-purple-400 bg-purple-500/10 border-purple-500/20"
                      : "text-linear-text-muted bg-white/5 border-linear-border",
                )}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between py-4 border-t border-linear-border/50">
            <div className="flex gap-6">
              <button className="flex items-center gap-2 text-linear-text-muted hover:text-rose-400 transition-colors group">
                <Heart size={20} className="group-hover:fill-rose-500/20" />
                <span className="text-sm font-medium">{post.stats.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-linear-text-muted hover:text-blue-400 transition-colors">
                <MessageCircle size={20} />
                <span className="text-sm font-medium">
                  {post.stats.comments}
                </span>
              </button>
              <button className="flex items-center gap-2 text-linear-text-muted hover:text-emerald-400 transition-colors">
                <Share2 size={20} />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
            <button className="text-linear-text-muted hover:text-linear-text transition-colors">
              <Flag size={18} />
            </button>
          </div>
        </article>

        {/* Discussion Header */}
        <div className="px-6 py-8">
          <h3 className="text-xs font-semibold text-linear-text-muted uppercase tracking-wider mb-8">
            Discussion ({post.stats.comments})
          </h3>

          {/* Comments List */}
          <div className="space-y-8">
            {post.comments.map((comment) => (
              <div key={comment.id} className="relative group">
                {/* Vertical Line for threading */}
                {comment.replies && (
                  <div className="absolute left-3.5 top-10 bottom-0 w-px bg-linear-border group-hover:bg-linear-border/80 transition-colors" />
                )}

                <div className="flex gap-4">
                  <div className="flex-shrink-0 size-7 rounded bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400 font-medium ring-1 ring-white/5">
                    {comment.author[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-medium text-sm text-linear-text">
                        {comment.author}
                      </span>
                      <span className="text-[11px] text-linear-text-muted">
                        {comment.time}
                      </span>
                    </div>
                    <p className="text-linear-text/80 text-[13px] leading-relaxed mb-3">
                      {comment.content}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-medium text-linear-text-muted">
                      <button className="flex items-center gap-1.5 hover:text-linear-text transition-colors">
                        <ArrowBigUp size={16} /> {comment.votes}
                      </button>
                      <button className="hover:text-linear-text transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>

                {/* Nested Replies */}
                {comment.replies && (
                  <div className="mt-6 pl-10 space-y-6">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-4 relative">
                        {/* Curved line connector */}
                        <div className="absolute -left-6 top-0 w-4 h-4 border-l border-b border-linear-border rounded-bl-lg" />

                        <div className="flex-shrink-0 size-6 rounded bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400 font-medium ring-1 ring-white/5">
                          {reply.author[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span
                              className={cn(
                                "font-medium text-sm",
                                reply.isOp
                                  ? "text-linear-primary"
                                  : "text-linear-text",
                              )}
                            >
                              {reply.author}
                            </span>
                            {reply.isOp && (
                              <span className="bg-linear-primary/10 text-linear-primary border border-linear-primary/20 text-[9px] font-bold px-1.5 py-0.5 rounded">
                                OP
                              </span>
                            )}
                            <span className="text-[11px] text-linear-text-muted">
                              {reply.time}
                            </span>
                          </div>
                          <p className="text-linear-text/80 text-[13px] leading-relaxed mb-3">
                            {reply.content}
                          </p>
                          <div className="flex items-center gap-4 text-xs font-medium text-linear-text-muted">
                            <button className="flex items-center gap-1.5 hover:text-linear-text transition-colors">
                              <ArrowBigUp size={16} /> {reply.votes}
                            </button>
                            <button className="hover:text-linear-text transition-colors">
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
      <div className="sticky bottom-0 border-t border-linear-border bg-linear-bg/80 backdrop-blur-xl p-4">
        <div className="flex gap-3 max-w-3xl mx-auto">
          <div className="flex-1 relative group">
            <input
              type="text"
              placeholder="Add to the discussion..."
              className="w-full bg-transparent border border-linear-border rounded-lg py-2.5 pl-4 pr-24 text-sm text-linear-text focus:outline-none focus:ring-1 focus:ring-linear-border focus:border-linear-text-muted transition-all placeholder:text-zinc-600"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-linear-text-muted border border-linear-border px-1.5 py-0.5 rounded bg-white/5 group-focus-within:border-linear-text-muted/50 transition-colors">
              CMD+ENTER
            </div>
          </div>
          <button className="bg-linear-text text-linear-bg font-semibold px-4 py-2 rounded-lg text-sm hover:bg-white/90 transition-colors shadow-sm">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
