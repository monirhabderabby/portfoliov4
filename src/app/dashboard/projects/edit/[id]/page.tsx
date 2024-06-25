import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ProjectEditForm from "../../_components/project-edit-form";

const Page = async ({ params }: { params: { id: string } }) => {
  const project = await db.project.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!project) {
    redirect("/dashboard/projects");
  }
  return (
    <div className="py-12">
      <ProjectEditForm initialData={project} />
    </div>
  );
};

export default Page;
