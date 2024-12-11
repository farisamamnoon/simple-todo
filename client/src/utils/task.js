import { z } from "zod";

export const newTaskSchema = z.object({
  title: z.string().min(1, "Task title is required."),
  description: z.string().optional(),
  dueDate: z
    .string()
    .min(1, "Date is required.")
    .transform((date) => new Date(date))
    .refine((date) => date > new Date(), "Date must not be in the past"),
  subtasks: z
    .object({
      title: z.string().min(1, {}),
      done: z.boolean(),
    })
    .array()
    .optional(),
});
