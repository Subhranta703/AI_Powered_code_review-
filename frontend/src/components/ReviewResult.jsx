import React, { useState } from "react";

const tabs = ["Summary", "Issues", "Suggestions", "Tests", "Raw"];

const splitSections = (reviewText) => {
  const sections = {
    Summary: "",
    Issues: "",
    Suggestions: "",
    "Complexity & Maintainability": "",
    "Security Review": "",
    "Suggested Tests": "",
    Raw: reviewText
  };

  if (!reviewText) return sections;

  const lines = reviewText.split("\n");
  let current = "Summary";

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (/^### Summary/i.test(trimmed)) current = "Summary";
    else if (/^### Issues/i.test(trimmed)) current = "Issues";
    else if (/^### Suggestions/i.test(trimmed)) current = "Suggestions";
    else if (/^### Complexity/i.test(trimmed)) current = "Complexity & Maintainability";
    else if (/^### Security Review/i.test(trimmed)) current = "Security Review";
    else if (/^### Suggested Tests/i.test(trimmed)) current = "Suggested Tests";

    sections[current] += line + "\n";
  });

  return sections;
};

const ReviewResult = ({ review }) => {
  const [activeTab, setActiveTab] = useState("Summary");

  if (!review) return null;

  const sections = splitSections(review);

  const getContentForTab = (tab) => {
    switch (tab) {
      case "Summary":
        return sections["Summary"] || "No summary extracted.";
      case "Issues":
        return sections["Issues"] || "No issues found.";
      case "Suggestions":
        return (
          sections["Suggestions"] ||
          sections["Complexity & Maintainability"] ||
          "No suggestions available."
        );
      case "Tests":
        return sections["Suggested Tests"] || "No specific tests suggested.";
      case "Raw":
      default:
        return sections["Raw"];
    }
  };

  return (
    <div className="mt-8 bg-slate-900/70 border border-slate-800 rounded-2xl shadow-xl shadow-slate-950/40 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
          <span className="text-lg">🧠</span>
          AI Code Review
        </h3>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-xs px-3 py-1.5 rounded-full border ${
              activeTab === tab
                ? "bg-blue-600 border-blue-500 text-white"
                : "bg-slate-950/70 border-slate-700 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 max-h-80 overflow-y-auto text-sm">
        <pre className="whitespace-pre-wrap text-slate-100">
          {getContentForTab(activeTab)}
        </pre>
      </div>
    </div>
  );
};

export default ReviewResult;
