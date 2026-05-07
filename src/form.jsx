import { useState } from "react";
import { readPDF } from "./pdf";

export default function Form({ onSubmit }) {
  const emptyForm = {
    name: "",
    role: "",
    company: "",
    skills: "",
    jobDesc: "",
    resumeText: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [fileName, setFileName] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [fileKey, setFileKey] = useState(0); 

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setPdfLoading(true);
    try {
      const text = await readPDF(file);
      setForm((prev) => ({ ...prev, resumeText: text }));
    } catch {
      alert("Could not read PDF. Try another file.");
    }
    setPdfLoading(false);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = () => {
    const required = ["name", "role", "company", "skills", "jobDesc"];
    const newErrors = {};
    required.forEach((field) => {
      if (!form[field].trim()) newErrors[field] = "This field is required";
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (pdfLoading) return;

  
    onSubmit(form);
    setForm(emptyForm);
    setFileName("");
    setErrors({});
    setFileKey((k) => k + 1); 
  };

  const inputClass = (field) =>
    `w-full bg-gray-700 text-white border rounded-xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-gray-600 transition placeholder-gray-400 ${
      errors[field] ? "border-red-500" : "border-gray-600"
    }`;

  return (
    <div className="w-full max-w-3xl mx-auto my-10 px-4">
      <div className="w-full bg-gray-800 rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-wide">
          Fill Your Details
        </h2>

        <div className="flex flex-col gap-6">

          {/* Row 1 - Name + Role */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-1">
              <input
                key={`name-${fileKey}`}
                name="name"
                placeholder="Full Name *"
                value={form.name}
                className={inputClass("name")}
                onChange={handleChange}
              />
              {errors.name && <span className="text-red-400 text-sm pl-1">{errors.name}</span>}
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <input
                key={`role-${fileKey}`}
                name="role"
                placeholder="Target Role (e.g. Frontend Developer) *"
                value={form.role}
                className={inputClass("role")}
                onChange={handleChange}
              />
              {errors.role && <span className="text-red-400 text-sm pl-1">{errors.role}</span>}
            </div>
          </div>

          {/* Row 2 - Company + Skills */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-1">
              <input
                key={`company-${fileKey}`}
                name="company"
                placeholder="Company Name *"
                value={form.company}
                className={inputClass("company")}
                onChange={handleChange}
              />
              {errors.company && <span className="text-red-400 text-sm pl-1">{errors.company}</span>}
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <input
                key={`skills-${fileKey}`}
                name="skills"
                placeholder="Key Skills (comma separated) *"
                value={form.skills}
                className={inputClass("skills")}
                onChange={handleChange}
              />
              {errors.skills && <span className="text-red-400 text-sm pl-1">{errors.skills}</span>}
            </div>
          </div>

          {/* Job Description */}
          <div className="flex flex-col gap-1">
            <textarea
              key={`jobDesc-${fileKey}`}
              name="jobDesc"
              placeholder="Paste the Job Description here... *"
              rows="6"
              value={form.jobDesc}
              className={`w-full bg-gray-700 text-white border rounded-xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-gray-600 transition placeholder-gray-400 resize-none ${
                errors.jobDesc ? "border-red-500" : "border-gray-600"
              }`}
              onChange={handleChange}
            />
            {errors.jobDesc && <span className="text-red-400 text-sm pl-1">{errors.jobDesc}</span>}
          </div>

          {/* PDF Upload */}
          <div className="flex flex-col gap-3">
            <label className="text-gray-300 font-semibold text-base">
              Upload Resume (PDF){" "}
              <span className="text-indigo-400 font-normal text-sm">— Recommended for better results</span>
            </label>
            <div className="flex items-center gap-4">
              <label
                className={`cursor-pointer text-white px-6 py-3 rounded-xl font-semibold text-base transition ${
                  pdfLoading ? "bg-gray-600 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {pdfLoading ? "Reading..." : "Choose PDF"}
                <input
                  key={`file-${fileKey}`}
                  type="file"
                  accept=".pdf"
                  onChange={handleFile}
                  className="hidden"
                  disabled={pdfLoading}
                />
              </label>
              <span className="text-gray-400 text-sm">
                {fileName && !pdfLoading ? `${fileName}` : !fileName ? "No file chosen" : ""}
              </span>
            </div>

            {/* Rain loading bar */}
            {pdfLoading && (
              <div className="w-full flex flex-col gap-2">
                <div className="flex justify-between text-xs text-indigo-300 px-1">
                  <span>Reading your PDF...</span>
                  <span className="animate-pulse">Please wait</span>
                </div>
                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden relative">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "40%",
                      background: "linear-gradient(90deg, transparent, #6366f1, #818cf8, #6366f1, transparent)",
                      animation: "rainRun 1.2s ease-in-out infinite",
                      boxShadow: "0 0 12px 3px rgba(99,102,241,0.8)",
                    }}
                  />
                </div>
                <div className="flex justify-around px-2">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-0.5 rounded-full bg-indigo-400 opacity-70"
                      style={{
                        height: `${8 + (i % 3) * 4}px`,
                        animation: "rainDrop 0.8s ease-in infinite",
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={pdfLoading}
            className={`w-full cursor-pointerfrom-indigo-500 to-indigo-700 shadow-[0px_4px_32px_0_rgba(99,102,241,0.6)] px-6 py-5 rounded-2xl border border-slate-500 text-white text-xl font-bold tracking-wide transition-all duration-300 mt-2 ${
              pdfLoading ? "opacity-50 cursor-not-allowed" : "hover:from-indigo-400 hover:to-indigo-600"
            }`}
          >
            {pdfLoading ? "Wait for PDF..." : "Generate Cover Letter"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes rainRun {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
        @keyframes rainDrop {
          0%   { transform: translateY(-6px); opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: translateY(6px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}