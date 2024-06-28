"use client";
// packages
import { Tooltip } from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";

// components
import Animate from "@/components/animation/animate";
import { default as certificateDatafull } from "@/data/certificateData";

const certificatesData = certificateDatafull;

const Certificates = () => {
  const [currentCertificate, setCurrentCertificate] = useState(3);
  const [next, setNext] = useState(6);

  const isLoadMoreActive = () => {
    return certificatesData.length > currentCertificate;
  };

  const onLoadMore = () => {
    setCurrentCertificate((prev) => prev + 3);
    setNext((prev) => prev + 3);
  };
  return (
    <section className="container mx-auto">
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

      <section className="h-[100px] w-full relative">
        <div className="bg-transparent overflow-hidden w-full h-full relative blur-[8px] mt-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {certificatesData
            ?.slice(currentCertificate, next)
            ?.map(({ certificate, id }) => {
              return (
                <div className="certificate opacity-10" key={id}>
                  <Image
                    width={0}
                    height={0}
                    style={{
                      width: "90%",
                      height: "90%",
                    }}
                    src={certificate}
                    alt="certificate"
                    className="hover:scale-110 duration-300 blur-[1px] hover:blur-0 rounded-md"
                    loading="lazy"
                  />
                </div>
              );
            })}
        </div>
      </section>
    </section>
  );
};

export default Certificates;
