"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Clock3, FileText, RotateCcw, Send, Trophy } from "lucide-react";
import type { CloudPaperSection } from "../../data/cloudComputing";
import type { Question } from "../../data/questions";

const PAPER_SECONDS = 2 * 60 * 60;

function formatTime(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function gradeText(answer: string, rubric: CloudPaperSection["questions"][number]["rubric"]) {
  const normalized = answer.toLowerCase().replace(/\s+/g, " ");
  return rubric.reduce((total, criterion) => {
    const matched = criterion.keywords.some((keyword) =>
      normalized.includes(keyword.toLowerCase())
    );
    return total + (matched ? criterion.marks : 0);
  }, 0);
}

type CloudPaperRunnerProps = {
  questions: Question[];
  sections: CloudPaperSection[];
  onExit: () => void;
};

export function CloudPaperRunner({ questions, sections, onExit }: CloudPaperRunnerProps) {
  const [finished, setFinished] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(PAPER_SECONDS);
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>({});

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

  const results = useMemo(() => {
    const mcqCorrect = questions.reduce(
      (total, question) =>
        total +
        (answers[question.id]?.length === question.correct.length &&
        answers[question.id]?.every((value) => question.correct.includes(value))
          ? 1
          : 0),
      0
    );
    const writtenScore = sections.reduce(
      (total, section) =>
        total +
        section.questions.reduce(
          (sectionTotal, question) =>
            sectionTotal + gradeText(writtenAnswers[question.id] || "", question.rubric),
          0
        ),
      0
    );
    return { mcqCorrect, writtenScore, total: mcqCorrect + writtenScore };
  }, [answers, questions, sections, writtenAnswers]);

  function chooseAnswer(question: Question, option: number) {
    setAnswers((current) => ({ ...current, [question.id]: [option] }));
  }

  function reset() {
    setAnswers({});
    setWrittenAnswers({});
    setRemainingSeconds(PAPER_SECONDS);
    setFinished(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (finished) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#f1edff_0%,#ffffff_55%,#f7f5ff_100%)] px-4 py-8 text-[#192136] sm:px-8">
        <div className="mx-auto max-w-[920px]">
          <header className="flex items-center justify-between border-b border-[#e6e9f1] pb-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#7B4DFF] text-white"><Trophy className="h-5 w-5" /></span>
              <div><p className="text-xs font-bold tracking-widest text-[#7B4DFF]">IT4090 · RESULTS</p><h1 className="text-xl font-black">Cloud Computing Model Paper V1</h1></div>
            </div>
            <button type="button" onClick={onExit} className="rounded-full border border-[#dfe2eb] bg-white px-4 py-2 text-xs font-bold">Exit</button>
          </header>
          <section className="mt-8 rounded-3xl bg-white p-8 text-center shadow-[0_15px_45px_rgba(74,49,160,0.12)] ring-1 ring-[#e6e9f1]">
            <p className="text-sm font-bold text-[#7B4DFF]">YOUR AUTOMATIC SCORE</p>
            <p className="mt-2 text-6xl font-black text-[#192136]">{results.total}<span className="text-2xl text-[#9aa2b6]">/100</span></p>
            <p className="mt-3 text-sm text-[#75809a]">{results.mcqCorrect}/20 MCQs correct · {results.writtenScore}/80 structured marks</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-full bg-[#7B4DFF] px-5 py-3 text-sm font-bold text-white"><RotateCcw className="h-4 w-4" /> Try again</button>
              <button type="button" onClick={onExit} className="rounded-full border border-[#dfe2eb] px-5 py-3 text-sm font-bold text-[#47516a]">Back to subjects</button>
            </div>
          </section>
          <div className="mt-6 rounded-2xl bg-white p-5 text-sm leading-relaxed text-[#5f6b83] ring-1 ring-[#e6e9f1]">
            Structured answers are marked against the model-answer concepts from the supplied answer paper. Each matching rubric point earns its assigned marks; review your wording and concepts before using the score as an exam prediction.
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-[#192136]">
      <header className="sticky top-0 z-20 border-b border-[#e6e9f1] bg-white/95 px-4 py-3 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4">
          <button type="button" onClick={onExit} className="inline-flex items-center gap-2 text-sm font-bold text-[#5d6880]"><ArrowLeft className="h-4 w-4" /> Exit</button>
          <div className="hidden text-center sm:block"><p className="text-[11px] font-black tracking-[0.18em] text-[#7B4DFF]">IT4090 · CLOUD COMPUTING</p><p className="text-sm font-bold">Model Paper Version 1</p></div>
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black ${remainingSeconds < 300 ? "bg-[#fff0f0] text-[#c44747]" : "bg-[#f0edff] text-[#6844e9]"}`}><Clock3 className="h-4 w-4" /> {formatTime(remainingSeconds)}</div>
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] px-4 py-7 sm:px-8">
        <section className="rounded-3xl bg-gradient-to-r from-[#382078] via-[#5532ac] to-[#7B4DFF] p-7 text-white shadow-[0_16px_36px_rgba(74,49,160,0.22)] sm:p-10">
          <div className="flex items-start gap-4"><FileText className="mt-1 h-8 w-8 shrink-0 text-[#d9ceff]" /><div><p className="text-xs font-black uppercase tracking-[0.18em] text-[#d9ceff]">2-hour practice paper · 100 marks</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Cloud Computing Model Paper V1</h1><p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">Answer the 20 MCQs and write structured answers in the boxes below. Your answers are marked automatically against the supplied model-answer concepts.</p></div></div>
        </section>

        <div className="mt-8 space-y-8">
          {sections.map((section, sectionIndex) => {
            const sectionQuestions = questions.slice(sectionIndex * 5, sectionIndex * 5 + 5);
            return (
              <section key={section.id} className="rounded-3xl bg-white p-5 shadow-[0_10px_35px_rgba(37,44,73,0.07)] ring-1 ring-[#e6e9f1] sm:p-8">
                <h2 className="text-xl font-black text-[#192136]">{section.title}</h2>
                {section.scenario && <p className="mt-4 rounded-2xl bg-[#f5f2ff] p-4 text-sm leading-relaxed text-[#5f4a9d]"><strong>Scenario:</strong> {section.scenario}</p>}
                <div className="mt-6 space-y-6">
                  <div><p className="mb-3 text-xs font-black uppercase tracking-widest text-[#7B4DFF]">Part A · MCQs (5 marks)</p><div className="grid gap-4 lg:grid-cols-2">{sectionQuestions.map((question, index) => <fieldset key={question.id} className="rounded-2xl border border-[#e6e9f1] p-4"><legend className="px-1 text-sm font-bold text-[#343e56]">{index + 1}. {question.prompt}</legend><div className="mt-3 space-y-2">{question.options.map((option, optionIndex) => <label key={option} className={`flex cursor-pointer items-start gap-2 rounded-xl border px-3 py-2 text-sm ${answers[question.id]?.includes(optionIndex) ? "border-[#9d85ff] bg-[#f6f3ff] text-[#5d3cce]" : "border-transparent bg-[#fafbfe] text-[#5f6b83]"}`}><input type="radio" name={`question-${question.id}`} checked={answers[question.id]?.includes(optionIndex) || false} onChange={() => chooseAnswer(question, optionIndex)} className="mt-1 accent-[#7B4DFF]" />{option}</label>)}</div></fieldset>)}</div></div>
                  <div><p className="mb-3 text-xs font-black uppercase tracking-widest text-[#7B4DFF]">Part B · Structured / Essay (20 marks)</p><div className="space-y-4">{section.questions.map((question) => <label key={question.id} className="block rounded-2xl border border-[#e6e9f1] p-4"><span className="flex justify-between gap-4 text-sm font-bold text-[#343e56]"><span>{question.title}: {question.prompt}</span><span className="shrink-0 rounded-full bg-[#f0edff] px-2 py-1 text-[10px] text-[#6844e9]">{question.marks} marks</span></span><textarea value={writtenAnswers[question.id] || ""} onChange={(event) => setWrittenAnswers((current) => ({ ...current, [question.id]: event.target.value }))} rows={5} placeholder="Write your answer here with the key concepts, comparisons, and examples..." className="mt-3 w-full resize-y rounded-xl border border-[#e1e4ed] bg-[#fafbfe] p-3 text-sm leading-relaxed text-[#343e56] outline-none transition focus:border-[#8e73f5] focus:ring-2 focus:ring-[#e8e2ff]" /></label>)}</div></div>
                </div>
              </section>
            );
          })}
        </div>
        <div className="mt-8 flex justify-end"><button type="button" onClick={() => setFinished(true)} className="inline-flex items-center gap-2 rounded-full bg-[#7B4DFF] px-7 py-3.5 text-sm font-black text-white shadow-[0_8px_20px_rgba(123,77,255,0.3)]"><Send className="h-4 w-4" /> Submit paper</button></div>
        <p className="mt-4 pb-8 text-center text-xs text-[#8c96aa]">The timer auto-submits when it reaches 00:00. You can revise any answer before submitting.</p>
      </div>
    </main>
  );
}
