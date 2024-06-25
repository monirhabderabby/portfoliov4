"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { project } from "@prisma/client";
import axios from "axios";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProjectReOrderItems from "./project-reorder-items";

interface Props {
  projects: project[] | [];
}

const ProjectReOrderList = ({ projects }: Props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const onReorder = async (updateData: { id: string; position: number }[]) => {
    // TODO: reorder projects in db
    try {
      setIsUpdating(true);

      await axios.put(`/api/projects/reorder`, {
        list: updateData,
      });
      toast({
        title: "Project reordered 🎉",
        description: "Your projects have been reordered.",
      });
      router.refresh();
    } catch {
      toast({
        title: "Something went wrong.",
        description: "Your projects have not been reordered. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 relative">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Projects Reorder
        <Button variant="link" className="w-fit">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add new Project
        </Button>
      </div>

      <div
        className={cn(
          "text-sm mt-2",
          !projects.length && "text-slate-500 italic"
        )}
      >
        {!projects.length && "No Projects"}
        <ProjectReOrderItems onReorder={onReorder} items={projects || []} />
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        Drag and drop to reorder the chapters
      </p>
    </div>
  );
};

export default ProjectReOrderList;
