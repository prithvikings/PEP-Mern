import { Plus, MoreVertical, Coffee } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";

import { Home } from "../ui/home";
import { Flame } from "../ui/flame";
import { MessageCircleIcon } from "../ui/message-circle";
import { BellIcon } from "../ui/bell";
import { BookmarkIcon } from "../ui/bookmark";

import { cn } from "../../lib/utils";
import { CreateConfessionModal } from "../modals/CreateConfessionModal";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home Feed", path: "/" },
    { icon: Flame, label: "Trending Tea", path: "/trending" },
    {
      icon: MessageCircleIcon,
      label: "My Whispers",
      path: "/my-whispers",
      count: 12,
    },
    {
      icon: BellIcon,
      label: "Notifications",
      path: "/notifications",
      count: 3,
    },
    { icon: BookmarkIcon, label: "Saved", path: "/saved" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isSettingsActive = location.pathname === "/settings";

  return (
    <aside className="font-poppins w-64 flex-shrink-0 flex flex-col justify-between border-r border-linear-border bg-linear-bg h-screen sticky top-0 selection:bg-black/10 dark:selection:bg-white/20">
      {/* Top Section */}
      <div className="flex flex-col gap-1 p-3">
        {/* Logo */}
        <div className="flex items-center gap-3 px-3 py-4 mb-2">
          <div className="flex items-center justify-center rounded-md bg-linear-text text-linear-bg size-6 shadow-sm">
            <Coffee size={14} strokeWidth={3} />
          </div>
          <h1 className="text-linear-text text-[15px] font-semibold tracking-tight">
            TeaTeller
          </h1>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const iconRef = useRef(null);

            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                onMouseEnter={() => iconRef.current?.startAnimation()}
                onMouseLeave={() => iconRef.current?.stopAnimation()}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-all group w-full text-left",
                  active
                    ? "bg-black/5 dark:bg-white/10 text-linear-text"
                    : "text-linear-text-muted hover:text-linear-text hover:bg-black/5 dark:hover:bg-white/5",
                )}
              >
                <Icon
                  ref={iconRef}
                  size={18}
                  className={cn(
                    "opacity-70 group-hover:opacity-100 transition-colors size-4",
                    active && "opacity-100 text-linear-text",
                  )}
                />

                <span
                  className={cn(
                    "text-[13px]",
                    active ? "font-semibold" : "font-medium",
                  )}
                >
                  {item.label}
                </span>

                {item.count && (
                  <span
                    className={cn(
                      "ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded-sm font-medium",
                      active
                        ? "bg-black/10 dark:bg-white/20 text-linear-text"
                        : "bg-black/5 dark:bg-white/5 text-linear-text-muted",
                    )}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-linear-border flex flex-col gap-3">
        {/* New Confession Button */}
        <CreateConfessionModal>
          <button className="flex w-full items-center justify-center gap-2 rounded-md bg-linear-text text-linear-bg hover:opacity-90 py-2 px-3 shadow-sm transition-opacity text-[13px] font-semibold cursor-pointer">
            <Plus size={16} />
            <span>New Confession</span>
          </button>
        </CreateConfessionModal>

        {/* User Profile */}
        <div
          onClick={() => navigate("/settings")}
          className={cn(
            "flex items-center gap-2.5 px-2 py-2 rounded-md cursor-pointer transition-colors group",
            isSettingsActive
              ? "bg-black/5 dark:bg-white/10"
              : "hover:bg-black/5 dark:hover:bg-white/5",
          )}
        >
          {/* Avatar */}
          <div className="relative">
            <div className="size-8 rounded-md bg-linear-border overflow-hidden border border-black/10 dark:border-white/10">
              <div className="size-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20" />
            </div>
            <div className="absolute -bottom-1 -right-1 size-3 bg-emerald-500 rounded-full border-2 border-linear-bg"></div>
          </div>

          {/* User Info */}
          <div className="flex flex-col text-left">
            <span
              className={cn(
                "text-[13px] text-linear-text",
                isSettingsActive ? "font-semibold" : "font-medium",
              )}
            >
              Ghost User #99
            </span>
            <span className="text-[11px] text-linear-text-muted">
              Anonymous
            </span>
          </div>

          {/* More Icon */}
          <MoreVertical
            size={16}
            className={cn(
              "ml-auto transition-opacity",
              isSettingsActive
                ? "text-linear-text opacity-100"
                : "text-linear-text-muted opacity-0 group-hover:opacity-100",
            )}
          />
        </div>
      </div>
    </aside>
  );
}
