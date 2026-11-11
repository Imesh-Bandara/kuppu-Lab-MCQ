"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileQuestion,
  Lightbulb,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Navbar } from "../../../components/landing/Navbar";
import { BrandLogo } from "../../../components/landing/BrandLogo";
import { QuizRunner } from "../../../components/quiz/QuizRunner";
import { questionsV1, questionsV2, subjectVersions } from "../../../data/questions";

export default function InnovationManagementPage() {
  const [selectedVersion, setSelectedVersion] = useState<"v1" | "v2" | null>(null);

  // If user selected Version 1, launch the quiz runner with existing MCQs
  if (selectedVersion === "v1") {
    return (
      <QuizRunner
        questions={questionsV1}
        subjectTitle="INNOVATION MANAGEMENT & ENTREPRENEURSHIP"
        versionName="VERSION 1"
        onExit={() => setSelectedVersion(null)}
      />
    );
  }

  // If user selected Version 2, if questions exist use them, otherwise show placeholder
  if (selectedVersion === "v2" && questionsV2.length > 0) {
    return (
      <QuizRunner
        questions={questionsV2}
        subjectTitle="INNOVATION MANAGEMENT & ENTREPRENEURSHIP"
        versionName="VERSION 2"
        onExit={() => setSelectedVersion(null)}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_40%,#f5f9ff_75%,#ffffff_100%)] text-[#062B50]">
      {/* Background soft glow */}
      <div className="pointer-events-none absolute left-[-80px] top-24 h-64 w-64 rounded-full bg-[#cfe4ff]/60 blur-3xl" />
      <div className="pointer-events-none absolute right-[-80px] top-40 h-72 w-72 rounded-full bg-[#dbeafe]/50 blur-3xl" />

      {/* Floating Navbar */}
      <Navbar activeTab="practice" />

      <main className="mx-auto w-[min(94%,1120px)] pb-16 pt-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#062B50] shadow-sm ring-1 ring-[#e2e8f0] transition hover:bg-[#f8fafc] hover:text-[#087BFF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <span className="text-[12px] font-medium text-[#64748B]">
            Subjects &gt; Innovation Management &gt; Versions
          </span>
        </div>

        {/* Hero Banner for Subject */}
        <section className="relative overflow-hidden rounded-[26px] bg-gradient-to-r from-[#062B50] via-[#083562] to-[#0A437C] px-8 py-10 sm:px-12 sm:py-12 text-white shadow-[0_16px_36px_rgba(6,43,80,0.18)]">
          <div className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 opacity-10 hidden md:block">
            <Lightbulb className="h-56 w-56" />
          </div>

          <div className="relative z-10 max-w-[700px]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1 text-[11px] font-bold tracking-wide uppercase text-white/90 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#38BDF8]" />
              Subject Practice Platform
            </span>

            <h1 className="mt-3 text-[30px] sm:text-[38px] lg:text-[42px] font-black leading-tight tracking-tight text-white">
              Innovation Management &amp; Entrepreneurship
            </h1>

            <p className="mt-3 text-[14.5px] sm:text-[16px] leading-relaxed text-white/85">
              Select your question paper version below to start your timed practice exam.
              Test your knowledge on Innovation Models, Drucker&apos;s Sources, Stage-Gate Pipelines,
              IPR, and Entrepreneurial Strategy.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-[13px] text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#38BDF8]" /> 60 Minutes per paper
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <FileQuestion className="h-4 w-4 text-[#38BDF8]" /> Single &amp; Multi-select MCQs
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-[#38BDF8]" /> Instant grading &amp; reviews
              </span>
            </div>
          </div>
        </section>

        {/* Section Heading */}
        <section className="py-10 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-[2.5px] w-12 rounded-full bg-[#087BFF]" />
            <h2 className="text-[26px] sm:text-[30px] font-black tracking-tight text-[#062B50]">
              Select Paper Version
            </h2>
            <span className="h-[2.5px] w-12 rounded-full bg-[#087BFF]" />
          </div>
          <p className="mt-2 text-[14px] text-[#5b7393]">
            Choose a version to begin your practice session
          </p>
        </section>

        {/* Version Selection Grid */}
        <div className="grid gap-6 md:grid-cols-2 max-w-[960px] mx-auto">
          {/* Card: Version 1 */}
          <div className="relative flex flex-col justify-between rounded-[24px] bg-white p-7 sm:p-8 shadow-[0_12px_32px_rgba(6,43,80,0.08)] ring-2 ring-[#087BFF]/30 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(6,43,80,0.14)]">
            <div className="absolute -top-3.5 right-6 rounded-full bg-[#087BFF] px-3.5 py-1 text-[11px] font-black text-white shadow-md uppercase tracking-wider">
              Ready to Practice
            </div>

            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#087BFF] text-white shadow-[0_6px_16px_rgba(8,123,255,0.3)]">
                  <span className="text-[17px] font-black">V1</span>
                </span>
                <div>
                  <h3 className="text-[22px] font-black text-[#062B50]">Version 1</h3>
                  <p className="text-[12.5px] font-semibold text-[#087BFF]">
                    Comprehensive 25 MCQ Exam Paper
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[14px] leading-relaxed text-[#4A627E]">
                Contains the complete 25 MCQ exam paper covering Lecture 1 (Introduction &amp;
                Drucker&apos;s Sources), Lecture 2 (Innovation Techniques &amp; IPR), Lecture 3 (Pipelines),
                Lecture 4 (New Product Development), and Lecture 5 (Entrepreneurship).
              </p>

              <div className="mt-5 space-y-2 border-t border-[#edf2f9] pt-4 text-[13px] text-[#334D6E]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#12B76A]" />
                  <span><strong>25 MCQs</strong> with single &amp; multi-select</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#12B76A]" />
                  <span><strong>60 Minutes</strong> real-time exam countdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#12B76A]" />
                  <span><strong>Instant feedback</strong> &amp; detailed answer breakdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#12B76A]" />
                  <span><strong>50 Marks Total</strong> with scoring analytics</span>
                </div>
              </div>
            </div>

            <div className="mt-7 pt-4 border-t border-[#edf2f9]">
              <button
                type="button"
                onClick={() => setSelectedVersion("v1")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#087BFF] hover:bg-[#006ef0] px-6 py-3.5 text-[14.5px] font-bold text-white shadow-[0_8px_20px_rgba(8,123,255,0.3)] transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                Start Practicing Version 1
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Card: Version 2 */}
          <div className="relative flex flex-col justify-between rounded-[24px] bg-white p-7 sm:p-8 shadow-[0_12px_32px_rgba(6,43,80,0.08)] ring-2 ring-[#7B4DFF]/30 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(6,43,80,0.14)]">
            <div className="absolute -top-3.5 right-6 rounded-full bg-[#7B4DFF] px-3.5 py-1 text-[11px] font-black text-white shadow-md uppercase tracking-wider">
              Hard – Application Based
            </div>

            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#7B4DFF] text-white shadow-[0_6px_16px_rgba(123,77,255,0.3)]">
                  <span className="text-[17px] font-black">V2</span>
                </span>
                <div>
                  <h3 className="text-[22px] font-black text-[#062B50]">Version 2</h3>
                  <p className="text-[12.5px] font-semibold text-[#7B4DFF]">
                    Scenario-Based 25 MCQ Exam Paper
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[14px] leading-relaxed text-[#4A627E]">
                Hard application-based exam paper with real-world scenarios. Covers Innovation Types,
                Knowledge Management, IPR, Creativity Barriers, House of Quality, Stage-Gate Process,
                and Entrepreneurial Risks &amp; Skills.
              </p>

              <div className="mt-5 space-y-2 border-t border-[#edf2f9] pt-4 text-[13px] text-[#334D6E]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#12B76A]" />
                  <span><strong>25 MCQs</strong> with single &amp; multi-select</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#12B76A]" />
                  <span><strong>50 Marks</strong> total — scenario-driven questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#12B76A]" />
                  <span><strong>60 Minutes</strong> real-time exam countdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#12B76A]" />
                  <span><strong>Instant feedback</strong> &amp; detailed answer breakdown</span>
                </div>
              </div>
            </div>

            <div className="mt-7 pt-4 border-t border-[#edf2f9]">
              <button
                type="button"
                onClick={() => setSelectedVersion("v2")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#7B4DFF] hover:bg-[#6a3de8] px-6 py-3.5 text-[14.5px] font-bold text-white shadow-[0_8px_20px_rgba(123,77,255,0.3)] transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                Start Practicing Version 2
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="mx-auto flex w-[min(94%,1120px)] flex-wrap items-center justify-between gap-4 border-t border-[#edf2f9] pb-8 pt-6">
        <BrandLogo size="footer" />
        <p className="text-[13px] font-medium text-[#5b7393]">
          © 2026 KUPPI LAB. All rights reserved.
        </p>
        <span className="text-[12px] font-semibold text-[#087BFF]">
          Innovation Management &amp; Entrepreneurship
        </span>
      </footer>
    </div>
  );
}

