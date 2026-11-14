"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  GraduationCap,
  Layers,
  Menu,
  Moon,
  RotateCcw,
  Sun,
  Trophy,
  XCircle,
} from "lucide-react";
import { type Question } from "../../data/questions";

const letters = ["A", "B", "C", "D", "E", "F"];
const DEFAULT_EXAM_SECONDS = 60 * 60;

function sameAnswers(a: number[] = [], b: number[] = []) {
  if (!a || !b) return false;
  return a.length === b.length && a.every((value) => b.includes(value));
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

type QuizRunnerProps = {
  questions: Question[];
  subjectTitle?: string;
  versionName?: string;
  durationMinutes?: number;
  onExit: () => void;
};

export function QuizRunner({
  questions,
  subjectTitle = "INNOVATION MANAGEMENT",
  versionName = "VERSION 2",
  durationMinutes = 60,
  onExit,
}: QuizRunnerProps) {
  const examSeconds = durationMinutes * 60;
  const [mode, setMode] = useState<"quiz" | "finished">("quiz");
  const [darkMode, setDarkMode] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(
    durationMinutes > 0 ? examSeconds : DEFAULT_EXAM_SECONDS
  );
  const [current, setCurrent] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number[]>>({});

  const question: Question | undefined = questions[current];
  const selected: number[] = question ? userAnswers[question.id] || [] : [];

  const answeredCount = Object.keys(userAnswers).filter(
    (id) => (userAnswers[Number(id)] || []).length > 0
  ).length;

  const progress = questions.length ? Math.round(((current + 1) / questions.length) * 100) : 0;

  // Load and persist theme
  useEffect(() => {
    const saved = window.localStorage.getItem("kuppi-theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("kuppi-theme", darkMode ? "dark" : "light");
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Topics extraction
  const topics = useMemo(() => {
    const list: { name: string; firstIndex: number }[] = [];
    const seen = new Set<string>();
    questions.forEach((q, idx) => {
      const topicName = q.topic || q.lecture.replace(/^Lecture \d+:\s*/, "");
      if (!seen.has(topicName)) {
        seen.add(topicName);
        list.push({ name: topicName, firstIndex: idx });
      }
    });
    return list;
  }, [questions]);

  // Timer countdown
  useEffect(() => {
    if (mode !== "quiz") return;
    const timer = window.setInterval(() => {
      setRemainingSeconds((val) => {
        if (val <= 1) {
          window.clearInterval(timer);
          setMode("finished");
          return 0;
        }
        return val - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [mode]);

  function handleSelectOption(index: number) {
    if (!question) return;
    const currentSelected = userAnswers[question.id] || [];
    let updated: number[];

    if (question.multiple) {
      if (currentSelected.includes(index)) {
        updated = currentSelected.filter((i) => i !== index);
      } else {
        updated = [...currentSelected, index];
      }
    } else {
      updated = [index];
    }

    setUserAnswers((prev) => ({
      ...prev,
      [question.id]: updated,
    }));
  }

  function handleNext() {
    if (current < questions.length - 1) {
      setCurrent((val) => val + 1);
    } else {
      setMode("finished");
    }
  }

  function handlePrev() {
    if (current > 0) {
      setCurrent((val) => val - 1);
    }
  }

  function restartQuiz() {
    setUserAnswers({});
    setCurrent(0);
    setRemainingSeconds(examSeconds);
    setMode("quiz");
  }

  // Calculate results for finished screen
  const results = useMemo(() => {
    let correctTotal = 0;
    const breakdown = questions.map((q) => {
      const ans = userAnswers[q.id] || [];
      const isCorrect = sameAnswers(ans, q.correct);
      if (isCorrect) correctTotal += 1;
      return {
        question: q,
        userAnswer: ans,
        isCorrect,
      };
    });
    const totalScore = correctTotal * 2;
    const maxScore = questions.length * 2;
    const percentage = questions.length ? Math.round((correctTotal / questions.length) * 100) : 0;

    return {
      correctTotal,
      totalScore,
      maxScore,
      percentage,
      breakdown,
    };
  }, [questions, userAnswers]);

  if (!questions.length) {
    return (
      <main
        className={`min-h-screen flex flex-col items-center justify-center p-8 text-center transition-colors ${
          darkMode ? "bg-[#0b1222] text-white" : "bg-[#f3f7fd] text-[#062B50]"
        }`}
      >
        <h2 className="text-2xl font-bold mb-3">No questions found</h2>
        <p className="text-slate-400 mb-6">This version does not have questions loaded yet.</p>
        <button
          onClick={onExit}
          className="px-6 py-2.5 rounded-full bg-[#087BFF] text-white font-semibold cursor-pointer"
          type="button"
        >
          Back to Versions
        </button>
      </main>
    );
  }

  // Theme toggle button component
  const themeToggleButton = (
    <button
      type="button"
      onClick={() => setDarkMode(!darkMode)}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all shadow-xs border cursor-pointer ${
        darkMode
          ? "bg-[#18233d] text-amber-300 border-slate-700 hover:bg-[#202d4d]"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
      }`}
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {darkMode ? <Sun className="h-3.5 w-3.5 text-amber-300" /> : <Moon className="h-3.5 w-3.5 text-slate-600" />}
      <span>{darkMode ? "Light mode" : "Dark mode"}</span>
    </button>
  );

  // FINISHED / RESULTS SCREEN
  if (mode === "finished") {
    return (
      <main
        className={`min-h-screen p-4 sm:p-6 lg:p-10 font-sans transition-colors ${
          darkMode
            ? "bg-[#0b1222] text-[#f1f5f9]"
            : "bg-[linear-gradient(180deg,#ebf4fe_0%,#f5f8fd_50%,#ffffff_100%)] text-[#0f2744]"
        }`}
      >
        <div className="max-w-[880px] mx-auto">
          {/* Header */}
          <div
            className={`flex items-center justify-between mb-8 pb-4 border-b ${
              darkMode ? "border-slate-800" : "border-blue-100/80"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#087BFF] text-white shadow-md shadow-blue-500/20">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <h1
                  className={`text-lg font-black tracking-tight ${
                    darkMode ? "text-white" : "text-[#062B50]"
                  }`}
                >
                  KUPPI LAB • RESULTS
                </h1>
                <p className="text-xs font-semibold text-slate-400">
                  {subjectTitle} — {versionName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {themeToggleButton}
              <button
                onClick={onExit}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition shadow-sm border cursor-pointer ${
                  darkMode
                    ? "bg-[#18233d] text-slate-200 border-slate-700 hover:bg-[#202d4d]"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                Exit to Menu
              </button>
            </div>
          </div>

          {/* Score Card */}
          <div
            className={`rounded-3xl p-8 sm:p-10 text-center mb-8 border transition-all ${
              darkMode
                ? "bg-[#131c31] border-slate-800 shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                : "bg-white border-[#e2edfa] shadow-[0_12px_40px_rgba(20,60,120,0.06)]"
            }`}
          >
            <div
              className={`mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full ${
                darkMode ? "bg-blue-950/70 text-[#38bdf8]" : "bg-blue-50 text-[#087BFF]"
              }`}
            >
              <Trophy className="h-8 w-8" />
            </div>

            <p className="text-xs font-extrabold tracking-widest text-[#087BFF] uppercase mb-1">
              Exam Summary
            </p>
            <h2
              className={`text-2xl sm:text-3xl font-black ${
                darkMode ? "text-white" : "text-[#062B50]"
              }`}
            >
              {results.percentage >= 70
                ? "Outstanding Performance!"
                : results.percentage >= 50
                ? "Good Effort — Pass!"
                : "Keep Practicing!"}
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto">
              You answered {answeredCount} of {questions.length} questions. Multi-select questions require all correct options to be selected to earn marks.
            </p>

            {/* Score circle & statistics */}
            <div className="my-8 flex flex-wrap items-center justify-center gap-6">
              <div
                className={`flex flex-col items-center justify-center h-32 w-32 rounded-full border-4 border-[#087BFF] ${
                  darkMode ? "bg-blue-950/40" : "bg-blue-50/40"
                }`}
              >
                <span className="text-3xl font-black text-[#087BFF]">{results.totalScore}</span>
                <span className="text-[11px] font-bold text-slate-400">/ {results.maxScore} Marks</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                <div
                  className={`rounded-2xl p-4 border ${
                    darkMode
                      ? "bg-[#18233d] border-slate-700/80"
                      : "bg-slate-50 border-slate-100"
                  }`}
                >
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Accuracy</span>
                  <span
                    className={`text-xl font-black ${
                      darkMode ? "text-white" : "text-[#062B50]"
                    }`}
                  >
                    {results.percentage}%
                  </span>
                </div>
                <div
                  className={`rounded-2xl p-4 border ${
                    darkMode
                      ? "bg-[#18233d] border-slate-700/80"
                      : "bg-slate-50 border-slate-100"
                  }`}
                >
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Correct</span>
                  <span className="text-xl font-black text-[#12B76A]">
                    {results.correctTotal} / {questions.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={restartQuiz}
                className="inline-flex items-center gap-2 rounded-full bg-[#087BFF] px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#006ef0] transition cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                Retake Exam
              </button>
              <button
                onClick={onExit}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition cursor-pointer ${
                  darkMode
                    ? "bg-[#18233d] text-slate-200 hover:bg-[#202d4d]"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Back to Version Selection
              </button>
            </div>
          </div>

          {/* Detailed Review */}
          <div
            className={`rounded-3xl p-6 sm:p-8 border transition-all ${
              darkMode
                ? "bg-[#131c31] border-slate-800 shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                : "bg-white border-[#e2edfa] shadow-[0_12px_40px_rgba(20,60,120,0.06)]"
            }`}
          >
            <h3
              className={`text-xl font-black mb-6 flex items-center gap-2 ${
                darkMode ? "text-white" : "text-[#062B50]"
              }`}
            >
              <BookOpen className="h-5 w-5 text-[#087BFF]" />
              Detailed Answer Review ({questions.length} Questions)
            </h3>

            <div className="space-y-6">
              {results.breakdown.map((item, idx) => (
                <div
                  key={item.question.id}
                  className={`rounded-2xl p-5 border transition-all ${
                    item.isCorrect
                      ? darkMode
                        ? "bg-emerald-950/25 border-emerald-800/50"
                        : "bg-emerald-50/30 border-emerald-200"
                      : darkMode
                      ? "bg-rose-950/25 border-rose-800/50"
                      : "bg-red-50/30 border-red-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold border ${
                        darkMode
                          ? "bg-[#18233d] text-slate-300 border-slate-700"
                          : "bg-white text-slate-700 border-slate-200"
                      }`}
                    >
                      Q{idx + 1} • {item.question.lecture}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full ${
                        item.isCorrect
                          ? darkMode
                            ? "bg-emerald-900/60 text-emerald-300"
                            : "bg-emerald-100 text-emerald-800"
                          : darkMode
                          ? "bg-rose-900/60 text-rose-300"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.isCorrect ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" /> +2 Marks
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3.5 w-3.5" /> 0 Marks
                        </>
                      )}
                    </span>
                  </div>

                  <h4
                    className={`text-[15px] font-bold leading-snug my-3 ${
                      darkMode ? "text-slate-100" : "text-[#062B50]"
                    }`}
                  >
                    {item.question.prompt}
                  </h4>

                  <div className="space-y-1.5 text-xs">
                    <div
                      className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                        darkMode
                          ? "bg-[#162139] border-slate-700/60"
                          : "bg-white border-slate-100"
                      }`}
                    >
                      <strong className="text-slate-400 min-w-[90px]">Your Answer:</strong>
                      <span
                        className={
                          item.isCorrect
                            ? "font-bold text-emerald-500"
                            : "font-bold text-rose-400"
                        }
                      >
                        {item.userAnswer.length > 0
                          ? item.userAnswer
                              .map((i) => `${letters[i]}. ${item.question.options[i]}`)
                              .join(" | ")
                          : "Not answered"}
                      </span>
                    </div>

                    <div
                      className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                        darkMode
                          ? "bg-[#162139] border-slate-700/60"
                          : "bg-white border-slate-100"
                      }`}
                    >
                      <strong className="text-slate-400 min-w-[90px]">Correct Answer:</strong>
                      <span className="font-bold text-emerald-500">
                        {item.question.correct
                          .map((i) => `${letters[i]}. ${item.question.options[i]}`)
                          .join(" | ")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ACTIVE EXAM RUNNER SCREEN
  return (
    <main
      className={`min-h-screen relative overflow-x-hidden flex items-start justify-center p-3 sm:p-5 lg:p-8 font-sans transition-colors duration-200 ${
        darkMode ? "bg-[#0b1222] text-[#f1f5f9]" : "bg-[#f3f7fd] text-[#0f2744]"
      }`}
    >
      {/* Decorative background curves */}
      <div
        className={`pointer-events-none absolute left-[-120px] top-[-100px] h-96 w-96 rounded-full blur-3xl transition-opacity ${
          darkMode ? "bg-blue-900/20" : "bg-[#dbeafe]/60"
        }`}
      />
      <div
        className={`pointer-events-none absolute right-[-100px] top-[20%] h-96 w-96 rounded-full blur-3xl transition-opacity ${
          darkMode ? "bg-indigo-950/20" : "bg-[#e0edfd]/50"
        }`}
      />

      <div className="max-w-[1200px] w-full mx-auto flex flex-col lg:flex-row gap-5 items-start relative z-10">
        {/* LEFT SIDEBAR CARD */}
        <aside
          className={`w-full lg:w-[280px] shrink-0 rounded-3xl p-5 sm:p-6 border flex flex-col transition-all ${
            darkMode
              ? "bg-[#131c31] border-slate-800 shadow-[0_10px_35px_rgba(0,0,0,0.3)]"
              : "bg-white border-[#e2edfa]/80 shadow-[0_10px_35px_rgba(20,60,120,0.05)]"
          }`}
        >
          {/* Header with mortarboard */}
          <div className="flex items-center gap-3 mb-5">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#087BFF] text-white shadow-md shadow-blue-500/20 shrink-0">
              <GraduationCap className="h-6 w-6" />
            </span>
            <div>
              <h2
                className={`text-[17px] font-black tracking-tight leading-tight ${
                  darkMode ? "text-white" : "text-[#0f2744]"
                }`}
              >
                MCQ Practice
              </h2>
              <p
                className={`text-[11px] font-semibold tracking-wide ${
                  darkMode ? "text-slate-400" : "text-[#71859d]"
                }`}
              >
                Learn • Practice • Excel
              </p>
            </div>
          </div>

          {/* Question Set Header */}
          <div className={`border-t pt-4 ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-[12.5px] font-bold flex items-center gap-2 ${
                  darkMode ? "text-slate-200" : "text-[#0f2744]"
                }`}
              >
                <Layers className="h-4 w-4 text-[#087BFF]" />
                Question Set
              </span>
              <span
                className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-full ${
                  darkMode
                    ? "text-[#38bdf8] bg-blue-950/60 border border-blue-900/60"
                    : "text-[#087BFF] bg-[#ebf4ff]"
                }`}
              >
                {questions.length} Questions
              </span>
            </div>

            {/* Question Numbers Grid (5 cols) */}
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === current;
                const isAnswered = (userAnswers[q.id] || []).length > 0;

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrent(idx)}
                    className={`h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-all cursor-pointer ${
                      isCurrent
                        ? "bg-[#087BFF] text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-400/40"
                        : isAnswered
                        ? darkMode
                          ? "bg-blue-950/50 text-[#38bdf8] border border-blue-800/60 hover:bg-blue-900/40"
                          : "bg-[#ddecfe] text-[#087BFF] border border-blue-200/80 hover:bg-[#cfe5fd]"
                        : darkMode
                        ? "bg-[#18233d] text-slate-300 border border-slate-700/80 hover:bg-[#202d4d] hover:text-white"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div
              className={`mt-3.5 flex items-center gap-4 text-[11px] font-semibold ${
                darkMode ? "text-slate-400" : "text-[#71859d]"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#087BFF]" />
                Current
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className={`h-2 w-2 rounded-full ${
                    darkMode ? "bg-blue-400" : "bg-[#bfdbfe]"
                  }`}
                />
                Answered
              </span>
            </div>
          </div>

          {/* Topics List */}
          <div className={`border-t pt-4 mt-4 ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
            <div
              className={`flex items-center gap-2 text-[12.5px] font-bold mb-2.5 ${
                darkMode ? "text-slate-200" : "text-[#0f2744]"
              }`}
            >
              <Menu className="h-4 w-4 text-[#087BFF]" />
              Topics
            </div>

            <div className="space-y-1">
              {topics.map((t) => {
                const isCurrentTopic =
                  question &&
                  (question.topic === t.name || question.lecture.includes(t.name));

                return (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setCurrent(t.firstIndex)}
                    className={`w-full text-left py-1.5 px-2 rounded-lg text-[11.5px] flex items-center justify-between transition-colors group cursor-pointer ${
                      isCurrentTopic
                        ? darkMode
                          ? "font-bold text-[#38bdf8] bg-blue-950/50"
                          : "font-bold text-[#087BFF] bg-blue-50/60"
                        : darkMode
                        ? "font-medium text-slate-300 hover:text-[#38bdf8] hover:bg-slate-800/50"
                        : "font-medium text-slate-600 hover:text-[#087BFF] hover:bg-slate-50"
                    }`}
                  >
                    <span className="truncate pr-2">{t.name}</span>
                    <ChevronRight
                      className={`h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                        darkMode
                          ? "text-slate-500 group-hover:text-[#38bdf8]"
                          : "text-slate-400 group-hover:text-[#087BFF]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Exit Link */}
          <div className={`border-t pt-3 mt-4 text-center ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
            <button
              onClick={onExit}
              className={`text-xs font-semibold transition cursor-pointer ${
                darkMode ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"
              }`}
              type="button"
            >
              ← Back to Version Selection
            </button>
          </div>
        </aside>

        {/* RIGHT MAIN QUIZ AREA */}
        <section className="flex-1 w-full flex flex-col gap-4">
          {/* Top Bar above question card */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-1 py-1">
            {/* Left: Current Lecture Title */}
            <div
              className={`flex items-center gap-2 text-sm font-bold ${
                darkMode ? "text-slate-200" : "text-[#0f2744]"
              }`}
            >
              <BookOpen className="h-4 w-4 text-[#087BFF] shrink-0" />
              <span>{question?.lecture}</span>
            </div>

            {/* Right: Theme toggle, Timer pill & Progress */}
            <div className="flex items-center gap-3 sm:gap-4 ml-auto">
              {/* Dark/Light mode toggle */}
              {themeToggleButton}

              {/* Timer Pill */}
              <div
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold shadow-xs border ${
                  remainingSeconds < 300
                    ? "bg-red-50 text-red-600 border-red-200 animate-pulse"
                    : darkMode
                    ? "bg-[#131c31] text-[#38bdf8] border-blue-900/60"
                    : "bg-[#eef5fe] text-[#087BFF] border-blue-100/90"
                }`}
              >
                <Clock className="h-3.5 w-3.5" />
                <span>Time Left: {formatTime(remainingSeconds)}</span>
              </div>

              {/* Progress */}
              <div className="flex flex-col items-end gap-1">
                <span
                  className={`text-[11px] font-bold ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {progress}% Complete
                </span>
                <div
                  className={`h-1.5 w-24 rounded-full overflow-hidden ${
                    darkMode ? "bg-slate-800" : "bg-blue-100/80"
                  }`}
                >
                  <div
                    className="h-full bg-[#087BFF] rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Question Card */}
          <div
            className={`rounded-3xl p-6 sm:p-8 border transition-all ${
              darkMode
                ? "bg-[#131c31] border-slate-800 shadow-[0_10px_35px_rgba(0,0,0,0.3)]"
                : "bg-white border-[#e2edfa]/80 shadow-[0_10px_35px_rgba(20,60,120,0.05)]"
            }`}
          >
            {/* Card Header: Type badge & Question number */}
            <div className="flex items-center justify-between">
              <span
                className={`inline-block rounded-full px-3.5 py-1 text-[11px] font-bold ${
                  darkMode
                    ? "bg-blue-950/60 text-[#38bdf8] border border-blue-900/60"
                    : "bg-[#ebf4ff] text-[#087BFF]"
                }`}
              >
                {question?.multiple ? "Multiple Select" : "Single Select"}
              </span>
              <span
                className={`text-[12.5px] font-semibold ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Question {current + 1} of {questions.length}
              </span>
            </div>

            {/* Question Prompt */}
            <h1
              className={`mt-5 mb-6 text-[18px] sm:text-[20px] font-black leading-snug tracking-tight ${
                darkMode ? "text-white" : "text-[#0f2744]"
              }`}
            >
              {question?.prompt}
            </h1>

            {/* Options List */}
            <div className="space-y-3">
              {question?.options.map((option, idx) => {
                const isSelected = selected.includes(idx);

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left rounded-2xl p-3.5 px-4 flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? darkMode
                          ? "border-2 border-[#087BFF] bg-[#122244] shadow-sm"
                          : "border-2 border-[#087BFF] bg-[#f0f6ff] shadow-sm"
                        : darkMode
                        ? "border border-slate-700/80 bg-[#17223b] hover:border-blue-400/50 hover:bg-[#1d2b4a]"
                        : "border border-slate-200/90 bg-white hover:border-blue-300 hover:bg-slate-50/50"
                    }`}
                  >
                    {/* Left: Circle with Letter */}
                    <div className="flex items-center gap-3.5 flex-1 pr-3">
                      <span
                        className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                          isSelected
                            ? "bg-[#087BFF] text-white shadow-sm"
                            : darkMode
                            ? "bg-[#223152] text-slate-300"
                            : "bg-[#f1f5f9] text-[#475569]"
                        }`}
                      >
                        {letters[idx]}
                      </span>
                      <span
                        className={`text-[13.5px] sm:text-[14px] leading-relaxed transition-colors ${
                          isSelected
                            ? darkMode
                              ? "text-white font-medium"
                              : "text-[#1e293b] font-medium"
                            : darkMode
                            ? "text-slate-200"
                            : "text-[#1e293b]"
                        }`}
                      >
                        {option}
                      </span>
                    </div>

                    {/* Right: Radio/Checkbox Indicator */}
                    <div className="shrink-0">
                      {question.multiple ? (
                        /* Checkbox */
                        <div
                          className={`h-5 w-5 rounded-md flex items-center justify-center border-2 transition-all ${
                            isSelected
                              ? "bg-[#087BFF] border-[#087BFF] text-white"
                              : darkMode
                              ? "border-slate-600 bg-[#17223b]"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                        </div>
                      ) : (
                        /* Radio Circle */
                        <div
                          className={`h-5 w-5 rounded-full flex items-center justify-center border-2 transition-all ${
                            isSelected
                              ? "border-[#087BFF]"
                              : darkMode
                              ? "border-slate-600"
                              : "border-slate-300"
                          }`}
                        >
                          {isSelected && (
                            <span className="h-2.5 w-2.5 rounded-full bg-[#087BFF]" />
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div
              className={`mt-8 pt-5 border-t flex items-center justify-between gap-4 ${
                darkMode ? "border-slate-800" : "border-slate-100"
              }`}
            >
              <button
                type="button"
                onClick={handlePrev}
                disabled={current === 0}
                className={`inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-[13px] font-bold transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                  darkMode
                    ? "border-slate-700 bg-[#17223b] text-slate-200 hover:bg-[#1f2d4e]"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-xl bg-[#087BFF] hover:bg-[#006ef0] text-white px-6 py-2.5 text-[13px] font-bold transition-all shadow-md shadow-blue-500/25 hover:-translate-y-0.5 cursor-pointer"
              >
                {current === questions.length - 1 ? "Finish & Submit" : "Next Question"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
