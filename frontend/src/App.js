import { useState } from "react";
import ReactMarkdown from "react-markdown";


export default function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code.trim()) return alert("Please enter code!");
    setLoading(true);
    try {
      const res = await fetch("https://code-review-ai-k7b3.onrender.com/ai/get-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: code }),
      });
      const data = await res.json();
      setResult(data.review);
    } catch (err) {
      console.error(err);
      setResult("Error fetching AI response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">💡 AI Code Reviewer</h1>
      
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        className="w-full max-w-3xl h-60 p-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600"
      >
        {loading ? "Analyzing..." : "Review Code"}
      </button>

      {result && (
  <div className="mt-6 w-full max-w-3xl bg-gray-800 p-4 rounded-lg border border-gray-700">
    <ReactMarkdown
      components={{
        p: ({ node, ...props }) => (
          <p className="text-gray-200 mb-2" {...props} />
        ),
        code: ({ node, inline, className, children, ...props }) => (
          <code className="bg-gray-900 text-green-400 px-2 py-1 rounded" {...props}>
            {children}
          </code>
        )
      }}
    >
      {result}
    </ReactMarkdown>
  </div>
)}
    </div>
  );
}
