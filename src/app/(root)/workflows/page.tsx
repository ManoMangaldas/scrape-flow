import { GetWorkflowsForUser } from "@/actions/workflows/getworkflowsforuser";
import CreateWorkflowDialog from "@/components/dashboard/workflows/createworkflowdialog";
import WorkflowCard from "@/components/dashboard/workflows/workflowcard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { waitFor } from "@/lib/helper/wait";
import clsx from "clsx";
import { AlertCircle, InboxIcon } from "lucide-react";
import React, { Suspense } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
        <CreateWorkflowDialog></CreateWorkflowDialog>
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows></UserWorkflows>
        </Suspense>
      </div>
    </div>
  );
};

function UserWorkflowsSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map(i => (
        <Skeleton key={i} className="h-32 w-full"></Skeleton>
      ))}
    </div>
  );
}

async function UserWorkflows() {
  const workflows = await GetWorkflowsForUser();
  if (!workflows) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong. Please try again later.</AlertDescription>
      </Alert>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary"></InboxIcon>
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No workflow created yet</p>
          <p className="text-sm text-muted-foreground">Click the button below to create your first workflow</p>
        </div>
        <CreateWorkflowDialog triggerText="Create your first workflow"></CreateWorkflowDialog>
      </div>
    );
  }
  // return <pre>{JSON.stringify(workflows, null, 4)}</pre>;
  return (
    <div className="grid grid-cols-1 gap-4">
      {workflows.map(workflow => (
        <WorkflowCard key={workflow.id} workflow={workflow}></WorkflowCard>
      ))}
    </div>
  );
}

export default page;
