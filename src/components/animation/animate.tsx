"use client";
import { fadeIn } from "@/components/animation/varient";
import { motion } from "framer-motion";

interface AnimateProps {
  children: React.ReactNode;
  direction: string;
  delay: number;
}

const Animate: React.FC<AnimateProps> = ({ children, direction, delay }) => {
  return (
    <motion.div
      variants={fadeIn(direction, delay)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.7 }}
    >
      {children}
    </motion.div>
  );
};

export default Animate;
