import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full max-w-5xl">
      <h2 className="text-2xl font-semibold text-slate-50 mb-4">Your Review History</h2>
      <p className="text-sm text-slate-400 mb-6">
        Every snippet you review is saved here so you can track your progress and revisit
        feedback later.
      </p>

      {loading ? (
        <p className="text-sm text-slate-300">Loading your reviews…</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-slate-300">
          You don&apos;t have any reviews yet. Paste your first snippet on the home page!
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {reviews.map((r) => (
            <DashboardCard key={r._id} review={r} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
