import React from 'react';
import { Search, ArrowRight } from 'lucide-react';

const CommunityPage = () => {
  const tags = ["General Chat", "Course Discussions", "Web3 News & Trends", "Leaderboard", "Project Showcases", "Peer Support Area"];
  const popularComms = [
    { title: "Block Tribe", members: "20k", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300&h=300&fit=crop" },
    { title: "The dApp Lounge", members: "8k", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop" },
    { title: "Builders & Hackers", members: "15k", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=300&fit=crop" },
    { title: "Beginner Basecamp", members: "10k", img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=300&fit=crop" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 md:py-10">
      {/* Search Header */}
       <div className="relative mb-8 max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search communities" 
          className="w-full pl-12 pr-4 py-3 md:py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 text-sm md:text-base"
        />
      </div>

      <div className="text-center mb-10 text-gray-500 font-medium text-sm md:text-base px-4 italic">"Join the movement. Learn together, Build together."</div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-12 md:mb-16">
        {tags.map(tag => (
          <button key={tag} className="px-4 md:px-5 py-1.5 md:py-2 rounded-full border border-gray-200 text-xs md:text-sm font-medium hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all text-gray-600">
            {tag}
          </button>
        ))}
      </div>

      {/* Your Community */}
      <section className="mb-12 md:mb-16">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">Your Community</h3>
          <button className="text-blue-600 font-medium text-sm">See All</button>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-8">
          {[1,2,3].map(i => (
            <div key={i} className="flex items-center gap-4 p-2 rounded-full border border-gray-100 pr-6 hover:bg-white hover:shadow-sm cursor-pointer transition-all bg-gray-50/50">
              <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" alt="avatar" />
              <div>
                <div className="font-bold text-sm text-gray-800">ChainCircle</div>
                <div className="text-[10px] md:text-xs text-gray-400">122k members</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Community Grid */}
      <section className="mb-12 md:mb-16">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">Popular Community</h3>
          <button className="text-blue-600 font-medium text-sm">See All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {popularComms.map((c, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden aspect-[4/5] group shadow-sm">
              <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 flex flex-col justify-end">
                <h4 className="text-white font-bold">{c.title}</h4>
                <p className="text-white/80 text-[10px] md:text-xs mb-4">{c.members} members</p>
                <button className="bg-white/95 text-gray-900 py-2 rounded-xl text-sm font-bold w-full hover:bg-blue-600 hover:text-white transition-all shadow-lg">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Events Banner */}
      <section className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm overflow-hidden relative mb-4">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Web3 Build-A-dApp Weekend</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-6 md:mb-8">
                The Web3 Build-A-dApp Weekend is a high-energy, collaborative hackathon designed to bring together learners, developers, designers, and innovators from across our global community.
              </p>
              <button className="flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all mx-auto md:mx-0 group">
                Explore events <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="w-full md:w-1/3">
              <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop" className="rounded-2xl w-full h-48 md:h-full object-cover shadow-md" alt="Event" />
            </div>
          </div>
      </section>
    </div>
  );
};

export default CommunityPage;
