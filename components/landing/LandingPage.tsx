"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Cloud,
  Globe,
  Lightbulb,
  ListChecks,
  Play,
  Target,
  TrendingUp,
  Trophy,
  UserRound,
  Zap,
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { HeroScene } from "./HeroScene";
import { Navbar } from "./Navbar";

type LandingPageProps = {
  onStart?: () => void;
};

function YoutubeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LinkedinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37h2.79V10.9H6.46M7.86 6.3a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5z" />
    </svg>
  );
}

const features = [
  { icon: Target, title: "Smart Practice", copy: "Practice with high-quality MCQs" },
  { icon: TrendingUp, title: "Track Progress", copy: "Monitor your performance" },
  { icon: Trophy, title: "Achieve More", copy: "Be ready for exams" },
  { icon: Zap, title: "Anytime, Anywhere", copy: "Learn at your own pace" },
];

const subjects = [
  {
    name: "Innovation Management and Entrepreneurship",
    href: "/subjects/innovation-management-and-entrepreneurship",
    icon: Lightbulb,
    color: "bg-[#087BFF]",
    available: true,
  },
  {
    name: "Cloud Computing",
    href: "#subjects",
    icon: Cloud,
    color: "bg-[#7B4DFF]",
    available: false,
  },
];


export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_40%,#f5f9ff_75%,#ffffff_100%)] text-[#062B50]">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute left-[-80px] top-24 h-64 w-64 rounded-full bg-[#cfe4ff]/60 blur-3xl" />
      <Navbar onStart={onStart} />

      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="relative mx-auto grid w-[min(94%,1180px)] items-center gap-8 pb-8 pt-8 lg:grid-cols-[1.08fr_0.92fr] lg:pt-12"
        >
          <div className="max-w-[540px]">
            <p className="text-[12.5px] font-extrabold tracking-[0.22em] text-[#087BFF] uppercase">
              LEARN <span className="mx-1 text-[#087BFF]/70">•</span> PRACTICE <span className="mx-1 text-[#087BFF]/70">•</span> EXCEL
            </p>
            <h1 className="mt-3 text-[46px] font-black leading-[0.98] tracking-[-0.04em] text-[#062B50] sm:text-[58px] lg:text-[62px]">
              KUPPI LAB
            </h1>
            <h2 className="mt-2 text-[28px] font-black leading-tight tracking-[-0.03em] sm:text-[38px] lg:text-[42px]">
              <span className="text-[#087BFF]">MCQ</span>{" "}
              <span className="text-[#062B50]">Practice Platform</span>
            </h2>
            <p className="mt-4 max-w-[430px] text-[15px] sm:text-[16px] leading-[1.6] text-[#475F7B]">
              Sharpen your knowledge with our smart MCQ practice system and take your{" "}
              <strong className="font-extrabold text-[#062B50]">learning to the next level!</strong>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                href="/subjects/innovation-management-and-entrepreneurship"
                className="inline-flex items-center gap-2 rounded-full bg-[#062B50] px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(6,43,80,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#031d36]"
              >
                Start Practicing Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#about"
                className="inline-flex items-center gap-2.5 text-[14px] font-semibold text-[#062B50] transition hover:text-[#087BFF]"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full border border-[#D5E3F5] bg-white text-[#062B50] shadow-sm">
                  <Play className="h-3.5 w-3.5 fill-[#062B50] translate-x-0.5" />
                </span>
                Watch Demo
              </a>
            </div>
          </div>
          <HeroScene />
        </section>

        {/* 4 Features Row */}
        <section id="practice" className="relative z-10 mx-auto w-[min(94%,1120px)] -mt-2">
          <div className="grid rounded-[22px] bg-white py-6 shadow-[0_12px_36px_rgba(6,43,80,0.06)] ring-1 ring-[#e8eff8] grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`flex flex-col items-center px-4 py-2 text-center ${
                    index < features.length - 1 ? "lg:border-r lg:border-[#e8eff8]" : ""
                  } ${index % 2 === 0 ? "border-r border-[#e8eff8] lg:border-r" : ""}`}
                >
                  <Icon className="h-6 w-6 text-[#087BFF]" strokeWidth={2.4} />
                  <h3 className="mt-2.5 text-[15px] font-extrabold text-[#062B50]">{feature.title}</h3>
                  <p className="mt-1 max-w-[170px] text-[12px] leading-relaxed text-[#5b7393]">{feature.copy}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Explore Subjects */}
        <section id="subjects" className="mx-auto w-[min(94%,1120px)] py-14 sm:py-16 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-[2.5px] w-12 rounded-full bg-[#087BFF]" />
            <h2 className="text-[28px] sm:text-[32px] font-black tracking-tight text-[#062B50]">
              Explore Subjects
            </h2>
            <span className="h-[2.5px] w-12 rounded-full bg-[#087BFF]" />
          </div>
          <p className="mt-2 text-[14px] text-[#5b7393]">
            Choose your subject and start practicing
          </p>

          {/* Subject cards — same style as reference screenshot */}
          <div className="mt-8 grid gap-5 grid-cols-1 sm:grid-cols-2 max-w-[760px] mx-auto">
            {subjects.map((subject) => {
              const Icon = subject.icon;
              const CardContent = (
                <div
                  className={`group relative flex flex-col rounded-[20px] bg-white px-6 pt-7 pb-6 shadow-[0_4px_20px_rgba(6,43,80,0.07)] ring-1 ring-[#e8eff8] text-left transition-all duration-200 ${
                    subject.available
                      ? "hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(6,43,80,0.11)] cursor-pointer"
                      : "opacity-85 cursor-default"
                  }`}
                >
                  {/* Circular icon */}
                  <span
                    className={`mb-5 inline-grid h-[62px] w-[62px] place-items-center rounded-full text-white ${subject.color} shadow-[0_6px_14px_rgba(6,43,80,0.14)] transition-transform duration-200 group-hover:scale-105`}
                  >
                    <Icon className="h-7 w-7" strokeWidth={2} />
                  </span>

                  {/* Subject name */}
                  <h3 className="text-[17px] sm:text-[18px] font-black leading-snug text-[#062B50]">
                    {subject.name}
                  </h3>

                  {/* Practice Now link */}
                  <span
                    className={`mt-3 inline-flex items-center gap-1 text-[13.5px] font-semibold ${
                      subject.available
                        ? "text-[#087BFF] group-hover:gap-2 transition-all"
                        : "text-[#94a3b8]"
                    }`}
                  >
                    {subject.available ? "Practice Now" : "Coming Soon"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              );

              if (subject.available) {
                return (
                  <Link key={subject.name} href={subject.href} className="block">
                    {CardContent}
                  </Link>
                );
              }

              return <div key={subject.name}>{CardContent}</div>;
            })}
          </div>
        </section>

        {/* How It Works */}
        <section id="about" className="mx-auto w-[min(94%,1120px)] py-4">
          <div className="grid items-center gap-8 rounded-[24px] bg-[#E2EEFE] px-7 py-9 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-10">
            <div>
              <span className="mb-3 block h-[3px] w-10 rounded-full bg-[#087BFF]" />
              <h2 className="text-[30px] sm:text-[34px] font-black tracking-tight text-[#062B50]">
                How It Works?
              </h2>
              <p className="mt-2.5 max-w-[280px] text-[14px] leading-relaxed text-[#3d5b80]">
                Just a few simple steps to start your practice journey.
              </p>
              <Link
                href="/subjects/innovation-management-and-entrepreneurship"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#062B50] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_18px_rgba(6,43,80,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#031d36]"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex items-center justify-between gap-2 sm:gap-4">
              {/* Step 1 */}
              <div className="flex flex-1 flex-col items-center text-center">
                <span className="mb-3 grid h-13 w-13 place-items-center rounded-full bg-white text-[#087BFF] shadow-[0_6px_16px_rgba(8,123,255,0.14)]">
                  <UserRound className="h-6 w-6" strokeWidth={2.2} />
                </span>
                <strong className="text-[13.5px] font-extrabold text-[#062B50]">1. Sign Up</strong>
                <p className="mt-1 text-[11.5px] leading-tight text-[#4b678a]">
                  Create your<br />free account
                </p>
              </div>

              <ArrowRight className="h-5 w-5 shrink-0 text-[#087BFF] -mt-5" strokeWidth={2.2} />

              {/* Step 2 */}
              <div className="flex flex-1 flex-col items-center text-center">
                <span className="mb-3 grid h-13 w-13 place-items-center rounded-full bg-white text-[#087BFF] shadow-[0_6px_16px_rgba(8,123,255,0.14)]">
                  <ListChecks className="h-6 w-6" strokeWidth={2.2} />
                </span>
                <strong className="text-[13.5px] font-extrabold text-[#062B50]">2. Choose Subject</strong>
                <p className="mt-1 text-[11.5px] leading-tight text-[#4b678a]">
                  Pick what you<br />want to practice
                </p>
              </div>

              <ArrowRight className="h-5 w-5 shrink-0 text-[#087BFF] -mt-5" strokeWidth={2.2} />

              {/* Step 3 */}
              <div className="flex flex-1 flex-col items-center text-center">
                <div className="relative mb-3">
                  {/* Blue accent marks above step 3 */}
                  <svg
                    className="absolute -right-3 -top-2.5 h-4 w-4 text-[#087BFF]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  >
                    <line x1="8" y1="2" x2="6" y2="7" />
                    <line x1="16" y1="6" x2="12" y2="10" />
                    <line x1="22" y1="14" x2="17" y2="13" />
                  </svg>
                  <span className="grid h-13 w-13 place-items-center rounded-full bg-[#087BFF] text-white shadow-[0_8px_20px_rgba(8,123,255,0.35)]">
                    <Check className="h-6 w-6 stroke-[3]" />
                  </span>
                </div>
                <strong className="text-[13.5px] font-extrabold text-[#062B50]">3. Start Practicing</strong>
                <p className="mt-1 text-[11.5px] leading-tight text-[#4b678a]">
                  Answer MCQs &<br />track your score
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ready to Boost Your Knowledge Banner */}
        <section id="contact" className="mx-auto w-[min(94%,1120px)] py-8">
          <div className="relative overflow-hidden rounded-[24px] bg-[#072146] px-8 py-9 sm:py-10 text-white lg:px-12 shadow-[0_16px_36px_rgba(6,43,80,0.18)]">
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 hidden sm:flex items-center justify-end pr-2 lg:pr-8">
              <Image
                src="/banner-art-perfect@2x.png"
                alt="Graduation cap and open book line art"
                width={564}
                height={216}
                className="h-[88%] w-auto object-contain opacity-95"
              />
            </div>

            <h2 className="relative max-w-[620px] text-[26px] sm:text-[32px] font-black tracking-tight text-white">
              Ready to Boost Your Knowledge?
            </h2>
            <p className="relative mt-2 text-[14px] sm:text-[15px] text-white/85">
              Join KUPPI LAB today and start practicing smarter!
            </p>
            <Link
              href="/subjects/innovation-management-and-entrepreneurship"
              className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-[#087BFF] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(8,123,255,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[#006ef0]"
            >
              Start Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mx-auto flex w-[min(94%,1120px)] flex-wrap items-center justify-between gap-4 pb-8 pt-2">
        <BrandLogo size="footer" />
        <p className="text-[13px] text-[#5b7393] font-medium">
          © 2026 KUPPI LAB. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-[#062B50]">
          <a href="#home" aria-label="YouTube" className="transition hover:text-[#087BFF]">
            <YoutubeIcon className="h-5 w-5" />
          </a>
          <a href="#home" aria-label="LinkedIn" className="transition hover:text-[#087BFF]">
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a href="#home" aria-label="Website" className="transition hover:text-[#087BFF]">
            <Globe className="h-5 w-5" />
          </a>
        </div>
      </footer>
    </div>
  );
}
