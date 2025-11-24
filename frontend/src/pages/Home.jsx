import React, { useState } from "react";
import CodeInput from "../components/CodeInput";
import Loader from "../components/Loader";
import ReviewResult from "../components/ReviewResult";
import { api } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setLoading(true);
    setReviewText("");

    try {
      const res = await api.post("/api/reviews", { code, language });
      setReviewText(res.data.fullReview || "No review returned by AI.");
    } catch (err) {
      console.error(err);
      setReviewText("⚠️ Error fetching AI review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-50 tracking-tight mb-3">
          AI-Powered <span className="text-blue-400">Code Review</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          Paste your code and get instant feedback on bugs, performance, security, and best
          practices. Built for students and developers who want better reviews than “looks good”.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-4 items-center justify-between">
        <div className="flex gap-2 items-center">
          <label className="text-xs text-slate-400">Language (optional)</label>
          <input
            className="px-2 py-1 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100 outline-none focus:border-blue-500"
            placeholder="e.g. JavaScript, Python"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!code || loading}
          className="px-5 py-2 text-sm rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white shadow shadow-blue-900/60"
        >
          {loading ? "Analyzing..." : user ? "Review My Code" : "Login to Review"}
        </button>
      </div>

      <CodeInput code={code} setCode={setCode} />

      {loading && <Loader />}

      <ReviewResult review={reviewText} />
    </div>
  );
};

export default Home;
