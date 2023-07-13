import * as z from "zod"

export const UserSchema = z.object({
  id: z.number().optional(),
  username: z.string(),
  email: z.string().email(),
  provider: z.string(),
  confirmed: z.boolean(),
  blocked: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const PostSchema = z.object({
  id: z.number().optional(),
  title: z.string().nonempty("Title is required"),
  body: z.string().nonempty("Body is required"),
  user: UserSchema.optional(),
})

export const CreatePostSchema = z.object({
  title: z.string().nonempty("Title is required"),
  body: z.string().nonempty("Body is required"),
  user: z.string().nonempty("User is required"),
})
