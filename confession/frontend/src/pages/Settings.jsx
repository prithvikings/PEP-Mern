import {
  User,
  Mail,
  Moon,
  Shield,
  Smartphone,
  Laptop,
  LogOut,
  Trash2,
  ExternalLink,
  Sun,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useTheme } from "../context/ThemeContext";

export function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-linear-bg text-linear-text font-sans pb-20">
      {/* Page Header */}
      <div className="sticky top-0 z-20 bg-linear-bg/95 backdrop-blur-xl border-b border-linear-border mb-8">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-semibold tracking-tight mb-1">
            Account Settings
          </h1>
          <p className="text-linear-text-muted text-sm">
            Manage your profile, preferences, and security settings.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-10">
        {/* Profile Section */}
        <section>
          <h2 className="text-sm font-medium text-linear-text mb-4">Profile</h2>
          <div className="p-6 rounded-lg border border-linear-border bg-transparent flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-lg">
                J
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-medium text-linear-text">
                    john.doe@gmail.com
                  </span>
                  <span className="bg-zinc-800 text-zinc-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-zinc-700">
                    Private
                  </span>
                </div>
                <p className="text-xs text-linear-text-muted">
                  This email is only visible to you. It's used for account
                  recovery.
                </p>
              </div>
            </div>
            <button className="px-4 py-2 text-xs font-medium text-linear-text border border-linear-border rounded-md hover:bg-white/5 transition-colors">
              Unlink Google Account
            </button>
          </div>
        </section>

        {/* Preferences Section */}
        <section>
          <h2 className="text-sm font-medium text-linear-text mb-4">
            Preferences
          </h2>
          <div className="rounded-lg border border-linear-border bg-transparent divide-y divide-linear-border">
            {/* Email Notification Toggle */}
            <div className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-linear-text mb-1">
                  Email Notifications
                </h3>
                <p className="text-xs text-linear-text-muted">
                  Receive updates about your confessions and replies.
                </p>
              </div>
              {/* Toggle Switch */}
              <button className="w-11 h-6 bg-linear-text rounded-full relative transition-colors">
                <div className="absolute top-1 right-1 size-4 bg-linear-bg rounded-full shadow-sm" />
              </button>
            </div>

            <div className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-linear-text mb-1">
                  Appearance
                </h3>
                <p className="text-xs text-linear-text-muted">
                  Customize how TeaTeller looks on your device.
                </p>
              </div>

              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-3 py-1.5 rounded-md border border-linear-border hover:bg-linear-surface transition-colors group cursor-pointer"
              >
                <span className="text-xs text-linear-text-muted font-medium group-hover:text-linear-text transition-colors">
                  {theme === "dark" ? "Dark Mode" : "Light Mode"}
                </span>
                <div
                  className={cn(
                    "size-8 rounded-md flex items-center justify-center border transition-all",
                    theme === "dark"
                      ? "bg-zinc-800 text-zinc-400 border-zinc-700"
                      : "bg-orange-100 text-orange-500 border-orange-200",
                  )}
                >
                  {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section>
          <h2 className="text-sm font-medium text-linear-text mb-4">
            Security
          </h2>
          <div className="rounded-lg border border-linear-border bg-transparent divide-y divide-linear-border">
            {/* Global Secret Code */}
            <div className="p-6 flex items-center justify-between">
              <div className="max-w-lg">
                <h3 className="text-sm font-medium text-linear-text mb-1">
                  Global Secret Code
                </h3>
                <p className="text-xs text-linear-text-muted leading-relaxed">
                  Your secret code is used to decrypt your private confessions.
                  If lost, it cannot be recovered.
                </p>
              </div>
              <button className="px-4 py-2 text-xs font-medium text-linear-text border border-linear-border rounded-md hover:bg-white/5 transition-colors">
                Reset Code
              </button>
            </div>

            {/* Active Sessions */}
            <div className="p-6">
              <h3 className="text-sm font-medium text-linear-text mb-4">
                Active Sessions
              </h3>
              <div className="space-y-4">
                {/* Session 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded bg-zinc-800 flex items-center justify-center text-zinc-400">
                      <Laptop size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-linear-text">
                        Chrome on macOS
                      </p>
                      <p className="text-[11px] text-linear-text-muted">
                        Frankfurt, DE • Active now
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    Current Session
                  </span>
                </div>

                {/* Session 2 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded bg-zinc-800 flex items-center justify-center text-zinc-400">
                      <Smartphone size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-linear-text">
                        Safari on iPhone 14
                      </p>
                      <p className="text-[11px] text-linear-text-muted">
                        Berlin, DE • 2 hours ago
                      </p>
                    </div>
                  </div>
                  <button className="text-xs text-linear-text-muted hover:text-linear-text underline underline-offset-2 transition-colors">
                    Revoke
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <h2 className="text-sm font-medium text-rose-500 mb-4">
            Danger Zone
          </h2>
          <div className="p-6 rounded-lg border border-rose-500/20 bg-rose-500/5 flex items-center justify-between">
            <div className="max-w-lg">
              <h3 className="text-sm font-medium text-linear-text mb-1">
                Delete Account
              </h3>
              <p className="text-xs text-linear-text-muted leading-relaxed">
                Permanently remove your account, Personal Secret, and all
                confessions. This action is not reversible.
              </p>
            </div>
            <button className="px-4 py-2 text-xs font-medium text-rose-400 border border-rose-500/20 rounded-md hover:bg-rose-500/10 transition-colors">
              Delete Account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
