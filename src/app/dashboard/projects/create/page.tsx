import dynamic from "next/dynamic";
const ProjectCreateForm = dynamic(
  () => import("../_components/project-create-form"),
  {
    ssr: false,
  }
);

const Page = () => {
  return (
    <div className="py-12">
      <ProjectCreateForm />
    </div>
  );
};

export default Page;
