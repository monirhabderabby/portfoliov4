"use client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { project } from "@prisma/client";
import { Grip, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  items: project[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
}

const ProjectReOrderItems = ({ items, onReorder }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [projects, setProjects] = useState(items);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    setProjects(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);
    setProjects(projects);

    const bulkUpdateData = updatedChapters.map((project) => ({
      id: project.id,
      position: items.findIndex((item) => item.id === project.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="projects">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {projects.map((project, index) => (
              <Draggable
                key={project.id}
                draggableId={project.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      project.visited > 100 &&
                        "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        project.visited > 100 &&
                          "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {project.project_name}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          project.visited > 50 && "bg-sky-700"
                        )}
                      >
                        {project.visited}
                      </Badge>
                      <Pencil
                        onClick={() => {
                          // do some stuff
                        }}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ProjectReOrderItems;
