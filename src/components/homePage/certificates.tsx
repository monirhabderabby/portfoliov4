"use client";
// packages
import { Tooltip } from "@material-tailwind/react";
import Image from "next/image";

// components
import Animate from "@/components/animation/animate";
import { default as certificateDatafull } from "@/data/certificateData";

const certificatesData = certificateDatafull;

const Certificates = () => {
  return (
    <section className="container mx-auto my-12 lg:my-24 min-h-screen">
      <div className="flex justify-center flex-col items-center">
        <h2 className="h2 leading-tight font-aldrich text-accent text-center">
          Achievements
        </h2>
        <p className="max-w-sm mb-0 text-[14px] text-center w-full text-white/90">
          my certified expertise underscores a commitment to mastering the
          latest tools and frameworks
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] gap-y-[40px] lg:gap-y-[60px] mt-[50px]">
        {certificatesData?.map(({ id, certificate, name }) => {
          return (
            <Animate key={id} direction="up" delay={0.2}>
              <Tooltip
                content={name}
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
                placement="bottom"
              >
                <div className="certificate">
                  <Image
                    width={0}
                    height={0}
                    style={{
                      width: "80%",
                      height: "80%",
                    }}
                    src={certificate}
                    alt="certificate"
                    className="hover:scale-110 duration-300 blur-[.6px] hover:blur-0 rounded-md"
                    loading="lazy"
                  />
                </div>
              </Tooltip>
            </Animate>
          );
        })}
      </div>
    </section>
  );
};

export default Certificates;
