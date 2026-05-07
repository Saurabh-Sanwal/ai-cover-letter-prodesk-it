import { useState } from "react";
import Form from "./form";
import { generateLetter } from "./api";

export default function App() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    setResult("");
    setCopied(false);

    try {
      const res = await generateLetter(data);
      setResult(res);
    } catch {
      setResult(" Error generating letter. Check your API key in .env file.");
    }

    setLoading(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-10">

      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-5xl font-extrabold text-white tracking-tight">
          AI Cover Letter Generator
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Fill your details + job description → Get a perfect cover letter instantly
        </p>
      </div>

      {/* Form */}
      <div className="w-full max-w-3xl">
        <Form onSubmit={handleSubmit} />
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex flex-col items-center gap-4 mt-10">
          <div className="w-20 h-20 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-transparent border-t-purple-400 rounded-full animate-spin" />
          </div>
          <p className="text-indigo-300 text-lg font-medium animate-pulse">
             AI is writing your cover letter...
          </p>
        </div>
      )}

      {/* Result Box */}
      {result && (
        <div className="w-full max-w-3xl mt-10 bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">

          {/* Header row — title + copy ICON only on right */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-indigo-400">
               Your Cover Letter
            </h3>

            {/* Copy icon button — top right, icon only */}
            <button
              onClick={copyText}
              title={copied ? "Copied!" : "Copy to clipboard"}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                copied
                  ? "bg-green-600 border-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]"
                  : "bg-gray-700 border-gray-600 hover:bg-indigo-600 hover:border-indigo-500 hover:shadow-[0_0_12px_rgba(99,102,241,0.6)]"
              }`}
            >
              {copied ? (
                // Checkmark icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                // Copy icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeLinejoin="round"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              )}
            </button>
          </div>

          {/* Letter text */}
          <div className="bg-gray-900 rounded-xl p-6 text-gray-200 text-base leading-8 whitespace-pre-wrap border border-gray-700 min-h-48">
            {result}
          </div>

        </div>
      )}

    </div>
  );
}