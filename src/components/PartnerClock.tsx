import React, { useState, useEffect } from 'react';

export const PartnerClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden lg:flex flex-col text-right">
      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 font-mono flex items-center justify-end gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
        Partner Sync Active
      </span>
      <span className="text-xs font-mono font-semibold text-slate-700 mt-0.5 select-all">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} EST
      </span>
    </div>
  );
};
