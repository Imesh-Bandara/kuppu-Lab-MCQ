"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Clock3, FileText, Monitor, Sparkles } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "../../../components/landing/BrandLogo";
import { Navbar } from "../../../components/landing/Navbar";
import { CloudPaperRunner } from "../../../components/quiz/CloudPaperRunner";
import { EssayRunner } from "../../../components/quiz/EssayRunner";
import { QuizRunner } from "../../../components/quiz/QuizRunner";
import { cloudEssaySections, cloudPaperSections, cloudQuestions } from "../../../data/cloudComputing";

type Mode = "menu" | "mcq" | "paper" | "essay";

export default function CloudComputingPage() {
  const [mode, setMode] = useState<Mode>("menu");

  if (mode === "mcq") {
    return <QuizRunner questions={cloudQuestions} subjectTitle="CLOUD COMPUTING" versionName="MODEL PAPER V1 · MCQ" durationMinutes={120} onExit={() => setMode("menu")} />;
  }

  if (mode === "paper") {
    return <CloudPaperRunner questions={cloudQuestions} sections={cloudPaperSections} onExit={() => setMode("menu")} />;
  }

  if (mode === "essay") {
    return <EssayRunner sections={cloudEssaySections} onExit={() => setMode("menu")} />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#f3efff_0%,#ffffff_45%,#f8f6ff_100%)] text-[#192136]">
      <div className="pointer-events-none absolute right-[-80px] top-32 h-72 w-72 rounded-full bg-[#dfd5ff]/60 blur-3xl" />
      <Navbar activeTab="practice" />
      <main className="mx-auto w-[min(94%,1120px)] pb-16 pt-8">
        <div className="flex items-center justify-between pb-6">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#192136] shadow-sm ring-1 ring-[#e6e9f1]"><ArrowLeft className="h-4 w-4" /> Back to Home</Link>
          <span className="hidden text-xs font-medium text-[#75809a] sm:block">Subjects &gt; Cloud Computing &gt; Practice</span>
        </div>
        <section className="relative overflow-hidden rounded-[26px] bg-gradient-to-r from-[#382078] via-[#5532ac] to-[#7B4DFF] px-8 py-10 text-white shadow-[0_16px_36px_rgba(74,49,160,0.2)] sm:px-12 sm:py-12">
          <Monitor className="pointer-events-none absolute right-10 top-1/2 hidden h-52 w-52 -translate-y-1/2 opacity-10 md:block" />
          <div className="relative max-w-[700px]"><span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide"><Sparkles className="h-3.5 w-3.5 text-[#d9ceff]" /> IT4090 Practice</span><h1 className="mt-4 text-3xl font-black sm:text-5xl">Cloud Computing</h1><p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">Prepare with the supplied Model Paper Version 1. Practice the MCQs, write structured answers, and receive an automatic score based on the model-answer concepts.</p><div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-white/85"><span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#d9ceff]" /> 2 hours</span><span className="inline-flex items-center gap-2"><BookOpen className="h-4 w-4 text-[#d9ceff]" /> 20 MCQs</span><span className="inline-flex items-center gap-2"><FileText className="h-4 w-4 text-[#d9ceff]" /> 80 structured marks</span></div></div>
        </section>
        <section className="py-10 text-center"><div className="flex items-center justify-center gap-4"><span className="h-0.5 w-12 rounded-full bg-[#7B4DFF]" /><h2 className="text-2xl font-black sm:text-3xl">Choose Your Practice Mode</h2><span className="h-0.5 w-12 rounded-full bg-[#7B4DFF]" /></div><p className="mt-2 text-sm text-[#75809a]">Both modes use the same 2-hour examination timer.</p></section>
        <div className="grid gap-6 md:grid-cols-3">
          <article className="flex flex-col justify-between rounded-3xl bg-white p-7 shadow-[0_12px_32px_rgba(74,49,160,0.08)] ring-2 ring-[#7B4DFF]/25">
            <div><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#7B4DFF] text-lg font-black text-white">MCQ</span><h3 className="mt-5 text-2xl font-black">MCQ Practice</h3><p className="mt-3 text-sm leading-relaxed text-[#5f6b83]">Answer all 20 questions from the paper topics: cloud concepts, IAM, monitoring, migration, cloud-native systems, containers, Kubernetes, and IaC.</p><ul className="mt-5 space-y-2 text-sm text-[#47516a]"><li>✓ 20 questions · 20 marks</li><li>✓ Single-select answers</li><li>✓ Instant score and review</li></ul></div><button type="button" onClick={() => setMode("mcq")} className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#7B4DFF] px-5 py-3.5 text-sm font-bold text-white">Start MCQ Practice <ArrowRight className="h-4 w-4" /></button>
          </article>
          <article className="flex flex-col justify-between rounded-3xl bg-white p-7 shadow-[0_12px_32px_rgba(74,49,160,0.08)] ring-2 ring-[#5532ac]/20">
            <div><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#5532ac] text-white"><FileText className="h-6 w-6" /></span><h3 className="mt-5 text-2xl font-black">Full Model Paper</h3><p className="mt-3 text-sm leading-relaxed text-[#5f6b83]">Complete the MCQs and use the structured text boxes for all essay parts. Submit once for a combined score out of 100.</p><ul className="mt-5 space-y-2 text-sm text-[#47516a]"><li>✓ MCQs + structured answers</li><li>✓ Text-box answer writing</li><li>✓ Automatic rubric-based marks</li></ul></div><button type="button" onClick={() => setMode("paper")} className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#5532ac] px-5 py-3.5 text-sm font-bold text-white">Open Full Paper <ArrowRight className="h-4 w-4" /></button>
          </article>
          <article className="flex flex-col justify-between rounded-3xl bg-white p-7 shadow-[0_12px_32px_rgba(74,49,160,0.08)] ring-2 ring-[#d946ef]/20">
            <div><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#d946ef] text-xs font-black text-white">ESSAY</span><h3 className="mt-5 text-2xl font-black">Essay Questions</h3><p className="mt-3 text-sm leading-relaxed text-[#5f6b83]">Pure essay practice based on the new exam-level set: architecture, migration, IAM, security, microservices, Kubernetes, IaC, Well-Architected Framework, and multi-cloud.</p><ul className="mt-5 space-y-2 text-sm text-[#47516a]"><li>✓ 4 scenarios · 16 essay parts</li><li>✓ 100 marks · no MCQs</li><li>✓ Concept-based automatic feedback</li></ul></div><button type="button" onClick={() => setMode("essay")} className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#d946ef] px-5 py-3.5 text-sm font-bold text-white">Start Essay Practice <ArrowRight className="h-4 w-4" /></button>
          </article>
        </div>
      </main>
      <footer className="mx-auto flex w-[min(94%,1120px)] flex-wrap items-center justify-between gap-4 border-t border-[#e6e9f1] pb-8 pt-6"><BrandLogo size="footer" /><p className="text-xs font-medium text-[#75809a]">© 2026 KUPPI LAB</p><span className="text-xs font-semibold text-[#7B4DFF]">Cloud Computing · IT4090</span></footer>
    </div>
  );
}
