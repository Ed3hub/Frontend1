import React, { useState } from "react";
import { Star, BookOpen, Banknote, Eye, EyeOff } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "JAN", value: 3000 },
  { name: "FEB", value: 4500 },
  { name: "MAR", value: 3800 },
  { name: "APR", value: 7500 },
  { name: "MAY", value: 5500 },
  { name: "JUN", value: 4000 },
  { name: "JUL", value: 5200 },
];

interface MetricCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  bgColor: string;
}

const MetricCard = ({ icon: Icon, value, label, bgColor }: MetricCardProps) => (
  <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-start w-full">
    {/* Icon and Value on the same line to match reference image */}
    <div className="flex items-center space-x-4 mb-4">
      <span className={`p-3 rounded-2xl ${bgColor}`}>
        <Icon className="text-blue-500" size={24} />
      </span>
      <span className="text-lg font-bold text-gray-900">{value}</span>
    </div>
    <div>
      <span className="text-gray-400 text-sm font-medium">{label}</span>
    </div>
  </div>
);

const Earnings = () => {
  // Set to false by default so earnings are hidden on load
  const [isVisible, setIsVisible] = useState(false);
  const earningsValue = "$12,500";

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-base font-bold text-gray-800 mb-8">
        Earnings & Engagement
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <MetricCard
          icon={Star}
          value="4.7"
          label="Average Rating"
          bgColor="bg-blue-50"
        />
        <MetricCard
          icon={BookOpen}
          value="12"
          label="Total Courses"
          bgColor="bg-blue-50"
        />
        <MetricCard
          // Changed to Banknote to serve as the money icon for Token Balance
          icon={Banknote}
          value="50"
          label="Token Balance"
          bgColor="bg-blue-50"
        />
      </div>

      <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-50">
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-500 font-medium text-sm">Total Earnings</span>
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="text-gray-400 hover:text-blue-500 transition-colors"
              aria-label="Toggle Visibility"
            >
              {/* Eye-Slash shows when hidden (default), Eye shows when visible */}
              {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            {isVisible ? earningsValue : "••••••"}
          </h2>
        </div>

        <div className="h-[350px] w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A3FF" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#00A3FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              {/* Horizontal grid lines only as per image */}
              <CartesianGrid vertical={false} stroke="#F3F4F6" strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 500 }}
                dy={15}
              />
              <YAxis
                hide={true}
                domain={["dataMin - 1000", "dataMax + 1000"]}
              />
              <Tooltip
                cursor={false}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#00A3FF"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorValue)"
                activeDot={{
                  r: 8,
                  fill: "#00A3FF",
                  stroke: "#fff",
                  strokeWidth: 3,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Earnings;