import React from 'react';
import Image from 'next/image';

const AboutHero: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.1]">
            Building the <br />
            <span className="text-[#0077b6]">Future of Intelligence.</span>
          </h1>

          <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-xl">
            We believe that learning is not a linear path, but a multidimensional 
            structure. Ed3Hub is building the foundation where knowledge is 
            interconnected, dynamic, and accessible to those ready to build their 
            future.
          </p>
        </div>

        {/* Right Content - Architectural Visual */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="/architectural_lattice.png" 
              alt="Geometric architectural structure" 
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            
            {/* Subtle Gradient Overlay to match the soft edges in the image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/20 to-transparent pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Background soft glow - optional aesthetic touch based on the screenshot */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-50/30 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
    </section>
  );
};

export default AboutHero;