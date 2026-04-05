import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown as ChevronDownIcon,
  Check,
} from "lucide-react";

const PublishCourseFlow = () => {
  type LegalState = { original: boolean; terms: boolean; reviewed: boolean };
  const [showCalendar, setShowCalendar] = useState(false);
  const [publishNow, setPublishNow] = useState(false);

  // Summaries & Inputs
  const [courseTitle, setCourseTitle] = useState(
    "Introduction to DAOs — Governance on the Blockchain"
  );
  const [courseDesc, setCourseDesc] = useState(
    "Learn how DAOs enable decentralized, community-led governance on the blockchain through smart contracts, voting, and shared decision-making."
  );

  // Live Calendar & Time States
  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date(2024, 8, 15));
  const [finalDate, setFinalDate] = useState("-- -- ----");
  const [hours, setHours] = useState(10);
  const [minutes, setMinutes] = useState(30);
  const [ampm, setAmpm] = useState("AM");

  // Toggle States
  const [certEnabled, setCertEnabled] = useState(true);
  const [assessmentEnabled, setAssessmentEnabled] = useState(true);
  const [autoTimeZone, setAutoTimeZone] = useState(true);

  const [legal, setLegal] = useState<LegalState>({
    original: true,
    terms: true,
    reviewed: true,
  });

  // Calendar Logic
  const calendarGrid = useMemo(() => {
    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();
    const daysCount = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const adjustedStart = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    const days = [];
    for (let i = 0; i < adjustedStart; i++) days.push(null);
    for (let i = 1; i <= daysCount; i++) days.push(new Date(year, month, i));
    return days;
  }, [currentViewDate]);

  const handleApply = () => {
    if (tempDate) {
      setFinalDate(tempDate.toLocaleDateString("en-GB").replace(/\//g, "-"));
      setShowCalendar(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white font-sans text-[#1a1a1a]">
      <h2 className="text-base font-bold mb-8">Ready to submit your course?</h2>

      <div className="space-y-6">
        {/* --- COURSE SUMMARY REVIEW --- */}
        <h3 className="text-sm font-bold">Course Summary Review</h3>

        <div className="space-y-1">
          <label className="text-sm text-gray-400 font-medium uppercase tracking-wider">
            Course Title
          </label>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded text-base focus:outline-none text-black"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-400 font-medium uppercase tracking-wider">
            Course description
          </label>
          <textarea
            rows={3}
            value={courseDesc}
            onChange={(e) => setCourseDesc(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded text-sm leading-relaxed focus:outline-none resize-none text-black"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400 font-medium uppercase tracking-wider">
            Thumbnail
          </label>
          <img
            src="https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?w=600&auto=format&fit=crop&q=60"
            alt="Thumbnail"
            className="w-full h-44 object-cover rounded-sm"
          />
        </div>

        {/* --- MODULES & LESSONS --- */}
        <h3 className="font-bold pt-4">Modules & Lessons Summary</h3>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-1">
            <label className="text-sm text-gray-400 font-medium">
              Number of Modules & Lessons
            </label>
            <input
              type="text"
              value="3 Modules & 12 Lessons"
              readOnly
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none text-black"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-400 font-medium">
              Duration
            </label>
            <input
              type="text"
              value="2 weeks 4 days"
              readOnly
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none text-black"
            />
          </div>
        </div>

        {/* --- LEARNING OUTCOME --- */}
        <div className="pt-4 space-y-1">
          <h3 className="text-sm font-bold mb-2">Learning Outcome</h3>
          <label className="text-sm text-gray-400 font-medium">
            What You'll Learn
          </label>
          <div className="p-4 border border-gray-200 rounded-lg space-y-3 text-sm text-black">
            <p>
              • The fundamentals of Decentralized Identity (DID) and how it
              differs from traditional authentication systems
            </p>
            <p>
              • How Verifiable Credentials work and why they matter for privacy
              and self-ownership..
            </p>
          </div>
        </div>

        {/* --- VISIBILITY --- */}
        <div className="pt-4 space-y-3">
          <h3 className="text-sm font-bold">Visibility Review</h3>
          <div className="space-y-1">
            <label className="text-sm text-gray-400 font-medium">
              Selected Visibility Mode
            </label>
            <div>
              <select
                name=""
                id=""
                className="w-full px-3 py-2 border border-gray-200 rounded flex justify-between items-center bg-white text-black text-sm"
              >
                <option value="Public">Public</option>
              </select>
            </div>
          </div>
          <div className="py-2 flex flex-col space-y-3">
            <p className="text-sm text-gray-400">Scheduled Date & Time</p>
            <p className="text-sm text-black font-normal">Date: {finalDate}</p>
            <p className="text-sm text-black font-normal">
              Time: {hours}:{minutes.toString().padStart(2, "0")} {ampm}
            </p>
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-1 border border-gray-300 rounded text-xs font-bold hover:bg-gray-50 text-black">
              Edit
            </button>
          </div>
        </div>

        {/* --- CERTIFICATE & ASSESSMENT --- */}
        <div className="pt-4 space-y-4">
          <h3 className="text-sm font-bold">Certificate & Assessment</h3>
          <div className="flex justify-between items-center">
            <span className="text-sm text-black">Certification enabled</span>
            <button
              onClick={() => setCertEnabled(!certEnabled)}
              className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${
                certEnabled ? "bg-[#00AEEF]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
                  certEnabled ? "translate-x-4" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-black">
              Assessment (Quiz included)
            </span>
            <button
              onClick={() => setAssessmentEnabled(!assessmentEnabled)}
              className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${
                assessmentEnabled ? "bg-[#00AEEF]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
                  assessmentEnabled ? "translate-x-4" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
          <p className="text-xs text-gray-400 italic">
            Grading Type: Participation based
          </p>
        </div>

        {/* --- PUBLISH TIMING --- */}
        <div className="pt-6 space-y-4">
          <h3 className="text-sm font-bold">Publish Timing</h3>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="timing"
                className="accent-[#fbfcfc]"
                checked={publishNow}
                onChange={() => setPublishNow(true)}
              />
              <span className="text-sm text-gray-500">Publish Now</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="timing"
                className="accent-[#fbfcfc]"
                checked={!publishNow}
                onChange={() => setPublishNow(false)}
              />
              <span className="text-sm text-gray-800 underline-offset-4 decoration-[#00AEEF]">
                Schedule for Later
              </span>
            </label>
          </div>

          {!publishNow && (
            <div className="mt-4 space-y-4 animate-in fade-in duration-300">
              <label className="text-sm text-gray-400 font-bold uppercase tracking-tighter">
                Date & Time
              </label>
              <div
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full bg-[#E3F5FF] p-3 rounded flex items-center justify-between text-[#00AEEF] cursor-pointer"
              >
                <span className="text-sm font-bold">Select Date</span>
                <CalendarIcon size={18} />
              </div>

              <input
                type="text"
                value={finalDate}
                readOnly
                className="w-full px-3 py-2 border border-[#00AEEF] rounded text-base text-center font-bold text-[#00AEEF] focus:outline-none"
              />

              {showCalendar && (
                <div className="p-4 border border-gray-100 rounded shadow-lg bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <ChevronLeft
                      size={20}
                      className="text-[#00AEEF] cursor-pointer"
                      onClick={() =>
                        setCurrentViewDate(
                          new Date(
                            currentViewDate.setMonth(
                              currentViewDate.getMonth() - 1
                            )
                          )
                        )
                      }
                    />
                    <span className="font-bold text-sm text-black">
                      {currentViewDate.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <ChevronRight
                      size={20}
                      className="text-[#00AEEF] cursor-pointer"
                      onClick={() =>
                        setCurrentViewDate(
                          new Date(
                            currentViewDate.setMonth(
                              currentViewDate.getMonth() + 1
                            )
                          )
                        )
                      }
                    />
                  </div>
                  <div className="grid grid-cols-7 text-[10px] text-center gap-1 font-bold text-gray-400 mb-2 uppercase">
                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                      <div key={d}>{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {calendarGrid.map((date, i) => (
                      <div
                        key={i}
                        onClick={() => date && setTempDate(date)}
                        className={`p-2 text-center text-xs cursor-pointer rounded ${
                          !date
                            ? ""
                            : tempDate?.toDateString() === date?.toDateString()
                            ? "bg-[#00AEEF] text-white font-bold"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {date ? date.getDate() : ""}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleApply}
                      className="px-6 py-1.5 bg-[#D1F0FF] text-[#00AEEF] font-bold rounded text-xs"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}

              {/* LIVE TIME PICKER */}
              <div className="flex flex-col items-center pt-6">
                <p className="text-sm text-gray-400 self-start mb-6">
                  SELECT TIME
                </p>
                <div className="flex items-center gap-10">
                  <div className="flex flex-col items-center">
                    <ChevronUp
                      size={24}
                      className="text-gray-300 cursor-pointer"
                      onClick={() => setHours((h) => (h === 12 ? 1 : h + 1))}
                    />
                    <span className="text-4xl font-bold py-2 text-black">
                      {hours} h
                    </span>
                    <ChevronDownIcon
                      size={24}
                      className="text-gray-300 cursor-pointer"
                      onClick={() => setHours((h) => (h === 1 ? 12 : h - 1))}
                    />
                  </div>
                  <span className="text-4xl font-bold text-black">:</span>
                  <div className="flex flex-col items-center">
                    <ChevronUp
                      size={24}
                      className="text-gray-300 cursor-pointer"
                      onClick={() => setMinutes((m) => (m + 5) % 60)}
                    />
                    <span className="text-4xl font-bold py-2 text-black">
                      {minutes.toString().padStart(2, "0")} m
                    </span>
                    <ChevronDownIcon
                      size={24}
                      className="text-gray-300 cursor-pointer"
                      onClick={() => setMinutes((m) => (m === 0 ? 55 : m - 5))}
                    />
                  </div>
                  <div className="flex flex-col gap-2 font-bold text-xl">
                    <button
                      onClick={() => setAmpm("AM")}
                      className={
                        ampm === "AM" ? "text-[#00AEEF]" : "text-gray-300"
                      }
                    >
                      AM
                    </button>
                    <button
                      onClick={() => setAmpm("PM")}
                      className={
                        ampm === "PM" ? "text-[#00AEEF]" : "text-gray-300"
                      }
                    >
                      PM
                    </button>
                  </div>
                </div>
              </div>

              {/* TIME ZONE SECTION */}
              <div className="pt-8">
                <p className="text-sm text-gray-400 tracking-tight mb-4">
                  Time Zone
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black font-medium">
                    Automatic Time Zone
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setAutoTimeZone(!autoTimeZone)}
                      className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${
                        autoTimeZone ? "bg-[#00AEEF]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
                          autoTimeZone ? "translate-x-4" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                    <span className="text-sm font-bold text-black">
                      GMT +09:00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- LEGAL CONFIRMATION --- */}
        <div className="pt-8 space-y-4 border-t border-gray-50">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Legal & Content Confirmation
          </h3>
          {[
            {
              id: "original",
              label: "I confirm all materials used are original or licensed.",
            },
            {
              id: "terms",
              label: "I accept the platform's terms and publishing guidelines.",
            },
            {
              id: "reviewed",
              label: "I have reviewed visibility and pricing options.",
            },
          ].map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 cursor-pointer"
              onClick={() =>
                setLegal((p) => ({ ...p, [item.id]: !p[item.id as keyof LegalState] }))
              }
            >
              <div
                className={`w-4 h-4 mt-0.5 border flex items-center justify-center rounded-sm transition-colors ${
                  legal[item.id as keyof LegalState]
                    ? "bg-[#00AEEF] border-[#00AEEF]"
                    : "bg-white border-gray-300"
                }`}
              >
                {legal[item.id as keyof LegalState] && (
                  <Check size={12} className="text-white stroke-[3px]" />
                )}
              </div>
              <span className="text-sm text-black">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-end items-center pt-10 gap-16">
          <button className="px-8 py-2.5 border border-gray-300 rounded-lg text-sm font-bold text-black hover:bg-gray-50">
            Publish course
          </button>
          <button className="px-8 py-2.5 bg-[#00AEEF] text-white rounded-lg text-sm font-bold shadow-sm hover:bg-[#0096ce]">
            Save as draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishCourseFlow;
