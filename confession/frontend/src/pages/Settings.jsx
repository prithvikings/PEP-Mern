import { useState } from "react";
import { Moon, Smartphone, Laptop, Sun } from "lucide-react";
import { cn } from "../lib/utils";
import { useTheme } from "../context/ThemeContext";

// Import your new Modals
import { UnlinkAccountModal } from "../components/modals/UnlinkAccountModal";
import { ResetCodeModal } from "../components/modals/ResetCodeModal";
import { DeleteAccountModal } from "../components/modals/DeleteAccountModal";

// Reusable Toggle Switch
const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className={cn(
      "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
      checked ? "bg-linear-text" : "bg-black/10 dark:bg-white/10",
    )}
  >
    <span
      className={cn(
        "pointer-events-none inline-block size-4 transform rounded-full bg-linear-bg shadow-sm ring-0 transition duration-200 ease-in-out",
        checked ? "translate-x-4" : "translate-x-0",
      )}
    />
  </button>
);

export function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [emailNotifs, setEmailNotifs] = useState(true);

  return (
    <div className="min-h-screen bg-linear-bg text-linear-text font-sans pb-24 selection:bg-black/10 dark:selection:bg-white/20">
      {/* Page Header */}
      <div className="sticky top-0 z-20 bg-linear-bg/90 backdrop-blur-xl border-b border-linear-border mb-8 font-poppins">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <h1 className="text-[18px] font-semibold tracking-tight mb-1">
            Account Settings
          </h1>
          <p className="text-linear-text-muted text-[13px]">
            Manage your profile, preferences, and security settings.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-12">
        {/* Profile Section */}
        <section>
          <h2 className="text-[11px] font-semibold text-linear-text-muted uppercase tracking-wider mb-4">
            Profile
          </h2>
          <div className="p-5 rounded-lg border border-linear-border bg-linear-bg shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-lg font-poppins">
                J
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-[13px] text-linear-text">
                    john.doe@gmail.com
                  </span>
                  <span className="bg-black/5 dark:bg-white/5 text-linear-text-muted text-[9px] font-bold px-1.5 py-0.5 rounded-sm border border-black/10 dark:border-white/10 uppercase tracking-wider">
                    Private
                  </span>
                </div>
                <p className="text-[11px] text-linear-text-muted">
                  This email is only visible to you. It's used for account
                  recovery.
                </p>
              </div>
            </div>

            <UnlinkAccountModal>
              <button className="px-3 py-1.5 text-[12px] font-medium text-linear-text border border-linear-border rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                Unlink Account
              </button>
            </UnlinkAccountModal>
          </div>
        </section>

        {/* Preferences Section */}
        <section>
          <h2 className="text-[11px] font-semibold text-linear-text-muted uppercase tracking-wider mb-4">
            Preferences
          </h2>
          <div className="rounded-lg border border-linear-border bg-linear-bg shadow-sm divide-y divide-linear-border">
            {/* Email Notification Toggle */}
            <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="text-[13px] font-medium text-linear-text mb-1">
                  Email Notifications
                </h3>
                <p className="text-[11px] text-linear-text-muted">
                  Receive updates about your confessions and replies.
                </p>
              </div>
              <Toggle
                checked={emailNotifs}
                onChange={() => setEmailNotifs(!emailNotifs)}
              />
            </div>

            {/* Theme Toggle */}
            <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="text-[13px] font-medium text-linear-text mb-1">
                  Appearance
                </h3>
                <p className="text-[11px] text-linear-text-muted">
                  Customize how TeaTeller looks on your device.
                </p>
              </div>

              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-3 py-1.5 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <span className="text-[12px] text-linear-text-muted font-medium group-hover:text-linear-text transition-colors">
                  {theme === "dark" ? "Dark Mode" : "Light Mode"}
                </span>
                <div
                  className={cn(
                    "size-7 rounded-md flex items-center justify-center border transition-all",
                    theme === "dark"
                      ? "bg-black/20 text-white border-white/10"
                      : "bg-orange-100 text-orange-500 border-orange-200",
                  )}
                >
                  {theme === "dark" ? <Moon size={14} /> : <Sun size={14} />}
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section>
          <h2 className="text-[11px] font-semibold text-linear-text-muted uppercase tracking-wider mb-4">
            Security
          </h2>
          <div className="rounded-lg border border-linear-border bg-linear-bg shadow-sm divide-y divide-linear-border">
            {/* Global Secret Code */}
            <div className="p-5 flex items-center justify-between">
              <div className="max-w-lg pr-4">
                <h3 className="text-[13px] font-medium text-linear-text mb-1">
                  Global Secret Code
                </h3>
                <p className="text-[11px] text-linear-text-muted leading-relaxed">
                  Your secret code is used to decrypt your private confessions.
                  If lost, it cannot be recovered.
                </p>
              </div>

              <ResetCodeModal>
                <button className="shrink-0 px-3 py-1.5 text-[12px] font-medium text-linear-text border border-linear-border rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                  Reset Code
                </button>
              </ResetCodeModal>
            </div>

            {/* Active Sessions */}
            <div className="p-5">
              <h3 className="text-[13px] font-medium text-linear-text mb-5">
                Active Sessions
              </h3>
              <div className="space-y-5">
                {/* Session 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-linear-text-muted">
                      <Laptop size={14} />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-linear-text">
                        Chrome on macOS
                      </p>
                      <p className="text-[11px] text-linear-text-muted mt-0.5">
                        Frankfurt, DE • Active now
                      </p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                    Current
                  </span>
                </div>

                {/* Session 2 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-linear-text-muted">
                      <Smartphone size={14} />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-linear-text">
                        Safari on iPhone 14
                      </p>
                      <p className="text-[11px] text-linear-text-muted mt-0.5">
                        Berlin, DE • 2 hours ago
                      </p>
                    </div>
                  </div>
                  <button className="text-[11px] font-medium text-linear-text-muted hover:text-linear-text underline underline-offset-2 transition-colors cursor-pointer">
                    Revoke
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <h2 className="text-[11px] font-semibold text-red-500 dark:text-red-400 uppercase tracking-wider mb-4">
            Danger Zone
          </h2>
          <div className="p-5 rounded-lg border border-red-500/20 bg-red-500/[0.02] flex items-center justify-between shadow-sm">
            <div className="max-w-lg pr-4">
              <h3 className="text-[13px] font-medium text-red-600 dark:text-red-400 mb-1">
                Delete Account
              </h3>
              <p className="text-[11px] text-linear-text-muted leading-relaxed">
                Permanently remove your account, Personal Secret, and all
                confessions. This action is not reversible.
              </p>
            </div>

            <DeleteAccountModal>
              <button className="shrink-0 px-3 py-1.5 text-[12px] font-medium text-red-600 dark:text-red-400 border border-red-500/20 rounded-md hover:bg-red-500/10 transition-colors cursor-pointer">
                Delete Account
              </button>
            </DeleteAccountModal>
          </div>
        </section>
      </div>
    </div>
  );
}
