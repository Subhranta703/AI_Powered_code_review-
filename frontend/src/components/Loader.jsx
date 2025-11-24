import React from "react";

const Loader = () => (
  <div className="mt-4 flex items-center justify-center gap-2 text-slate-300 text-sm">
    <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" />
    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.15s]" />
    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.3s]" />
    <span className="ml-2">Let me review your code…</span>
  </div>
);

export default Loader;
