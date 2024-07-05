"use client";

// Packages
import { motion } from "framer-motion";
import Link from "next/link";

const Header = () => {
  return (
    <motion.section
      className=" bg-transparent  flex items-center  h-[80px]"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          delay: 0.7,
          duration: 0.7,
        },
      }}
      exit={{
        opacity: 0,
      }}
    >
      <div className="container mx-auto ">
        <div className="flex justify-between items-center">
          <Link href="/" className="z-50">
            <div className="flex flex-col items-start group">
              <p className="gradient_Logo group-hover:text-white/70 duration-300 transition-all ease-linear text-[45px]">
                Monir
              </p>
            </div>
          </Link>
          <Link href="/contact" className="btn btn-sm flex items-center">
            Contact
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default Header;
