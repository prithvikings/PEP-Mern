import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Trash2, Link, BellOff, Pencil } from "lucide-react";
import { TriangleAlertIcon as FlagIcon } from "../ui/triangle-alert-icon";
import { cn } from "../../lib/utils";

export function PostOptionsMenu({ postId, isOwnPost = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (e, action) => {
    e.stopPropagation();
    console.log(`${action} triggered for post ${postId}`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={cn(
          "p-1.5 rounded-md transition-colors",
          isOpen
            ? "text-linear-text bg-black/5 dark:bg-white/10"
            : "text-linear-text-muted hover:text-linear-text hover:bg-black/5 dark:hover:bg-white/5",
        )}
      >
        <MoreHorizontal size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-44 bg-white/95 dark:bg-[#181818]/95 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-lg shadow-xl z-50 p-1 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
          <button
            onClick={(e) => handleAction(e, "copy_link")}
            className="w-full flex items-center gap-2.5 px-2 py-1.5 text-[13px] font-medium text-linear-text-muted hover:text-linear-text rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
          >
            <Link
              size={14}
              className="transition-colors group-hover:text-linear-text"
            />
            <span>Copy Link</span>
          </button>

          {!isOwnPost && (
            <button
              onClick={(e) => handleAction(e, "mute_author")}
              className="w-full flex items-center gap-2.5 px-2 py-1.5 text-[13px] font-medium text-linear-text-muted hover:text-linear-text rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
            >
              <BellOff
                size={14}
                className="transition-colors group-hover:text-linear-text"
              />
              <span>Mute Author</span>
            </button>
          )}

          <div className="h-px bg-black/10 dark:bg-white/10 my-1 mx-1" />

          {!isOwnPost ? (
            <button
              onClick={(e) => handleAction(e, "report")}
              className="w-full flex items-center gap-2.5 px-2 py-1.5 text-[13px] font-medium text-linear-text-muted hover:text-orange-600 dark:hover:text-orange-400 rounded-md hover:bg-orange-500/10 transition-colors group"
            >
              <FlagIcon
                size={14}
                className="transition-colors group-hover:text-orange-500 dark:group-hover:text-orange-400"
              />
              <span>Report Post</span>
            </button>
          ) : (
            <>
              <button
                onClick={(e) => handleAction(e, "edit")}
                className="w-full flex items-center gap-2.5 px-2 py-1.5 text-[13px] font-medium text-linear-text-muted hover:text-linear-text rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
              >
                <Pencil
                  size={14}
                  className="transition-colors group-hover:text-linear-text"
                />
                <span>Edit Post</span>
              </button>
              <button
                onClick={(e) => handleAction(e, "delete")}
                className="w-full flex items-center gap-2.5 px-2 py-1.5 text-[13px] font-medium text-linear-text-muted hover:text-red-600 dark:hover:text-red-400 rounded-md hover:bg-red-500/10 transition-colors group"
              >
                <Trash2
                  size={14}
                  className="transition-colors group-hover:text-red-600 dark:group-hover:text-red-400"
                />
                <span>Delete Post</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
