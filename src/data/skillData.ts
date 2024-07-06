import css from "../../public/skills/css.svg";
import figma from "../../public/skills/figma.svg";
import firebase from "../../public/skills/firebase.svg";
import git from "../../public/skills/git.svg";
import html from "../../public/skills/html.svg";
import javascript from "../../public/skills/javascript.svg";
import materialui from "../../public/skills/materialui.svg";
import mongodb from "../../public/skills/mongoDB.svg";
import mysql from "../../public/skills/mysql.svg";
import nextjs from "../../public/skills/nextJS.svg";
import nodejs from "../../public/skills/nodejs.svg";
import photoshop from "../../public/skills/photoshop.svg";
import prisma from "../../public/skills/prisma.svg";
import react from "../../public/skills/react.svg";
import tailwind from "../../public/skills/tailwind.svg";
import typescript from "../../public/skills/typescript.svg";
import vitejs from "../../public/skills/vitejs.svg";

interface skillDataType {
  id: Number;
  name: string;
  image: string;
}

export const skillsData: skillDataType[] = [
  {
    id: Math.floor(Math.random() * 9999),
    name: "HTML",
    image: html,
  },
  {
    id: Math.floor(Math.random() * 9999),
    name: "CSS",
    image: css,
  },
  {
    id: Math.floor(Math.random() * 9999),
    name: "JavaScript",
    image: javascript,
  },
  {
    id: Math.floor(Math.random() * 9999),
    name: "Typescript",
    image: typescript,
  },
  {
    id: Math.floor(Math.random() * 9999),
    name: "React",
    image: react,
  },
  {
    id: Math.floor(Math.random() * 9999),
    name: "Next JS",
    image: nextjs,
  },
  {
    id: Math.floor(Math.random() * 9999),
    name: "Tailwind",
    image: tailwind,
  },
  {
    id: Math.floor(Math.random() * 9999),
    name: "MaterialUI",
    image: materialui,
  },
  {
    id: Math.floor(Math.random() * 9999),
    name: "Git",
    image: git,
  },
  {
    id: Math.floor(Math.random() * 9999),
    name: "Mongo DB",
    image: mongodb,
  },
  {
    id: Math.floor(Math.random() * 9999),
    name: "MySQL",
    image: mysql,
  },
  {
    id: Math.floor(Math.random() * 9999),
    name: "Figma",
    image: figma,
  },
  {
    id: Math.floor(Math.random() * 9999),
    name: "Firebase",
    image: firebase,
  },
  {
    id: Math.floor(Math.random() * 9999),
    name: "PhotoShop",
    image: photoshop,
  },
  {
    id: Math.floor(Math.random() * 9999),
    name: "Node JS",
    image: nodejs,
  },
  {
    id: Math.floor(Math.random() * 9999),
    name: "Prisma",
    image: prisma,
  },
  {
    id: Math.floor(Math.random() * 9999),
    name: "Vite JS",
    image: vitejs,
  },
];
