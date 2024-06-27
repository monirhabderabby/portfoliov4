"use client";

import { deleteProjectAction, updateProject } from "@/actions/project/project";
import ConfirmModal from "@/components/modal/confirm-modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FileUpload from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  UpdateProjectSchema,
  UpdateProjectSchemaType,
} from "@/schema/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { project } from "@prisma/client";
import { MoveLeft, Trash } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import TechnologySelector from "./technology-selector";

interface Props {
  initialData: project;
}

const ProjectEditForm = ({ initialData }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isThumbnailEditing, setThumbnailEditing] = useState(false);

  const router = useRouter();
  const form = useForm<UpdateProjectSchemaType>({
    resolver: zodResolver(UpdateProjectSchema),
    defaultValues: {
      id: initialData.id,
      project_type: initialData.project_type as string,
      project_name: initialData.project_name || "",
      thumbnail_url: initialData.thumbnail_url || "",
      description: initialData.description || "",
      github_link: initialData.github_link,
      live_link: initialData.live_link,
      techs: initialData.techs,
      images: initialData.images,
    },
  });

  const initialTechsSelected = initialData.techs.map((tech) => ({
    value: tech,
    label: tech,
  }));

  const { toast } = useToast();

  const { watch } = form;

  const Editor = useMemo(
    () => dynamic(() => import("@/components/ui/Editor")),
    []
  );

  function onSubmit(values: UpdateProjectSchemaType) {
    startTransition(() => {
      console.log(values);
      updateProject(values).then((res: any) => {
        if (res?.error) {
          toast({
            variant: "destructive",
            description: <p>{res.error.message}</p>,
          });
        } else if (res?.success) {
          toast({
            description: res.success,
            variant: "default",
          });
          form.reset();
          router.replace(`/projects/${initialData.id}`);
        }
      });
    });
  }

  function deleteProject() {
    startTransition(() => {
      deleteProjectAction(initialData.id as string).then((res: any) => {
        if (res?.error) {
          toast({
            variant: "destructive",
            description: <p>{res.error.message}</p>,
          });
          return;
        } else if (res?.success) {
          toast({
            description: res.success,
            variant: "default",
          });
          router.replace("/dashboard/projects");
        }
      });
    });
  }
  return (
    <Card>
      <CardHeader>
        <section className="w-full flex justify-between items-center">
          <div className="space-y-2">
            <CardTitle>Project</CardTitle>
            <CardDescription>
              Great job, Edit project to showcase your skill ✏️
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="link"
              className="flex gap-x-2 group "
              onClick={() => {
                router.replace("/dashboard/projects");
              }}
            >
              <MoveLeft className="h-4 w-4" /> Back Now
            </Button>
            <ConfirmModal onConfirm={deleteProject}>
              <Button size="sm" variant="destructive" disabled={isPending}>
                <Trash className="h-4 w-4" />
              </Button>
            </ConfirmModal>
          </div>
        </section>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 lg:gap-x-12">
              <FormField
                control={form.control}
                name="project_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Full Stack Website">
                            Full Stack Website
                          </SelectItem>
                          <SelectItem value="Front End Website">
                            Front End Website
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="project_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <FormField
                control={form.control}
                name="live_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Paste project link here.."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="github_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Github link</FormLabel>
                    <FormControl>
                      <Input placeholder="Github link here.." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="techs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <FormControl>
                    <TechnologySelector
                      onValuesSelect={(techs) => {
                        field.onChange(techs);
                      }}
                      initialSelected={initialTechsSelected}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 items-center gap-y-4 gap-x-8">
              <FormField
                control={form.control}
                name="thumbnail_url"
                render={({ field }) => (
                  <FormItem>
                    <div className="w-full pb-2 flex justify-between items-center">
                      <FormLabel>Thumbnail Image</FormLabel>
                      {watch("thumbnail_url") && (
                        <Button
                          type="button"
                          onClick={() => {
                            setThumbnailEditing(true);
                          }}
                          variant="link"
                          size="sm"
                        >
                          Remove Image
                        </Button>
                      )}
                    </div>
                    <FormControl>
                      {isThumbnailEditing ? (
                        <FileUpload
                          endpoint="thumbnail"
                          onChange={(data) => {
                            field.onChange(data[0].url);
                            setThumbnailEditing(false);
                          }}
                        />
                      ) : (
                        <div className="h-[286px] aspect-video border-dotted border-[2px] rounded-md p-2 w-full ">
                          <div className="relative h-full w-full">
                            <Image
                              src={watch("thumbnail_url")}
                              alt="thumbnail"
                              fill
                              className="rounded-md"
                            />
                          </div>
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <div className="w-full pb-2 flex justify-between items-center">
                      <FormLabel>Images</FormLabel>
                      {watch("images").length > 1 && (
                        <Button
                          onClick={() => {
                            form.resetField("images");
                          }}
                          variant="link"
                          size="sm"
                        >
                          Remove Image
                        </Button>
                      )}
                    </div>
                    <FormControl>
                      {watch("images").length > 1 ? (
                        <div className="h-[286px] aspect-video border-dotted border-[2px] rounded-md p-2 py-4 w-full ">
                          <div className="relative h-full w-full grid grid-cols-3 gap-5 overflow-hidden">
                            {watch("images").map((url) => (
                              <Image
                                key={url}
                                src={url}
                                alt="bannerImage"
                                width={250}
                                height={220}
                                className="aspect-video hover:scale-110 duration-300 overflow-hidden border-[1px] border-slate-400/20 rounded-md"
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <FileUpload
                          endpoint="banner"
                          onChange={(data) => {
                            const urls = data.map((item) => {
                              return item.url;
                            });

                            field.onChange(urls);
                          }}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl className="h-[246px] aspect-video">
                    <Editor
                      value={field.value}
                      onChange={(content: string) => field.onChange(content)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          disabled={isPending}
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
        >
          Update Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectEditForm;
