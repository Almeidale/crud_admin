import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  admin: z.optional(z.boolean()),
  active: z.boolean(),
});

const postUserSchema = userSchema.omit({ id: true, active: true });

const requestUserSchema = userSchema.omit({ id: true });

const responseUserSchema = userSchema.omit({ password: true });

const recoverUserSchema = userSchema.pick({ active: true });

const updateUserSchema = requestUserSchema
  .omit({ id: true, active: true, admin: true })
  .partial();

export {
  userSchema,
  postUserSchema,
  requestUserSchema,
  responseUserSchema,
  updateUserSchema,
  recoverUserSchema,
};
