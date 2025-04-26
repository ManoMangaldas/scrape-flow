"use client";

import TooltipWrapper from "@/components/tooltipwrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Workflow } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { WorkflowStatus } from "@/types/workflow";
import { FileTextIcon, MoreVerticalIcon, PlayIcon, ShuffleIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import DeleteWorkflowDialog from "./delete-workflow-dialog";

type Props = {
  workflow: Workflow;
};

const statusColors = {
  [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
  [WorkflowStatus.PUBLISHED]: "bg-primary",
};

const WorkflowCard = (props: Props) => {
  const isDraft = props.workflow.status === WorkflowStatus.DRAFT;
  return (
    <Card className="border border-seperate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30 pt-4">
      <CardContent>
        <div className="flex items-center justify-between space-x-3 ">
          <div className="flex items-center justify-start space-x-3">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                statusColors[props.workflow.status as WorkflowStatus]
              )}
            >
              {isDraft ? (
                <FileTextIcon className="h-5 w-5"></FileTextIcon>
              ) : (
                <PlayIcon className="h-5 w-5 text-white"></PlayIcon>
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-muted-foreground flex items-center">
                <Link href={`/workflow/editor/${props.workflow.id}`} className="flex items-center hover:underline">
                  {props.workflow.name}
                </Link>
                {isDraft && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    Draft
                  </span>
                )}
              </h3>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href={`/workflow/editor/${props.workflow.id}`}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex items-center gap-2")}
            >
              <ShuffleIcon size={16} />
              Edit
            </Link>
            <WorkflowActions workflowName={props.workflow.name} workflowid={props.workflow.id}></WorkflowActions>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function WorkflowActions({ workflowName, workflowid }: { workflowName: string; workflowid: string }) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  return (
    <>
      <DeleteWorkflowDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        workflowName={workflowName}
        workflowId={workflowid}
      ></DeleteWorkflowDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size="sm">
            <TooltipWrapper content={"More Actions"}>
              <div className="flex items-center justify-center w-full h-full">
                <MoreVerticalIcon size={18}></MoreVerticalIcon>
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem
            className="text-destructive flex items-center gap-2"
            onSelect={() => setShowDeleteDialog(prev => !prev)}
          >
            <TrashIcon size={16}></TrashIcon>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default WorkflowCard;
