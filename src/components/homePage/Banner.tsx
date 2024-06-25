"use client";

//icons
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

//third party packages
import { motion } from "framer-motion";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

// componets
import { fadeIn } from "@/components/animation/varient";
import { Tooltip } from "@material-tailwind/react";
import ResumeDownloadButton from "../buttons/ResumeDownloadButton";

const Banner = () => {
  return (
    <section className="min-h-[85vh] lg:min-h-[78vh] flex items-center relative">
      <Image
        src="/images/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[130px]"
        priority
      />
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-y-8 md:gap-x-12">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left font-rajdhani">
            <motion.h1
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="text-[65px] mb-2 lg:text-[110px] font-bold leading-[0.8] text-white"
            >
              Monir <span>Hossain</span>
            </motion.h1>
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="mb-6 text-[26px] lg:text-[50px] font-rajdhani font-semibold uppercase leading-[1]"
            >
              <span className="mr-4 text-white">I am a</span>
              <TypeAnimation
                sequence={["Developer", 3000]}
                speed={50}
                className="text-accent"
                wrapper="span"
                repeat={Infinity}
              />
            </motion.div>
            <motion.p
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="mb-8 max-w-lg mx-auto lg:mx-0 text-white"
            >
              Turning visions into interactive realities with code
            </motion.p>
            <motion.div
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="flex max-w-max gap-x-6 items-center mb-12 mx-auto lg:mx-0"
            >
              <a
                href="https://wa.me/+8801956306002"
                target="_whatsappr"
                className="btn btn-sm lg:btn-lg flex items-center cursor-pointer"
              >
                Hire Me
              </a>
              {/*  resume download button */}

              <ResumeDownloadButton />
            </motion.div>
            {/* social */}
            <motion.div
              variants={fadeIn("up", 0.7)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="flex gap-x-6 max-w-max mx-auto lg:mx-0"
            >
              <a
                href="https://www.facebook.com/monirhabderabby"
                target="_facebook"
                className="hover:scale-110 transition-all duration-500"
              >
                <FaFacebook className="text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/monirhabderabby"
                target="_linkedIn"
                className="hover:scale-110 transition-all duration-500"
              >
                <FaLinkedin className="text-white" />
              </a>
              <a
                href="https://github.com/monirhabderabby"
                target="_github"
                className="hover:scale-110 transition-all duration-500"
              >
                <FaGithub className="text-white" />
              </a>
            </motion.div>
          </div>
          {/* image */}
          <motion.div
            variants={fadeIn("down", 0.5)}
            initial="hidden"
            whileInView={"show"}
            className="hidden lg:flex flex-1  "
          >
            <Tooltip
              content="Assalamu Alaikum"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              placement="top"
            >
              <div className="h-[470px] w-[448px] border-[1px] border-white/20 relative overflow-hidden">
                <Image
                  src="/images/sharpProfile.webp"
                  fill
                  className="scale-[100%] duration-300 hover:scale-[115%]"
                  alt="monir"
                  priority
                />
              </div>
            </Tooltip>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
