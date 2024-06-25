// Packages
import About from "@/components/homePage/About";
import Education from "@/components/homePage/Education";
import Experiences from "@/components/homePage/Experiences.";
import MyProjects from "@/components/homePage/MyProjects";
import Skill from "@/components/homePage/Skills";
import ContactBody from "@/components/homePage/contact-body";

import { db } from "@/lib/db";
import dynamic from "next/dynamic";

// Components
const PageTransition = dynamic(
  () => import("@/components/animation/page-transition"),
  {
    ssr: false,
  }
);
const Header = dynamic(() => import("@/components/homePage/Header"), {
  ssr: false,
});
const Banner = dynamic(() => import("@/components/homePage/Banner"), {
  ssr: false,
});
const Certificates = dynamic(
  () => import("@/components/homePage/certificates"),
  { ssr: false }
);

export default async function Home() {
  const projects = await db.project.findMany({
    orderBy: {
      position: "asc",
    },
  });
  return (
    <section className="widthContainer">
      <PageTransition>
        <Header />
        <Banner />
        <About projects={projects} />
        <Skill />
        <MyProjects projects={projects} />
        <Education />
        <Certificates />
        <Experiences />
        <ContactBody />
      </PageTransition>
    </section>
  );
}
