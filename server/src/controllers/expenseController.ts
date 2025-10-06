import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExpenseByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
        orderBy: {
            date: "desc",
        },
    });
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item: any) => ({
        ...item,
        amount: item.amount.toString(),
    }));
    res.json(expenseByCategorySummary);
  } catch (error) {
    console.error("Error fetching expense by category:", error);
    res.status(500).json({ error: "Error retrieving expense by category" });
  }
};
