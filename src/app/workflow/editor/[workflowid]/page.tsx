import { waitFor } from "@/lib/helper/wait";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";

type Props = {
  params: {
    workflowid: string;
  };
};

const page = async (props: Props) => {
  const { workflowid: workflowid } = props.params;
  const { userId } = auth();
  if (!userId) {
    return <div>Not authenticated</div>;
  }
  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowid,
      userId,
    },
  });
  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(workflow, null, 4)}</pre>
      {/* <Editor workflowid={workflow.id}></Editor> */}
    </div>
  );
};

export default page;
