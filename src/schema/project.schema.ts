import * as z from "zod";

export const CreateProjectSchema = z.object({
  project_type: z.enum(["Full Stack Website", "Front End Website"]),
  project_name: z.string().min(4, {
    message: "Project name must be 4 characters",
  }),
  github_link: z.string().min(14),
  live_link: z.string().min(10),
  thumbnail_url: z.string().min(21),
  description: z.string().min(200),
  images: z.array(z.string()),
  techs: z.array(z.string()),
});

export type CreateProjectSchemaType = z.infer<typeof CreateProjectSchema>;

export const UpdateProjectSchema = z.object({
  id: z.string(),
  project_type: z.string(),
  project_name: z.string().min(4, {
    message: "Project name must be 4 characters",
  }),
  github_link: z.string().min(14),
  live_link: z.string().min(10),
  thumbnail_url: z.string().min(21),
  description: z.string().min(200),
  images: z.array(z.string()),
  techs: z.array(z.string()),
});

export type UpdateProjectSchemaType = z.infer<typeof UpdateProjectSchema>;
