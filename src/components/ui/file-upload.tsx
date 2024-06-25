"use client";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import { ClientUploadedFileData } from "uploadthing/types";
import { useToast } from "./use-toast";

type file =
  | ClientUploadedFileData<{ urls: string }>[]
  | ClientUploadedFileData<unknown>[];

interface Props {
  onChange: (data: file) => void;
  endpoint: keyof typeof ourFileRouter;
}

const FileUpload = ({ endpoint, onChange }: Props) => {
  const { toast } = useToast();
  return (
    <UploadDropzone
      appearance={{
        button: "bg-black hover:bg-black/70",
        label: "text-black hover:text-black/70",
      }}
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res);
      }}
      onUploadError={(error) => {
        toast({
          title: error.name,
          description: error.message,
          variant: "destructive",
        });
      }}
    />
  );
};

export default FileUpload;
