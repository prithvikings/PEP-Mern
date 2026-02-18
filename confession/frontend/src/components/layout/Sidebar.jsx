import {
  Home,
  Flame,
  MessageCircle,
  Bell,
  Bookmark,
  Plus,
  MoreVertical,
  Coffee,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { CreateConfessionModal } from "../modals/CreateConfessionModal";

const iconMap = { Home, Flame, MessageCircle, Bell, Bookmark };

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Define nav items locally with paths
  const navItems = [
    { icon: "Home", label: "Home Feed", path: "/" },
    { icon: "Flame", label: "Trending Tea", path: "/trending" },
    {
      icon: "MessageCircle",
      label: "My Whispers",
      path: "/my-whispers",
      count: 12,
    },
    { icon: "Bell", label: "Notifications", path: "/notifications", count: 3 },
    { icon: "Bookmark", label: "Saved", path: "/saved" },
  ];

  // Helper to determine if a tab is active
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col justify-between border-r border-linear-border bg-linear-bg h-screen sticky top-0">
      <div className="flex flex-col gap-1 p-3">
        {/* Logo */}
        <div className="flex items-center gap-3 px-3 py-4 mb-2">
          <div className="flex items-center justify-center rounded-md bg-white text-black size-6 shadow-sm">
            <Coffee size={14} strokeWidth={3} />
          </div>
          <h1 className="text-linear-text text-sm font-semibold tracking-tight">
            TeaTeller
          </h1>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            // @ts-ignore - Lucide icon mapping
            const Icon = iconMap[item.icon];
            const active = isActive(item.path);

            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-all group w-full text-left",
                  active
                    ? "bg-white/5 text-linear-text"
                    : "text-linear-text-muted hover:text-linear-text hover:bg-white/5",
                )}
              >
                <Icon
                  size={18}
                  className={cn(
                    "opacity-80 group-hover:opacity-100 transition-colors",
                    active && "opacity-100 text-linear-primary",
                  )}
                />
                <span className="text-[13px] font-medium">{item.label}</span>
                {item.count && (
                  <span className="ml-auto bg-linear-border text-linear-text-muted text-[10px] font-mono px-1.5 rounded-sm">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-linear-border flex flex-col gap-3">
        <CreateConfessionModal>
          <button className="flex w-full items-center justify-center gap-2 rounded-md bg-linear-primary hover:bg-linear-primary-hover text-white py-2 px-3 shadow-sm transition-all text-xs font-medium cursor-pointer">
            <Plus size={16} />
            <span>New Confession</span>
          </button>
        </CreateConfessionModal>

        <div
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2.5 px-2 py-2 rounded-md hover:bg-white/5 cursor-pointer transition-colors group"
        >
          <div className="relative">
            <div className="size-8 rounded-full bg-linear-border overflow-hidden ring-1 ring-white/10">
              {/* Avatar Placeholder */}
              <div className="size-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20" />
            </div>
            <div className="absolute bottom-0 right-0 size-2 bg-emerald-500 rounded-full border border-linear-bg"></div>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[13px] font-medium text-linear-text">
              Ghost User #99
            </span>
            <span className="text-[11px] text-linear-text-muted">
              Anonymous
            </span>
          </div>
          <MoreVertical
            size={16}
            className="ml-auto text-linear-text-muted opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </aside>
  );
}
