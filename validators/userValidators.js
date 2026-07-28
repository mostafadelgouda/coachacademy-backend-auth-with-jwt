import { z } from "zod";
export const createUser = z.object({
  name: z.string().min(2).max(50),
  phone: z.e164(),
  email: z.string().email(),
  password: z.string().min(6).max(50),
  age: z.number().int().min(0).optional(),
  dateOfBirth: z.string().optional(),
});
export const updateUser = z.object({
  name: z.string().min(2).max(50).optional(),
  phone: z.e164().optional(),
  email: z.string().email().optional(),
  age: z.number().int().min(0).optional(),
  dateOfBirth: z.string().optional(),
});
