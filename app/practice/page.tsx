import Link from "next/link";
import { ArrowLeft, ArrowRight, Cloud, Lightbulb, Sparkles } from "lucide-react";
import { BrandLogo } from "../../components/landing/BrandLogo";
import { Navbar } from "../../components/landing/Navbar";

const subjects = [
  {
    name: "Innovation Management & Entrepreneurship",
    description: "Practice Version 1 and Version 2 MCQ papers covering innovation, creativity, IPR, NPD, and entrepreneurship.",
    href: "/subjects/innovation-management-and-entrepreneurship",
    icon: Lightbulb,
    color: "bg-[#087BFF]",
  },
  {
    name: "Cloud Computing",
    description: "Practice MCQs, the full IT4090 model paper, and focused essay questions on cloud architecture and security.",
    href: "/subjects/cloud-computing",
    icon: Cloud,
    color: "bg-[#7B4DFF]",
  },
];

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_45%,#f7f5ff_100%)] text-[#062B50]">
      <Navbar activeTab="practice" />
      <main className="mx-auto w-[min(94%,1120px)] pb-16 pt-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold shadow-sm ring-1 ring-[#e2e8f0]">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <section className="mt-6 rounded-[26px] bg-gradient-to-r from-[#062B50] via-[#083562] to-[#5532ac] px-8 py-10 text-white shadow-[0_16px_36px_rgba(6,43,80,0.18)] sm:px-12 sm:py-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
            <Sparkles className="h-3.5 w-3.5 text-[#8fc8ff]" /> Practice Centre
          </span>
          <h1 className="mt-4 text-3xl font-black sm:text-5xl">Choose a Subject</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            Select the subject you want to practice. Each subject has its own papers, timer, questions, and results.
          </p>
        </section>

        <section className="py-10 text-center">
          <h2 className="text-2xl font-black sm:text-3xl">Select Your Subject</h2>
          <p className="mt-2 text-sm text-[#5b7393]">Choose one to start your practice session</p>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <Link
                key={subject.name}
                href={subject.href}
                className="group rounded-[24px] bg-white p-7 shadow-[0_12px_32px_rgba(6,43,80,0.08)] ring-1 ring-[#e8eff8] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(6,43,80,0.14)]"
              >
                <span className={`grid h-16 w-16 place-items-center rounded-2xl ${subject.color} text-white shadow-[0_8px_18px_rgba(6,43,80,0.16)]`}>
                  <Icon className="h-8 w-8" />
                </span>
                <h3 className="mt-6 text-2xl font-black">{subject.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5b7393]">{subject.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#087BFF] transition group-hover:gap-3">
                  Start {subject.name.split(" ")[0]} Practice <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </main>
      <footer className="mx-auto flex w-[min(94%,1120px)] items-center justify-between border-t border-[#e8eff8] px-3 pb-8 pt-6">
        <BrandLogo size="footer" />
        <p className="text-xs font-medium text-[#5b7393]">Choose a subject and start learning.</p>
      </footer>
    </div>
  );
}
