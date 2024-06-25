import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleauth = () => {
  // const { userId } = auth();
  // if (!userId) throw new Error("unauthorized");
  return {
    userId: "1234",
  };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  thumbnail: f({ "image/webp": { maxFileSize: "1MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(() => handleauth())
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      //   console.log("Upload complete for userId:", metadata.userId);

      //   console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { urls: file.url };
    }),
  banner: f({ "image/webp": { maxFileSize: "2MB", maxFileCount: 12 } })
    .middleware(() => handleauth())
    .onUploadComplete(async ({ metadata, file }) => {
      return {
        urls: file.url,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
