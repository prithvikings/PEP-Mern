import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Confetti from "react-confetti"; // Added import
import { ConfessionCard } from "../components/feed/ConfessionCard";
import { CONFESSIONS } from "../data/mockData";
import { cn } from "../lib/utils";

export function HomeFeed() {
  const location = useLocation();
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    // Check if the user just arrived from onboarding
    if (location.state?.showConfetti) {
      setIsExploding(true);

      // Wipe the state from the browser history so refreshing doesn't trigger it again
      window.history.replaceState({}, document.title);

      // Turn off the confetti engine after 5 seconds to save memory
      setTimeout(() => setIsExploding(false), 5000);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-linear-bg relative">
      {/* Confetti Layer - pointer-events-none ensures it doesn't block clicks */}
      {isExploding && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <Confetti
            width={typeof window !== "undefined" ? window.innerWidth : 1920}
            height={typeof window !== "undefined" ? window.innerHeight : 1080}
            recycle={false} // Only shoots once, doesn't loop infinitely
            numberOfPieces={400}
            gravity={0.15}
          />
        </div>
      )}

      <Header />

      <div className="p-5 pb-24">
        <div className="w-full mx-auto flex flex-col gap-4">
          {CONFESSIONS.map((post) => (
            <ConfessionCard key={post.id} data={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Header() {
  const searchInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("latest");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-linear-border bg-linear-bg/90 backdrop-blur-xl font-poppins">
      <div className="flex flex-col md:flex-row md:items-center justify-between px-5 py-4 gap-4">
        {/* Search Input */}
        <div className="relative w-full max-w-md group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-linear-text-muted transition-colors group-focus-within:text-linear-text"
            size={14}
          />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search secrets..."
            className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-linear-text text-[13px] rounded-md py-1.5 pl-9 pr-14 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-all placeholder:text-linear-text-muted/60"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-sm text-[10px] font-medium text-linear-text-muted font-sans">
              <span className="text-[11px]">⌘</span>K
            </kbd>
          </div>
        </div>

        {/* Latest / Popular Toggle */}
        <div className="flex items-center p-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md shrink-0">
          <button
            onClick={() => setActiveTab("latest")}
            className={cn(
              "px-3 py-1 rounded-sm text-[12px] font-semibold transition-all cursor-pointer",
              activeTab === "latest"
                ? "bg-linear-bg text-linear-text shadow-sm border border-black/5 dark:border-white/5"
                : "text-linear-text-muted hover:text-linear-text",
            )}
          >
            Latest
          </button>
          <button
            onClick={() => setActiveTab("popular")}
            className={cn(
              "px-3 py-1 rounded-sm text-[12px] font-semibold transition-all cursor-pointer",
              activeTab === "popular"
                ? "bg-linear-bg text-linear-text shadow-sm border border-black/5 dark:border-white/5"
                : "text-linear-text-muted hover:text-linear-text",
            )}
          >
            Popular
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-1.5 px-5 pb-4 overflow-x-auto no-scrollbar">
        {[
          "All",
          "Funny",
          "College",
          "Work",
          "Relationships",
          "Spiciest",
          "Deep Thoughts",
        ].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "px-3 py-1 text-[12px] font-medium rounded-md transition-all border whitespace-nowrap",
              activeFilter === filter
                ? "bg-black/5 dark:bg-white/10 text-linear-text border-black/10 dark:border-white/10 shadow-sm"
                : "bg-transparent text-linear-text-muted border-transparent hover:text-linear-text hover:bg-black/5 dark:hover:bg-white/5",
            )}
          >
            {filter}
          </button>
        ))}
      </div>
    </header>
  );
}
