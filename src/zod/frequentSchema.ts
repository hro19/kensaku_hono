import { z } from "zod";

export const frequentSchema = z.object({
    name: z.string(),
    word: z.string().min(2),
});