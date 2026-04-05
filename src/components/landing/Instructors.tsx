"use client";

import React from "react";
import Image from "next/image";

interface Instructor {
  name: string;
  role: string;
  desc: string;
  img: string;
  students: string;
  courses: number;
}

/** * SECTION 6: INSTRUCTORS SECTION
 */
const Instructors: React.FC = () => {
  const team: Instructor[] = [
    {
      name: "John Smith",
      role: "Web Developer",
      desc: "15+ years experience at Google & Meta",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      students: "45k",
      courses: 28,
    },
    {
      name: "Sarah Johnson",
      role: "UX Designer",
      desc: "Lead Designer at Apple & Airbnb",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      students: "38k",
      courses: 22,
    },
    {
      name: "Mike Chen",
      role: "Data Scientist",
      desc: "ML Engineer at Amazon & Tesla",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
      students: "52k",
      courses: 35,
    },
    {
      name: "Emma Davis",
      role: "Marketing Expert",
      desc: "CMO at Spotify & Netflix",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      students: "41k",
      courses: 19,
    },
  ];

  return (
    <section id="instructors" className="py-24 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-md font-semibold uppercase mb-4">
            EXPERT INSTRUCTORS
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Learn From The Best
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            Our instructors are industry professionals with years of experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((person, i) => (
            <div
              key={i}
              className="flex flex-col bg-white rounded-2xl border border-slate-100 p-6 shadow-xs hover:shadow-lg cursor-pointer"
            >
              <div className="mx-auto mb-6 h-24 w-24">
                <Image
                  src={person.img}
                  alt={person.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover rounded-full border-4 border-[#D8E6FD]"
                />
              </div>
              <div className="text-center">
                <h4 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {person.name}
                </h4>
                <p className="text-md font-semibold text-blue-600 mb-2">
                  {person.role}
                </p>
                <p className="font-medium text-sm text-slate-500">
                  {person.desc}
                </p>
                <div className="flex items-center justify-center align-middle gap-4 pt-4">
                  <div className="flex gap-2 items-center">
                    <span className="text-[#3B82F6]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.54 5.54 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13zM0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20zm24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9z"
                        />
                      </svg>
                    </span>
                    <p className="text-md text-slate-900">{person.students}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-[#3B82F6]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M96 0C43 0 0 43 0 96v320c0 53 43 96 96 96h320c17.7 0 32-14.3 32-32s-14.3-32-32-32v-64c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32zm0 384h256v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32m32-240c0-8.8 7.2-16 16-16h192c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16m16 48h192c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16"
                        />
                      </svg>
                    </span>
                    <p className="text-md text-slate-900">{person.courses}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;