"use server";

import prisma from "@/lib/prisma";
import { createWorkflowSchema, CreateWorkflowSchemaType } from "@/schema/workflows";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateWorkflow(form: CreateWorkflowSchemaType) {
  const { success, data, error } = createWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error("Invalid form data" + error.message);
  }

  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthenticated user");
  }

  const result = await prisma.workflow.create({
    data: {
      definition: "TODO",
      status: WorkflowStatus.DRAFT,
      userId: userId,
      ...data,
    },
  });

  if (!result) {
    throw new Error("Failed to create workflow");
  }

  redirect(`/workflow/editor/${result.id}`);
}
