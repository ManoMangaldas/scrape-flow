"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { create } from "domain";

export async function GetWorkflowsForUser() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  return prisma.workflow.findMany({
    where: {
      userId,
    },
    orderBy: { createdAt: "asc" },
  });
}
