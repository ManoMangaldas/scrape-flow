"use client";
import { DeleteWorkflow } from "@/actions/workflows/deleteworkflow";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Delete } from "lucide-react";

import React from "react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
  workflowId: string;
};

const DeleteWorkflowDialog = (props: Props) => {
  const [confirmText, setConfirmText] = React.useState("");
  const deleteMutation = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: e => {
      toast.getToasts().forEach(t => {
        toast.dismiss(t.id);
      });
      toast.success("Workflow deleted successfully", { id: props.workflowId });
      setConfirmText("");
      props.setOpen(false);
    },
    onError: () => {
      toast.error("Failed to delete workflow", { id: props.workflowId });
      setConfirmText("");
    },
  });
  return (
    <AlertDialog open={props.open} onOpenChange={props.setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
            <div className="flex flex-col py-4 gap-2">
              <p>
                If you are sure, enter <b>{props.workflowName}</b> to confirm:
              </p>
              <Input value={confirmText} onChange={e => setConfirmText(e.target.value)}></Input>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== props.workflowName || deleteMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
            onClick={e => {
              toast.loading(`Deleting workflow... ${props.workflowId}`);
              deleteMutation.mutate(props.workflowId);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWorkflowDialog;
