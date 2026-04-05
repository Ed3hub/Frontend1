import React from 'react';
import { 
  Clock, 
  Calendar, 
  Hourglass, 
  BarChart3 
} from 'lucide-react';

interface DurationInfoProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const DurationRow: React.FC<DurationInfoProps> = ({ label, value, icon }) => (
  <div className="flex items-center gap-4 py-6 border-b border-gray-100 last:border-0">
    <div className="p-2 bg-gray-50 rounded-full text-gray-400">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm font-medium">{label}</span>
      <span className="text-gray-800 text-lg font-semibold">{value}</span>
    </div>
  </div>
);

const DurationPage: React.FC = () => {
  const durationData = [
    { label: "Duration", value: "4 weeks (Self-paced)", icon: <Calendar size={20} /> },
    { label: "Estimated time to complete", value: "6-8 hours total", icon: <Clock size={20} /> },
    { label: "Course Length", value: "~1.5 hours/week for 3 weeks", icon: <BarChart3 size={20} /> },
    { label: "Time Commitment", value: "2 hours/week (Self-paced)", icon: <Hourglass size={20} /> },
  ];

  return (
    <div className="font-sans">
      {/* Duration Metrics */}
      <section className="flex flex-col">
        {durationData.map((item, index) => (
          <DurationRow 
            key={index} 
            label={item.label} 
            value={item.value} 
            icon={item.icon} 
          />
        ))}
      </section>
    </div>
  );
};

export default DurationPage;