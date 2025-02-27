import React from "react";
import * as alertDialog from "@/components/ui/alert-dialog";
import { twMerge } from "tailwind-merge";

interface AlertDialogProps {
  title: string;
  descritpion: string;
  cancelMessage: string;
  actionMessage: string;
  actionVariant: "default" | "destructive";
  actionOnClick: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function AlertDialog({
  title,
  descritpion,
  cancelMessage = "キャンセル",
  actionMessage = "続ける",
  actionVariant = "default",
  actionOnClick,
  open,
  onOpenChange,
}: AlertDialogProps) {
  return (
    <alertDialog.AlertDialog open={open} onOpenChange={onOpenChange}>
      <alertDialog.AlertDialogContent>
        <alertDialog.AlertDialogHeader>
          <alertDialog.AlertDialogTitle>{title}</alertDialog.AlertDialogTitle>
          <alertDialog.AlertDialogDescription>
            {descritpion}
          </alertDialog.AlertDialogDescription>
        </alertDialog.AlertDialogHeader>
        <alertDialog.AlertDialogFooter>
          <alertDialog.AlertDialogCancel>
            {cancelMessage}
          </alertDialog.AlertDialogCancel>
          <alertDialog.AlertDialogAction
            onClick={actionOnClick}
            className={
              actionVariant === "destructive"
                ? "bg-destructive ring-destructive, text-destructive-foreground"
                : ""
            }
          >
            {actionMessage}
          </alertDialog.AlertDialogAction>
        </alertDialog.AlertDialogFooter>
      </alertDialog.AlertDialogContent>
    </alertDialog.AlertDialog>
  );
}

export default AlertDialog;
export type { AlertDialogProps };
