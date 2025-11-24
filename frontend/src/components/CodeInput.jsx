import React from "react";

const CodeInput = ({ code, setCode }) => {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-lg shadow-slate-950/40 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-950/80">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="text-[11px] text-slate-400 uppercase tracking-[0.12em]">
          PASTE YOUR CODE
        </span>
      </div>
      <textarea
        className="w-full h-72 md:h-80 bg-transparent px-4 py-3 text-sm font-mono text-slate-100 outline-none resize-none"
        placeholder={`// Paste any code snippet here\nfunction greet(name) {\n  console.log("Hello, " + name + "!");\n}\n\ngreet("Alice");`}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </div>
  );
};

export default CodeInput;
