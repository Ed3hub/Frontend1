import React from 'react';
import { 
  ChevronRight, 
  FileText, 
  Headphones, 
  PlayCircle, 
  Layout, 
  Book, 
  Calendar, 
  MessageCircle,
  Wrench
} from 'lucide-react';

interface ResourceItemProps {
  title: string;
  icon: React.ReactNode;
}

const ResourceRow: React.FC<ResourceItemProps> = ({ title, icon }) => (
  <div className="flex items-center justify-between py-5 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors px-2">
    <div className="flex items-center gap-4">
      <span className="text-gray-400">{icon}</span>
      <span className="text-gray-700 font-medium text-lg">{title}</span>
    </div>
    <ChevronRight className="text-gray-300 w-5 h-5" />
  </div>
);

const ResourcesPage: React.FC = () => {
  const resourceCategories = [
    { title: "Articles", icon: <FileText size={20} /> },
    { title: "PDFs", icon: <Book size={20} /> },
    { title: "Podcasts", icon: <Headphones size={20} /> },
    { title: "Interactive Demos", icon: <Layout size={20} /> },
    { title: "Tools and Templates", icon: <Wrench size={20} /> },
    { title: "Upcoming Events", icon: <Calendar size={20} /> },
    { title: "Glossary", icon: <Book size={20} /> },
    { title: "Videos", icon: <PlayCircle size={20} /> },
    { title: "FAQs", icon: <MessageCircle size={20} /> },
  ];

  return (
    <div className="font-sans">
      {/* Description */}
      <section className="mb-10 text-gray-600 text-sm leading-relaxed">
        <p>
          This course introduces UI/UX designers to the world of Tokenomics and Decentralized Finance (DeFi). 
          You'll learn how DeFi protocols work, the economic models behind them, and how to design usable, 
          trustworthy, and engaging interfaces for Web3 users.
        </p>
        <p className="mt-2">
          The course blends conceptual understanding with practical design applications, helping yo... 
          <span className="text-blue-500 cursor-pointer font-medium ml-1">see more</span>
        </p>
      </section>

      {/* Resources List */}
      <section className="space-y-0">
        {resourceCategories.map((resource) => (
          <ResourceRow key={resource.title} title={resource.title} icon={resource.icon} />
        ))}
      </section>
    </div>
  );
};

export default ResourcesPage;