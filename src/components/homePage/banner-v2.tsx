"use client";

import { socialData } from "@/data/data";
import { motion } from "framer-motion";
import Image from "next/image";
import profileImage from "../../../public/images/profile.jpg";
import ContactBtn from "../buttons/contact_button";
import ResumeDownloadButton from "../buttons/ResumeDownloadButton";

const BannerV2 = () => {
  const fadeInStragger = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.5 * index,
        duration: 0.5,
        type: "tween",
        stiffness: 125,
      },
    }),
  };
  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex justify-center items-center relative ">
      <Image
        src="/images/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[130px]"
        priority
      />
      <section className="flex flex-col items-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
            <Image
              src={profileImage}
              alt="Monir"
              width="192"
              height="192"
              quality="95"
              priority={true}
              className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
              placeholder="blur"
            />
            <motion.span
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 125,
                delay: 0.1,
                duration: 0.7,
              }}
              className="absolute bottom-0 right-0 text-4xl"
            >
              👋
            </motion.span>
          </motion.div>
        </div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: "tween",
            duration: 1.2,
            delay: 0.1,
            ease: [0.25, 0.25, 0.25, 0.75],
          }}
          className="mb-10 mt-4 px-4 text-2xl font-rajdhani font-medium !leading-[1.5] sm:text-4xl text-white  max-w-[50rem] text-center"
        >
          <span className="font-bold">Hello, I&apos;m Monir.</span> I&apos;m a{" "}
          <span className="font-bold">full-stack developer</span> with{" "}
          <span className="font-bold">2 years</span> of experience. I enjoy
          building <span className="italic">sites & apps</span>. My focus is{" "}
          <span className="underline">React (Next.js)</span>.
        </motion.h1>

        <div>
          <motion.div
            initial={{
              opacity: 0,
              y: 80,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              type: "tween",
              duration: 1.2,
              delay: 0.2,
              ease: [0.25, 0.25, 0.25, 0.75],
            }}
            className="flex items-center gap-x-4"
          >
            <ContactBtn text="Contact me here" />
            <ResumeDownloadButton />
          </motion.div>
          <div className="mt-10 flex justify-center">
            <div className="flex gap-x-6 max-w-max mx-auto lg:mx-0">
              {socialData.map(({ href, icon: Icon, id, target }, index) => (
                <motion.a
                  variants={fadeInStragger}
                  initial="initial"
                  animate="animate"
                  custom={index}
                  key={id}
                  href={href}
                  target={target}
                >
                  <Icon className="hover:text-white text-gray-500 text-xl hover:scale-110  transition-all duration-500" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BannerV2;
