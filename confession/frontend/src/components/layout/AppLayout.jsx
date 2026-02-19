import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { RightPanel } from "./RightPanel";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[260px_1fr_320px]">
        <Sidebar />

        {/* The Outlet is where the HomeFeed or PostDetails will render */}
        <main className="min-h-screen border-r border-zinc-200 dark:border-zinc-800 relative">
          <Outlet />
        </main>

        <RightPanel />
      </div>
    </div>
  );
}
