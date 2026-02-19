import * as Dialog from "@radix-ui/react-dialog";
import { X, KeyRound } from "lucide-react";
import { useState } from "react";

export function ResetCodeModal({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-0 border border-linear-border bg-linear-bg shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-xl overflow-hidden font-sans selection:bg-black/10 dark:selection:bg-white/20">
          <div className="flex items-center justify-between border-b border-linear-border px-6 py-4 bg-linear-bg">
            <Dialog.Title className="text-[15px] font-semibold tracking-tight text-linear-text flex items-center gap-2">
              <KeyRound size={16} className="text-linear-text-muted" />
              Reset Secret Code
            </Dialog.Title>
            <Dialog.Close className="rounded-md p-1 opacity-70 transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:opacity-100">
              <X
                size={18}
                className="text-linear-text-muted hover:text-linear-text transition-colors"
              />
            </Dialog.Close>
          </div>

          <div className="p-6 bg-linear-bg space-y-4">
            <p className="text-[13px] text-linear-text-muted leading-relaxed">
              Enter your current code and your new 4-digit code below.
            </p>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current Code"
                maxLength={4}
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md py-2 px-3 text-[13px] text-linear-text focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-all placeholder:text-linear-text-muted/60 text-center tracking-[1em]"
              />
              <input
                type="password"
                placeholder="New Code"
                maxLength={4}
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md py-2 px-3 text-[13px] text-linear-text focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-all placeholder:text-linear-text-muted/60 text-center tracking-[1em]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-linear-border px-6 py-4 bg-black/[0.02] dark:bg-white/[0.02]">
            <Dialog.Close asChild>
              <button className="px-4 py-2 text-[12px] font-medium text-linear-text-muted hover:text-linear-text transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5">
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={() => setOpen(false)}
              className="px-5 py-2 bg-linear-text text-linear-bg rounded-md text-[12px] font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              Update Code
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
