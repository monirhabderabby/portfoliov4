import { db } from "@/lib/db";
import dynamic from "next/dynamic";
const AllProjects = dynamic(() => import("./_components/all-project"), {
  ssr: false,
});
const PageTransition = dynamic(
  () => import("@/components/animation/page-transition"),
  { ssr: false }
);

const Projects = async () => {
  const data = await db.project.findMany({
    orderBy: {
      position: "asc",
    },
  });

  return (
    <PageTransition>
      {data?.length > 0 ? (
        <AllProjects projects={data} />
      ) : (
        <div className="h-[calc(100vh-120px)] w-full flex justify-center items-center text-[40px] text-white/60 animate-pulse">
          No Project found!
        </div>
      )}
    </PageTransition>
  );
};

export default Projects;
