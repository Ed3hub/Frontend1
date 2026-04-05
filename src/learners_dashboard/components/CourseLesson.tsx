import React from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Maximize, 
  ArrowLeft, 
  ArrowRight 
} from 'lucide-react';

interface CourseLessonProps {
  setActivePage: (page: string) => void;
  course: { title: string; instructor: string; img: string; showPurchaseModal?: boolean } | null;
  lesson: { title: string; type: string; duration: string; completed: boolean } | null;
}

const CourseLesson: React.FC<CourseLessonProps> = ({ setActivePage, course, lesson }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen font-sans">
      {/* Video Section */}
      <div className="w-full h-[300px] bg-black">
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/2c3ITiw5CAg?si=VIEv9agEWBoMHIuw" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
        ></iframe>
      </div>

      {/* Content Section */}
      <div className="p-8">
        <header className="mb-6">
          <button 
            onClick={() => setActivePage('courseDetails')} 
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors mb-4 -ml-2 p-2 rounded-lg hover:bg-gray-100 w-fit"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-semibold">Back to Course</span>
          </button>
          <h1 className="text-2xl font-extrabold text-gray-900">{course?.title ?? 'Tokenomics: Designing Crypto Assets'}</h1>
          <h2 className="text-lg font-bold text-gray-700 mt-1">Overview</h2>
        </header>

        <section className="mb-8">
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Tokenomics (short for token economics) is the study and design of the economic systems and 
            incentives behind cryptocurrencies, tokens, and blockchain-based projects. It combines economics, 
            game theory and blockchain technology to ensure that a token has real utility, long-term sustainability, 
            and drives the right behavior among users, investors, and developers.
          </p>
        </section>

        <hr className="border-gray-200 mb-8" />

        {/* Lesson Details */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">{lesson?.title ?? 'Monetary Policy in Crypto'}</h3>
          <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Lesson 3 of 4</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          <button className="px-4 py-1.5 rounded-md border border-blue-400 text-blue-400 text-xs font-semibold bg-blue-50">
            Transcript
          </button>
          <button className="px-4 py-1.5 rounded-md border border-gray-200 text-gray-500 text-xs font-semibold hover:bg-gray-50">
            Comments
          </button>
        </div>

        {/* Transcript Text */}
        <div className="space-y-8 text-gray-700 leading-relaxed mb-12">
          <div>
            <p className="font-bold text-gray-900 mb-1">[00:00]</p>
            <p>Hi everyone, and welcome to this lesson on Monetary Policy in the Crypto Ecosystem.</p>
            <p className="mt-2">Today, we'll explore how cryptocurrencies design their own versions of monetary policy—and how they differ from traditional central banking systems.</p>
          </div>

          <div>
            <p className="font-bold text-gray-900 mb-1">[00:20]</p>
            <p>Let's start with a quick recap of what monetary policy means in traditional finance.</p>
            <p className="mt-2">In a typical economy, the central bank—like the Federal Reserve or the European Central Bank—manages the money supply, interest rates, and inflation targets. The tools they use include printing money, changing interest rates, and setting reserve requirements for banks.</p>
          </div>

          <div>
            <p className="font-bold text-gray-900 mb-1">[00:45]</p>
            <p>Now, cryptocurrencies don't have central banks. So how do they...</p>
          </div>
        </div>

        {/* Pagination Buttons */}
        <footer className="flex justify-between items-center pt-6 border-t border-gray-100">
          <button className="flex items-center gap-2 px-6 py-2 border border-gray-200 rounded-lg text-gray-600 text-xs font-medium hover:bg-gray-50 transition-colors">
            <ArrowLeft size={14} />
            Previous
          </button>
          <button className="flex items-center gap-2 px-6 py-2 border border-gray-200 rounded-lg text-gray-600 text-xs font-medium hover:bg-gray-50 transition-colors">
            Next
            <ArrowRight size={14} />
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CourseLesson;