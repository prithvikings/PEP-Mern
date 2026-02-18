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

  const handlePost = () => {
    // Add your post logic here
    console.log({ topic, content, code });
    setOpen(false); // Close modal after posting
    setContent(""); // Reset form
    setCode(["", "", "", ""]);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* The element passed as children will become the clickable trigger */}
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-0 border border-linear-border bg-[#09090b] shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-linear-border px-6 py-4 bg-[#09090b]">
            <Dialog.Title className="text-lg font-semibold text-linear-text">
              Create Confession
            </Dialog.Title>
            <Dialog.Close className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
              <X
                size={20}
                className="text-zinc-500 hover:text-white transition-colors"
              />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="px-6 py-6 space-y-6 bg-[#09090b]">
            {/* Topic */}
            <div>
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-3 block">
                TOPIC
              </label>
              <div className="flex gap-2">
                {["Love", "Work", "Petty", "Secret"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTopic(t)}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-xs font-medium border transition-all",
                      topic === t
                        ? "bg-white text-black border-white shadow-[0_0_10px_-2px_rgba(255,255,255,0.3)]"
                        : "bg-transparent border-linear-border text-zinc-400 hover:text-white hover:bg-zinc-900",
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
                <label className="text-sm font-medium text-linear-text">
                  Content
                </label>
                <span className="text-[10px] text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                  Markdown supported
                </span>
              </div>
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  maxLength={500}
                  placeholder="Write your confession here..."
                  className="w-full h-32 bg-zinc-900/30 border border-linear-border rounded-xl p-4 text-sm text-linear-text focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-all placeholder:text-zinc-700 resize-none"
                />
                <span className="absolute bottom-3 right-3 text-[10px] text-zinc-600 font-mono">
                  {content.length}/500
                </span>
              </div>
            </div>

            {/* Deletion Code */}
            <div className="bg-zinc-900/30 rounded-xl p-4 border border-linear-border/50">
              <label className="text-sm font-medium text-linear-text mb-3 block">
                Deletion Code
              </label>
              <div className="flex items-start gap-6">
                <div className="flex gap-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      className="size-10 text-center bg-black border border-zinc-800 rounded-lg text-lg font-bold text-white focus:outline-none focus:border-zinc-600 transition-all placeholder-zinc-800"
                      placeholder="0"
                    />
                  ))}
                </div>
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                    <Lock size={10} />
                    <span>End-to-end encrypted</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                    <EyeOff size={10} />
                    <span>No IP logging</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-zinc-600 mt-2 ml-1">
                Set a 4-digit code to delete this later.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-linear-border px-6 py-4 bg-zinc-900/20">
            <Dialog.Close asChild>
              <button className="px-4 py-2 text-xs font-medium text-zinc-500 hover:text-white transition-colors">
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={handlePost}
              className="px-6 py-2 bg-white text-black rounded-lg text-xs font-bold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5"
            >
              Post Anonymously
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
