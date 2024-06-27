"use server";

import { db } from "@/lib/db";
import {
  CreateProjectSchema,
  CreateProjectSchemaType,
  UpdateProjectSchema,
  UpdateProjectSchemaType,
} from "@/schema/project.schema";
import { auth } from "@clerk/nextjs/server";

export const createProject = async (data: CreateProjectSchemaType) => {
  const parsedBody = CreateProjectSchema.safeParse(data);

  if (!parsedBody.success) {
    return {
      error: parsedBody.error.message,
    };
  }

  const parsedData = parsedBody.data;

  const totalProject = await db.project.count();

  try {
    await db.project.create({
      data: {
        project_type: parsedData.project_type,
        project_name: parsedData.project_name,
        description: parsedData.description,
        thumbnail_url: parsedData.thumbnail_url,
        images: parsedData.images,
        github_link: parsedData.github_link,
        live_link: parsedData.live_link,
        position: totalProject + 1,
      },
    });
    return {
      success: "Project published successfully 🎉",
    };
  } catch (error) {
    console.log("PROJECT_CREATE_ERROR", error);
    return {
      error: {
        message: error,
        name: "PROJECT_CREATE_ERROR",
      },
    };
  }
};
export const updateProject = async (data: UpdateProjectSchemaType) => {
  const parsedBody = UpdateProjectSchema.safeParse(data);

  if (!parsedBody.success) {
    return {
      error: parsedBody.error.message,
    };
  }

  const { id, ...rest } = parsedBody.data;

  try {
    await db.project.update({
      where: {
        id: id,
      },
      data: {
        ...rest,
      },
    });
    return {
      success: "Project updated successfully 🎉",
    };
  } catch (error) {
    console.log("PROJECT_UPDATE_ERROR", error);
    return {
      error: {
        message: error,
        name: "PROJECT_UPDATE_ERROR",
      },
    };
  }
};

export const deleteProjectAction = async (id: string) => {
  const { userId } = auth();

  if (userId !== process.env.ADMIN_ID) {
    return {
      error: "You are not authorized to delete this project",
    };
  }

  try {
    await db.project.delete({
      where: {
        id: id,
      },
    });
    return {
      success: "Project deleted successfully 🎉",
    };
  } catch (error: any) {
    console.log("PROJECT_DELETE_ERROR");
    return {
      error: error.message,
    };
  }
};
