// Packages
import dynamic from "next/dynamic";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

// Components
const PageTransition = dynamic(
  () => import("@/components/animation/page-transition"),
  {
    ssr: false,
  }
);
const ImageSlider = dynamic(() => import("./_components/image-slider"), {
  ssr: false,
});
const ProjectBackButton = dynamic(
  () => import("./_components/project-back-button"),
  { ssr: false }
);

import { skillsData } from "@/data/skillData";
import { db } from "@/lib/db";

const ProjectDetailes = async ({ params }: { params: { id: string } }) => {
  const { id } = params || {};
  const data = await db.project.findUnique({
    where: {
      id: id,
    },
  });

  await db.project.update({
    where: {
      id: id,
    },
    data: {
      visited: {
        increment: 1,
      },
    },
  });

  const { description, live_link, techs, images, github_link } = data || {};

  return (
    <PageTransition>
      <div className="container mx-auto py-[50px]">
        <div className="w-full mx-auto h-[200px] md:h-[370px] lg:h-[500px]  ">
          <ImageSlider images={images} />
        </div>
        <div className="content w-full  md:w-[80%]  mx-auto mt-[50px] md:mt-[100px]">
          <div className="mt-[40px]">
            <h1 className="text-[28px] font-semibold text-white">
              Project Overview
            </h1>
          </div>
          <div className="flex flex-col gap-y-[30px] mt-[30px] text-white/80">
            <div
              // @ts-ignore
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
            <p className="text-white/90">
              Feel free to check out the Project by visiting the Project Link.
            </p>
          </div>
          {/* tec */}
          <div className="mt-[40px]">
            <h1 className="text-[28px] font-semibold text-white">
              Technologies Used:
            </h1>
            <div className="flex items-center gap-[20px] flex-wrap my-auto mt-[20px]">
              {techs?.map(async (name, index) => {
                let src;
                skillsData.find(({ image, name: imageName }) => {
                  if (name == imageName) {
                    src = image;
                  }
                });
                return (
                  <Image
                    src={src!}
                    key={index}
                    alt={name}
                    className="animate-pulse"
                    width={30}
                    height={20}
                    loading="lazy"
                  />
                );
              })}
            </div>
          </div>
          {/* Links */}
          <div className="mt-[40px]">
            <h1 className="text-[28px] font-semibold text-white">Links</h1>
            <div className="mt-[30px]">
              <div className="flex gap-x-[20px] items-center">
                <a
                  href={live_link}
                  target="_blank"
                  className="text-gradient border hover:opacity-75 duration-500 border-white/20 rounded-md px-5 md:px-8 h-[50px] md:h-[80px] flex justify-center items-center"
                >
                  Visit Now
                </a>
                <a
                  href={github_link}
                  target="_blank"
                  className="  border hover:opacity-75 duration-500 border-white/20 rounded-md px-5 md:px-8  h-[50px] md:h-[80px] flex flex-col items-center justify-center"
                >
                  <FaGithub className="w-4 md:w-6 h-4 md:h-6 text-white/75" />
                </a>
                <ProjectBackButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectDetailes;
