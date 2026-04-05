"use client";

import React from "react";

interface FeaturePoint {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

/** * SECTION 4: WHY CHOOSE US SECTION
 */
const WhyChooseUs: React.FC = () => {
  const points: FeaturePoint[] = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M2 10.5A4.5 4.5 0 0 1 6.5 6h10a4.5 4.5 0 0 1 4.5 4.5v11a4.5 4.5 0 0 1-4.5 4.5h-10A4.5 4.5 0 0 1 2 21.5zm27.996-.746c0-1.814-2.036-2.882-3.529-1.852l-3.967 2.74v10.716l3.968 2.74c1.492 1.03 3.528-.038 3.528-1.852z"
          />
        </svg>
      ),
      title: "HD Video Lessons",
      desc: "Learn from crystal-clear HD video content with lifetime access to all course materials.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 640 640"
        >
          <path
            fill="currentColor"
            d="M271.2 56c-6.1-6.2-15-8.7-23.4-6.4s-14.9 8.8-17 17.2L215.5 127c-1.1 4.4-5.6 7-9.9 5.7l-59.8-16.8c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l16.9 59.8c1.2 4.3-1.4 8.8-5.7 9.9l-60.3 15.3c-8.4 2.1-15 8.7-17.3 17.1s.2 17.3 6.4 23.4l44.5 43.3c3.2 3.1 3.2 8.3 0 11.5l-44.4 43.3c-6.2 6.1-8.7 15-6.4 23.4s8.9 14.9 17.3 17.1l60.2 15.3c4.4 1.1 7 5.6 5.7 9.9l-16.9 59.7c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l59.8-16.9c4.3-1.2 8.8 1.4 9.9 5.7l15.3 60.2c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l43.3-44.5c3.1-3.2 8.3-3.2 11.5 0l43.2 44.5c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.3-60.1c1.1-4.4 5.6-7 9.9-5.7l59.8 16.9c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-16.9-59.8c-1.2-4.3 1.4-8.8 5.7-9.9l60.2-15.3c8.4-2.1 15-8.7 17.3-17.1s-.2-17.4-6.4-23.4l-44.5-43.3c-3.2-3.1-3.2-8.3 0-11.5l44.5-43.3c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-60.2-15.3c-4.4-1.1-7-5.6-5.7-9.9l16.9-59.8c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1L435 132.8c-4.3 1.2-8.8-1.4-9.9-5.7l-15.3-60.3c-2.1-8.4-8.7-15-17.1-17.3s-17.3.2-23.4 6.4L326 100.5c-3.1 3.2-8.3 3.2-11.5 0z"
          />
        </svg>
      ),
      title: "Verified Certificates",
      desc: "Earn industry-recognized certificates upon course completion to boost your career.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 36 36"
        >
          <path
            fill="currentColor"
            d="M12 16.14h-.87a8.67 8.67 0 0 0-6.43 2.52l-.24.28v8.28h4.08v-4.7l.55-.62l.25-.29a11 11 0 0 1 4.71-2.86A6.6 6.6 0 0 1 12 16.14"
            className="clr-i-solid clr-i-solid-path-1"
          />
          <path
            fill="currentColor"
            d="M31.34 18.63a8.67 8.67 0 0 0-6.43-2.52a11 11 0 0 0-1.09.06a6.6 6.6 0 0 1-2 2.45a10.9 10.9 0 0 1 5 3l.25.28l.54.62v4.71h3.94v-8.32Z"
            className="clr-i-solid clr-i-solid-path-2"
          />
          <path
            fill="currentColor"
            d="M11.1 14.19h.31a6.45 6.45 0 0 1 3.11-6.29a4.09 4.09 0 1 0-3.42 6.33Z"
            className="clr-i-solid clr-i-solid-path-3"
          />
          <path
            fill="currentColor"
            d="M24.43 13.44a7 7 0 0 1 0 .69a4 4 0 0 0 .58.05h.19A4.09 4.09 0 1 0 21.47 8a6.53 6.53 0 0 1 2.96 5.44"
            className="clr-i-solid clr-i-solid-path-4"
          />
          <circle
            cx="17.87"
            cy="13.45"
            r="4.47"
            fill="currentColor"
            className="clr-i-solid clr-i-solid-path-5"
          />
          <path
            fill="currentColor"
            d="M18.11 20.3A9.7 9.7 0 0 0 11 23l-.25.28v6.33a1.57 1.57 0 0 0 1.6 1.54h11.49a1.57 1.57 0 0 0 1.6-1.54V23.3l-.24-.3a9.58 9.58 0 0 0-7.09-2.7"
            className="clr-i-solid clr-i-solid-path-6"
          />
          <path fill="none" d="M0 0h36v36H0z" />
        </svg>
      ),
      title: "Expert Instructors",
      desc: "Learn directly from industry experts with years of real-world experience.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 16 16"
        >
          <rect
            width="9"
            height="15"
            x="3.5"
            y=".5"
            fill="none"
            stroke="currentColor"
            rx=".5"
            ry=".5"
            strokeWidth="1"
          />
          <path
            fill="currentColor"
            d="M3.5.5h9V2h-9zm0 12.5v2.5h9V13zm6 2h-3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h3c.3 0 .5.2.5.5s-.2.5-.5.5"
          />
        </svg>
      ),
      title: "Mobile Learning",
      desc: "Access courses on any device, anytime, anywhere with our mobile-friendly platform.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92c-13.4 30.2-35.5 54.2-35.8 54.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25c32.2 15.7 70.3 25 111.3 25c114.9 0 208-71.6 208-160m122 220c23.9-26 38-57.7 38-92c0-66.9-53.5-124.2-129.3-148.1c.9 6.6 1.3 13.3 1.3 20.1c0 105.9-107.7 192-240 192c-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25c21.8 12.7 52.1 25 88.7 25c3.2 0 6.1-1.9 7.3-4.8c1.3-2.9.7-6.3-1.5-8.7c-.3-.3-22.4-24.2-35.8-54.5"
          />
        </svg>
      ),
      title: "Community Support",
      desc: "Join a vibrant community of learners and get help whenever you need it.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M3 12a3.5 3.5 0 0 0 3.5 3.5c1.204 0 2.02-.434 2.7-1.113c.621-.623 1.121-1.44 1.655-2.387c-.534-.947-1.034-1.764-1.656-2.387C8.52 8.933 7.704 8.5 6.5 8.5A3.5 3.5 0 0 0 3 12m3.5 5.5a5.5 5.5 0 1 1 0-11c1.797 0 3.105.691 4.113 1.7c.536.534.987 1.162 1.387 1.802c.4-.64.851-1.268 1.387-1.803C14.395 7.191 15.703 6.5 17.5 6.5a5.5 5.5 0 1 1 0 11c-1.796 0-3.105-.691-4.113-1.7c-.536-.534-.987-1.162-1.387-1.802c-.4.64-.851 1.268-1.387 1.803C9.605 16.809 8.297 17.5 6.5 17.5m6.645-5.5c.534.947 1.034 1.764 1.656 2.387c.68.68 1.496 1.113 2.699 1.113a3.5 3.5 0 1 0 0-7c-1.203 0-2.02.434-2.7 1.113c-.621.623-1.121 1.44-1.655 2.387"
          />
        </svg>
      ),
      title: "Lifetime Access",
      desc: "Pay once and get unlimited lifetime access to all course updates and materials.",
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#E6EEFA] text-blue-600 text-md font-medium uppercase mb-4">
            Why Choose Us
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Everything You Need to Succeed{" "}
          </h2>
          <p className="text-xl text-slate-600 font-medium w-4/5 mx-auto">
            Powerful features designed to accelerate your learning journey and
            help you achieve your goals faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((point, i) => (
            <div
              key={i}
              className="p-10 rounded-2xl border border-slate-100 bg-white hover:shadow-2xl hover:shadow-blue-50"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#3C83F6] from-20% to-[#5EA3FA] to-80% border border-slate-100 text-blue-600 flex items-center justify-center mb-8">
                <span className="text-white">{point.icon}</span>
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                {point.title}
              </h4>
              <p className="text-md text-slate-500 font-normal">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;