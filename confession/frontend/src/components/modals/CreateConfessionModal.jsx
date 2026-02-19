import * as Dialog from "@radix-ui/react-dialog";
import { X, Lock, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

export function CreateConfessionModal({ children }) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("Work");
  const [content, setContent] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);

  const handleCodeChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace auto-focus
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePost = () => {
    console.log({ topic, content, code: code.join("") });
    setOpen(false);
    setContent("");
    setCode(["", "", "", ""]);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-0 border border-linear-border bg-linear-bg shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-xl overflow-hidden font-sans selection:bg-black/10 dark:selection:bg-white/20">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-linear-border px-6 py-4 bg-linear-bg">
            <Dialog.Title className="text-[15px] font-semibold tracking-tight text-linear-text font-poppins">
              Create Confession
            </Dialog.Title>
            <Dialog.Close className="rounded-md p-1 opacity-70 transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:opacity-100 focus:outline-none">
              <X
                size={18}
                className="text-linear-text-muted hover:text-linear-text transition-colors"
              />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="px-6 py-6 space-y-6 bg-linear-bg">
            {/* Topic */}
            <div>
              <label className="text-[10px] font-semibold text-linear-text-muted uppercase tracking-wider mb-3 block">
                Topic
              </label>
              <div className="flex gap-2">
                {["Love", "Work", "Petty", "Secret"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTopic(t)}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-[12px] font-medium border transition-all",
                      topic === t
                        ? "bg-linear-text text-linear-bg border-transparent shadow-sm"
                        : "bg-transparent border-black/10 dark:border-white/10 text-linear-text-muted hover:text-linear-text hover:bg-black/5 dark:hover:bg-white/5",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[13px] font-medium text-linear-text">
                  Content
                </label>
                <span className="text-[10px] text-linear-text-muted bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded-sm border border-black/5 dark:border-white/10 font-medium">
                  Markdown supported
                </span>
              </div>
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  maxLength={500}
                  placeholder="Write your confession here..."
                  className="w-full h-32 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-3 text-[13px] text-linear-text focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-all placeholder:text-linear-text-muted/50 resize-none font-poppins"
                />
                <span className="absolute bottom-3 right-3 text-[10px] text-linear-text-muted font-mono bg-linear-bg/80 px-1 rounded backdrop-blur-sm">
                  {content.length}/500
                </span>
              </div>
            </div>

            {/* Deletion Code */}
            <div className="bg-black/[0.02] dark:bg-white/[0.02] rounded-lg p-4 border border-linear-border/50">
              <label className="text-[13px] font-medium text-linear-text mb-3 block">
                Deletion Code
              </label>
              <div className="flex items-start gap-6">
                <div className="flex gap-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="size-10 text-center bg-linear-bg border border-black/10 dark:border-white/10 rounded-md text-[15px] font-semibold text-linear-text focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-all placeholder:text-linear-text-muted/30"
                      placeholder="0"
                    />
                  ))}
                </div>
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-[11px] font-medium text-linear-text-muted">
                    <Lock size={12} className="opacity-70" />
                    <span>End-to-end encrypted</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-medium text-linear-text-muted">
                    <EyeOff size={12} className="opacity-70" />
                    <span>No IP logging</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-linear-text-muted mt-3 font-medium">
                Set a 4-digit code to delete this later. Don't forget it.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-linear-border px-6 py-4 bg-black/[0.02] dark:bg-white/[0.02]">
            <Dialog.Close asChild>
              <button className="px-4 py-2 text-[12px] font-medium text-linear-text-muted hover:text-linear-text transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5">
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={handlePost}
              disabled={!content.trim()}
              className="px-5 py-2 bg-linear-text text-linear-bg rounded-md text-[12px] font-semibold hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post Anonymously
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
