"use client";

import { createProject } from "@/actions/project/project";
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
  CreateProjectSchema,
  CreateProjectSchemaType,
} from "@/schema/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import TechnologySelector from "./technology-selector";

const ProjectCreateForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<CreateProjectSchemaType>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      project_type: "Full Stack Website",
      project_name: "",
      thumbnail_url: "",
      description: "",
      github_link: "",
      live_link: "",
      techs: [],
      images: [],
    },
  });

  const { toast } = useToast();

  const { watch } = form;

  const Editor = useMemo(
    () => dynamic(() => import("@/components/ui/Editor")),
    []
  );

  function onSubmit(values: CreateProjectSchemaType) {
    console.log(values);
    startTransition(() => {
      createProject(values).then((res: any) => {
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
        }
      });
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project</CardTitle>
        <CardDescription>
          Great job, Add new project to showcase your skill 🤚
        </CardDescription>
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
                        form.setValue("techs", techs);
                      }}
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
                          onClick={() => {
                            form.resetField("thumbnail_url");
                          }}
                          variant="link"
                          size="sm"
                        >
                          Remove Image
                        </Button>
                      )}
                    </div>
                    <FormControl>
                      {watch("thumbnail_url") ? (
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
                      ) : (
                        <FileUpload
                          endpoint="thumbnail"
                          onChange={(data) => field.onChange(data[0].url)}
                        />
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
          Publish Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCreateForm;
