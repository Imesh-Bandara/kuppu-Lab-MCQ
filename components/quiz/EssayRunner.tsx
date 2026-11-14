"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Clock3, FileText, RotateCcw, Send, Trophy } from "lucide-react";
import type { EssaySection } from "../../data/cloudComputing";

const ESSAY_SECONDS = 2 * 60 * 60;

function formatTime(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function gradeAnswer(answer: string, rubric: EssaySection["questions"][number]["rubric"]) {
  const text = answer.toLowerCase().replace(/\s+/g, " ");
  return rubric.reduce(
    (score, criterion) =>
      score + (criterion.keywords.some((keyword) => text.includes(keyword.toLowerCase())) ? criterion.marks : 0),
    0
  );
}

type EssayRunnerProps = {
  sections: EssaySection[];
  onExit: () => void;
};

export function EssayRunner({ sections, onExit }: EssayRunnerProps) {
  const [finished, setFinished] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(ESSAY_SECONDS);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    if (finished) return;
    const timer = window.setInterval(() => {
      setRemainingSeconds((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          setFinished(true);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [finished]);

  const result = useMemo(() => {
    const score = sections.reduce(
      (sectionTotal, section) =>
        sectionTotal +
        section.questions.reduce(
          (questionTotal, question) => questionTotal + gradeAnswer(answers[question.id] || "", question.rubric),
          0
        ),
      0
    );
    return { score, max: sections.reduce((total, section) => total + section.questions.reduce((sum, question) => sum + question.marks, 0), 0) };
  }, [answers, sections]);

  function reset() {
    setAnswers({});
    setRemainingSeconds(ESSAY_SECONDS);
    setFinished(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (finished) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#f1edff_0%,#ffffff_55%,#f7f5ff_100%)] px-4 py-8 text-[#192136] sm:px-8">
        <div className="mx-auto max-w-[920px]">
          <header className="flex items-center justify-between border-b border-[#e6e9f1] pb-5">
            <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#7B4DFF] text-white"><Trophy className="h-5 w-5" /></span><div><p className="text-xs font-bold tracking-widest text-[#7B4DFF]">IT4090 · ESSAY RESULTS</p><h1 className="text-xl font-black">Focused Essay Practice Set</h1></div></div>
            <button type="button" onClick={onExit} className="rounded-full border border-[#dfe2eb] bg-white px-4 py-2 text-xs font-bold">Exit</button>
          </header>
          <section className="mt-8 rounded-3xl bg-white p-8 text-center shadow-[0_15px_45px_rgba(74,49,160,0.12)] ring-1 ring-[#e6e9f1]">
            <p className="text-sm font-bold text-[#7B4DFF]">AUTOMATIC CONCEPT SCORE</p><p className="mt-2 text-6xl font-black">{result.score}<span className="text-2xl text-[#9aa2b6]">/{result.max}</span></p>
            <p className="mt-3 text-sm text-[#75809a]">Your score is based on matching important model-answer concepts. Use it as practice feedback, not as a replacement for lecturer marking.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3"><button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-full bg-[#7B4DFF] px-5 py-3 text-sm font-bold text-white"><RotateCcw className="h-4 w-4" /> Try again</button><button type="button" onClick={onExit} className="rounded-full border border-[#dfe2eb] px-5 py-3 text-sm font-bold text-[#47516a]">Back to Cloud Computing</button></div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-[#192136]">
      <header className="sticky top-0 z-20 border-b border-[#e6e9f1] bg-white/95 px-4 py-3 backdrop-blur sm:px-8"><div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4"><button type="button" onClick={onExit} className="inline-flex items-center gap-2 text-sm font-bold text-[#5d6880]"><ArrowLeft className="h-4 w-4" /> Exit</button><div className="hidden text-center sm:block"><p className="text-[11px] font-black tracking-[0.18em] text-[#7B4DFF]">IT4090 · CLOUD COMPUTING</p><p className="text-sm font-bold">Focused Essay Practice Set</p></div><div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black ${remainingSeconds < 300 ? "bg-[#fff0f0] text-[#c44747]" : "bg-[#f0edff] text-[#6844e9]"}`}><Clock3 className="h-4 w-4" /> {formatTime(remainingSeconds)}</div></div></header>
      <div className="mx-auto max-w-[1180px] px-4 py-7 sm:px-8">
        <section className="rounded-3xl bg-gradient-to-r from-[#382078] via-[#5532ac] to-[#7B4DFF] p-7 text-white shadow-[0_16px_36px_rgba(74,49,160,0.22)] sm:p-10"><div className="flex items-start gap-4"><FileText className="mt-1 h-8 w-8 shrink-0 text-[#d9ceff]" /><div><p className="text-xs font-black uppercase tracking-[0.18em] text-[#d9ceff]">2-hour practice · 100 marks · no MCQs</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Focused Essay Questions Set</h1><p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80">Pure exam-level essay practice covering scenario-based design, migration, security, IAM, microservices, containers, Kubernetes, IaC, Well-Architected principles, and multi-cloud integration.</p></div></div></section>
        <div className="mt-8 space-y-8">{sections.map((section) => <section key={section.id} className="rounded-3xl bg-white p-5 shadow-[0_10px_35px_rgba(37,44,73,0.07)] ring-1 ring-[#e6e9f1] sm:p-8"><h2 className="text-xl font-black">{section.title}</h2><p className="mt-4 rounded-2xl bg-[#f5f2ff] p-4 text-sm leading-relaxed text-[#5f4a9d]"><strong>Scenario:</strong> {section.scenario}</p><div className="mt-6 space-y-4">{section.questions.map((question) => <label key={question.id} className="block rounded-2xl border border-[#e6e9f1] p-4"><span className="flex justify-between gap-4 text-sm font-bold text-[#343e56]"><span>{question.title}: {question.prompt}</span><span className="shrink-0 rounded-full bg-[#f0edff] px-2 py-1 text-[10px] text-[#6844e9]">{question.marks} marks</span></span><textarea value={answers[question.id] || ""} onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))} rows={7} placeholder="Write a structured exam answer with headings, comparisons, explanations, and examples..." className="mt-3 w-full resize-y rounded-xl border border-[#e1e4ed] bg-[#fafbfe] p-3 text-sm leading-relaxed text-[#343e56] outline-none transition focus:border-[#8e73f5] focus:ring-2 focus:ring-[#e8e2ff]" /></label>)}</div></section>)}</div>
        <div className="mt-8 flex justify-end"><button type="button" onClick={() => setFinished(true)} className="inline-flex items-center gap-2 rounded-full bg-[#7B4DFF] px-7 py-3.5 text-sm font-black text-white shadow-[0_8px_20px_rgba(123,77,255,0.3)]"><Send className="h-4 w-4" /> Submit essay set</button></div><p className="mt-4 pb-8 text-center text-xs text-[#8c96aa]">The timer auto-submits at 00:00. You can revise all answers before submitting.</p>
      </div>
    </main>
  );
}
