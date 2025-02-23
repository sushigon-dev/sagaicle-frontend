import * as dialog from "@/components/ui/dialog";
import type PopUpProps from "./pop_up_props";

interface DialogProps extends PopUpProps {}

export function Dialog({
  title,
  description,
  children,
  open,
  onOpenChange,
}: DialogProps) {
  return (
    <dialog.Dialog open={open} onOpenChange={onOpenChange}>
      <dialog.DialogContent className="sm:max-w-md">
        <dialog.DialogHeader>
          <dialog.DialogTitle>{title}</dialog.DialogTitle>
          {description && (
            <dialog.DialogDescription>{description}</dialog.DialogDescription>
          )}
        </dialog.DialogHeader>
        {children}
      </dialog.DialogContent>
    </dialog.Dialog>
  );
}

export default Dialog;
