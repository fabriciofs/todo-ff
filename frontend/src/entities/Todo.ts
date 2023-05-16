import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.string().optional(),
  description: z.string(),
  dueDate: z.string(),
  isDone: z.boolean().optional(),
});

export const TodosSchema = z.array(TodoSchema);

export type Todo = z.infer<typeof TodoSchema>;

// export type Todo = {
//   id?: string;
//   description: string;
//   dueDate: string;
//   isDone?: boolean;
// }


