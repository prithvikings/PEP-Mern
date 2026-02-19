import * as Dialog from "@radix-ui/react-dialog";
import { X, Trash2 } from "lucide-react";
import { useState } from "react";

export function DeleteAccountModal({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-0 border border-red-500/20 bg-linear-bg shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-xl overflow-hidden font-sans selection:bg-rose-500/30">
          <div className="flex items-center justify-between border-b border-red-500/10 px-6 py-4 bg-red-500/5">
            <Dialog.Title className="text-[15px] font-semibold tracking-tight text-red-600 dark:text-red-400 flex items-center gap-2">
              <Trash2 size={16} />
              Delete Account
            </Dialog.Title>
            <Dialog.Close className="rounded-md p-1 opacity-70 transition-colors hover:bg-red-500/10 hover:opacity-100">
              <X
                size={18}
                className="text-red-600 dark:text-red-400 transition-colors"
              />
            </Dialog.Close>
          </div>

          <div className="p-6 bg-linear-bg">
            <p className="text-[13px] text-linear-text-muted leading-relaxed mb-4">
              This action is{" "}
              <span className="font-bold text-linear-text">
                permanent and irreversible
              </span>
              . All your confessions, replies, and saved items will be deleted
              immediately.
            </p>
            <p className="text-[13px] text-linear-text-muted mb-2">
              Please type{" "}
              <span className="font-bold text-linear-text select-all">
                DELETE
              </span>{" "}
              to confirm.
            </p>
            <input
              type="text"
              placeholder="DELETE"
              className="w-full bg-black/5 dark:bg-white/5 border border-red-500/20 rounded-md py-2 px-3 text-[13px] text-linear-text focus:outline-none focus:border-red-500/50 transition-all"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-linear-border px-6 py-4 bg-black/[0.02] dark:bg-white/[0.02]">
            <Dialog.Close asChild>
              <button className="px-4 py-2 text-[12px] font-medium text-linear-text-muted hover:text-linear-text transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5">
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={() => setOpen(false)}
              className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-[12px] font-semibold transition-colors shadow-sm"
            >
              Delete My Account
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
