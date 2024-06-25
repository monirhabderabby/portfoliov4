import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { project } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  const projects = await db.project.findMany();
  return (
    <div>
      <div className="border-b bg-card">
        <div className=" flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="text-3xl font-bold">Hello, Monir! 🤚</p>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/projects/create">
              <Button variant="codeWithAntonio" className=" ">
                Add New Project
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* render projects */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
        {projects?.map((project: project) => (
          <Card
            key={project.id}
            className="hover:ring-2 ring-accent/10 ring-offset-accent cursor-pointer"
          >
            <div className="w-full h-[195px] relative">
              <Image
                src={project.thumbnail_url}
                alt="thumbnail"
                fill
                className="aspect-video rounded-t-lg"
              />
            </div>
            <CardContent className="py-4">
              <div className="w-full flex justify-between items-center">
                <CardTitle className="text-sm md:text-base font-medium group-hover:text-sky-700 transition line-clamp-1">
                  {project.project_name}
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">
                  {project.project_type}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Page;
