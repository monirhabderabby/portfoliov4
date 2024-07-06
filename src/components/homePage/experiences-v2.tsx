"use client";
import { experiencesList } from "@/data/data";
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const ExperiencesV2 = () => {
  return (
    <div id="education" className="space-y-6">
      <div className="flex justify-center flex-col items-center">
        <h2 className="h2 leading-tight font-aldrich text-accent text-center">
          Experiences
        </h2>
        <p className="max-w-sm mb-0 text-[14px] text-center w-full text-white/90">
          Crafting Seamless Digital Experiences Through Expertise in Frontend
          and Backend Technologies
        </p>
      </div>

      <VerticalTimeline lineColor="#B809C3">
        {experiencesList.map(
          ({
            company_name,
            icon: Icon,
            id,
            location,
            responsibility,
            date,
          }) => (
            <React.Fragment key={id}>
              <VerticalTimelineElement
                visible={true}
                className="vertical-timeline-element--work "
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "#fff",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  textAlign: "left",
                  padding: "1.3rem 2rem",
                }}
                contentArrowStyle={{ borderRight: "7px solid  #B809C3" }}
                date={date}
                iconStyle={{ background: "#B809C3", color: "#fff" }}
                icon={<Icon />}
              >
                <h3 className="vertical-timeline-element-title font-semibold capitalize text-accent">
                  {company_name}
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {location}
                </h4>
                <p className="text-white/80 font-light font-rajdhani">
                  {responsibility}
                </p>
              </VerticalTimelineElement>
            </React.Fragment>
          )
        )}
      </VerticalTimeline>
    </div>
  );
};

export default ExperiencesV2;
