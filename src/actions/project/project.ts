"use server";

import { db } from "@/lib/db";
import {
  CreateProjectSchema,
  CreateProjectSchemaType,
} from "@/schema/project.schema";

// const data = {
//   project_type: "Full Stack Website",
//   project_name: "Budget Tracker",
//   live_link: "https://www.saidurrahman.org",
//   github_link: "https://github.com/monirhabderabby/saidurrahman",
//   thumbnail_url:
//     "https://res.cloudinary.com/dzlrpspps/image/upload/v1717507352/Projects/budget%20tracker/Copy_of_Desktop_o0oicr.webp",
//   description:
//     '<p>I contributed as a Full Stack Developer to the Saidur Consulting Project, I developed an immersive and user-friendly experience that caters to the diverse needs of our clients. </p><p>Saidur Consulting, an accountability consulting website, leverages cutting-edge technology to establish seamless connections between clients and experts. </p><p><br></p><h3><strong>Features: -</strong></h3><ul><li><span style="color: var(--tw-prose-bold);">Easy Booking: </span></li></ul><p>\t\t\t\tImplemented a hassle-free Calendly integration for quick consultation bookings.</p><ul><li><span style="color: var(--tw-prose-bold);">Training Hub:</span></li></ul><p>\t\t\t\tDeveloped a user-friendly platform with free training materials for skill enhancement.</p><ul><li><span style="color: var(--tw-prose-bold);">Knowledge Exchange:</span></li></ul><p>\t\t\t\tCreated a digital hub for easy access to Saidur\'s extensive library of resources.</p><ul><li>Inspiring Testimonials:</li></ul><p>\t\t\t\tFeatured video testimonials for reassurance and inspiration from satisfied clients.</p><ul><li>Mission Focus:</li></ul><p>\t\t\t\tInvited users to join a transformative journey, emphasizing productivity and excellence in consultancy.</p><p><br></p><p>During development, I faced hurdles integrating the Calendly booking feature. This complex task required in-depth technical understanding and problem-solving. Overcoming these challenges demonstrated our commitment to a seamless user experience and strengthened my development skills.</p>',
//   images: [
//     "https://res.cloudinary.com/dzlrpspps/image/upload/v1697596054/Portfolio%20Website/Projects/saidur%20consulting/Saidur_Consulting_rbq69j_max8ba.jpg",
//     "https://res.cloudinary.com/dzlrpspps/image/upload/v1699065176/Portfolio%20Website/Projects/saidur%20consulting/reviews_jcfav4.png",
//     "https://res.cloudinary.com/dzlrpspps/image/upload/v1699065296/Portfolio%20Website/Projects/saidur%20consulting/access_n4edez.png",
//     "https://res.cloudinary.com/dzlrpspps/image/upload/v1699065352/Portfolio%20Website/Projects/saidur%20consulting/screencapture-saidurrahman-vercel-app-free-training-content-2023-11-04-08_35_34_biy11x.png",
//   ],
//   techs: ["Next JS", "Tailwind", "React", "JavaScript", "Mongo DB", "CSS"],
//   visited: 0,
//   position: 6,
// };

export const createProject = async (data: CreateProjectSchemaType) => {
  const parsedBody = CreateProjectSchema.safeParse(data);

  if (!parsedBody.success) {
    return {
      error: parsedBody.error.message,
    };
  }

  const parsedData = parsedBody.data;

  const totalProject = await db.project.count();

  console.log(totalProject);

  try {
    await db.project.create({
      data: {
        project_type: parsedData.project_type,
        project_name: parsedData.project_name,
        description: parsedData.description,
        thumbnail_url: parsedData.thumbnail_url,
        images: parsedData.images,
        github_link: parsedData.github_link,
        live_link: parsedData.live_link,
        position: totalProject + 1,
      },
    });
    return {
      success: "Project published successfully 🎉",
    };
  } catch (error) {
    console.log("PROJECT_CREATE_ERROR", error);
    return {
      error: {
        message: error,
        name: "PROJECT_CREATE_ERROR",
      },
    };
  }
};
