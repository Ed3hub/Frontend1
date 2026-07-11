'use client';
import React, { useState } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, X } from 'lucide-react';

export default function CourseWalkthrough() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <section className="w-full bg-[#F5F7FB] py-20 px-6 md:px-12 lg:px-24 font-sans text-slate-900 selection:bg-blue-100 flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full text-center mb-10">
        {/* Watch Indicator Tag */}
        <span className="text-xs font-bold uppercase tracking-widest text-[#1552b1] block mb-3">
          Watch
        </span>
        
        {/* Main Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          See how it works
        </h2>
        
        {/* Subtitle description */}
        <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
          A quick walkthrough of creating and publishing your first course.
        </p>
      </div>

      {/* Video Container Frame */}
      <div className="w-full max-w-4xl aspect-[16/9] relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-100/80 bg-slate-950 group">
        
        {!isPlaying ? (
          /* Preview Static State (Matching image_eb8c7a.jpg) */
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 w-full h-full text-left focus:outline-none flex flex-col items-center justify-center text-white bg-gradient-to-br from-[#0a1e3f] via-[#0d2a58] to-[#1552b1] transition-all duration-300 overflow-hidden"
          >
            {/* Subtle background grid alignment pattern */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '48px 48px'
              }}
            />

            {/* Glowing radial gradient behind the play button */}
            <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

            {/* Play Trigger & Metadata Layout */}
            <div className="relative z-10 flex flex-col items-center text-center px-6">
              
              {/* Play Icon Hub with Glassmorphism ring */}
              <div className="w-20 h-20 rounded-full border border-white/25 bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white/40 active:scale-95 shadow-lg">
                <Play className="text-white fill-white ml-1 translate-x-px" size={28} />
              </div>

              {/* Card Label Heading */}
              <h3 className="text-xl md:text-2xl font-bold mb-2 tracking-tight">
                Course Creator Walkthrough
              </h3>

              {/* Duration Sub-label */}
              <p className="text-sm text-blue-100/60 font-medium">
                Under 60 seconds
              </p>
            </div>
          </button>
        ) : (
          /* Active Playing Video State (Functional Player wrapper) */
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
            <video
              className="w-full h-full object-cover"
              src="https://assets.mixkit.co/videos/preview/mixkit-online-learning-on-a-laptop-42171-large.mp4"
              autoPlay
              controls={false}
              loop
              muted={isMuted}
            />

            {/* Interactive Custom Overlay Control Panel */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white z-20">
              
              <div className="flex items-center gap-4">
                {/* Restart/Replay CTA */}
                <button
                  onClick={() => {
                    const videoEl = document.querySelector('video');
                    if (videoEl) videoEl.currentTime = 0;
                  }}
                  className="p-2 hover:bg-white/15 rounded-lg transition"
                  title="Replay Video"
                >
                  <RotateCcw size={18} />
                </button>

                {/* Mute toggle button */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 hover:bg-white/15 rounded-lg transition"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>

              {/* Status context label */}
              <span className="text-xs tracking-wider text-white/70 uppercase font-bold bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                Playing Live Preview
              </span>

              {/* Close/Exit video player */}
              <button
                onClick={() => setIsPlaying(false)}
                className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 hover:bg-white/15 rounded-lg border border-white/10 transition-colors backdrop-blur-sm"
              >
                <span>Exit</span>
                <X size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
