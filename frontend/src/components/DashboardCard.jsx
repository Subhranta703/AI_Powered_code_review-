import React from "react";

const DashboardCard = ({ review }) => {
  const title =
    (review.language ? `[${review.language}] ` : "") +
    (review.code
      ? review.code.split("\n")[0].slice(0, 60)
      : "Code snippet");

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 hover:border-blue-500/60 transition-colors">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h4 className="text-sm font-semibold text-slate-100">{title}</h4>
          <p className="text-[11px] text-slate-500 mt-1">
            Reviewed on {new Date(review.createdAt).toLocaleString()}
          </p>
        </div>
        <span className="text-[10px] px-2 py-1 rounded-full bg-slate-800 text-slate-300">
          {review.language || "Unknown"}
        </span>
      </div>
    </div>
  );
};

export default DashboardCard;
