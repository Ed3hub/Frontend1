"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** * SECTION 9: READY TO LEARN SECTION
 */
const ReadyToLearn: React.FC = () => (
  <section
    id="resources"
    className="pb-24 pt-12 bg-gradient-to-r from-[#3C83F6] from-20% to-[#5EA3FA] to-80%"
  >
    <div className="">
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-3xl text-white md:text-6xl font-bold mb-8">
          Ready to Start Learning?
        </h2>
        <p className="text-xl text-blue-100 mb-10 font-medium">
          Join thousands of students already learning on ed3hub. Start your
          journey today!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/sign-up">
            <button className="group bg-white flex gap-2 items-center text-blue-600 px-10 py-5 rounded-xl font-medium text-lg hover:bg-slate-100 transition-all shadow-xl">
              Get Started Free
              <span className="group-hover:rotate-12">
                <ArrowRight />
              </span>
            </button>
          </Link>
          <Link href="#pricing">
            <button className="bg-transparent hover:bg-[#ffffffcb] text-white border-2 border-blue-300 px-10 py-5 rounded-xl font-black text-lg hover:bg-blue-400 transition-all">
              View Pricing
            </button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default ReadyToLearn;