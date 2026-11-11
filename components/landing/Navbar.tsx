"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

export const SUBJECT_NAV_ITEMS = [
  {
    name: "Innovation Management and Entrepreneurship",
    href: "/subjects/innovation-management-and-entrepreneurship",
    badge: "Available",
    badgeColor: "bg-[#eaf3ff] text-[#087BFF]",
  },
  {
    name: "Cloud Computing",
    href: "/#subjects",
    badge: "Coming Soon",
    badgeColor: "bg-[#f1f5f9] text-[#64748B]",
  },
];

type NavbarProps = {
  onStart?: () => void;
  activeTab?: "home" | "practice" | "subjects" | "about" | "contact";
};

export function Navbar({ onStart, activeTab = "home" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [subjectsOpen, setSubjectsOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 mx-auto w-[min(94%,1180px)]">
      <div className="flex items-center justify-between rounded-full bg-white px-3.5 py-2 shadow-[0_10px_30px_rgba(6,43,80,0.08)] ring-1 ring-[#e5effa]">
        <BrandLogo />

        <nav className="hidden items-center gap-7 lg:flex">
          <Link
            href="/"
            className={`rounded-full px-5 py-1.5 text-[13px] font-semibold transition ${
              activeTab === "home"
                ? "bg-[#062B50] text-white shadow-[0_4px_12px_rgba(6,43,80,0.22)]"
                : "text-[#2D4566] hover:text-[#087BFF]"
            }`}
          >
            Home
          </Link>

          <Link
            href="/subjects/innovation-management-and-entrepreneurship"
            className={`text-[13.5px] font-medium transition ${
              activeTab === "practice"
                ? "font-semibold text-[#087BFF]"
                : "text-[#2D4566] hover:text-[#087BFF]"
            }`}
          >
            Practice
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setSubjectsOpen(true)}
            onMouseLeave={() => setSubjectsOpen(false)}
          >
            <button
              type="button"
              className={`inline-flex items-center gap-1 text-[13.5px] font-medium transition cursor-pointer ${
                activeTab === "subjects"
                  ? "font-semibold text-[#087BFF]"
                  : "text-[#2D4566] hover:text-[#087BFF]"
              }`}
            >
              Subjects <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {subjectsOpen && (
              <div className="absolute left-1/2 top-full z-20 w-80 -translate-x-1/2 pt-3">
                <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-[0_16px_40px_rgba(6,43,80,0.14)] ring-1 ring-[#d7e6f7]">
                  {SUBJECT_NAV_ITEMS.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSubjectsOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-[#062B50] transition hover:bg-[#f3f8ff] hover:text-[#087BFF]"
                    >
                      <span className="truncate pr-2">{item.name}</span>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/#about"
            className="text-[13.5px] font-medium text-[#2D4566] transition hover:text-[#087BFF]"
          >
            About
          </Link>

          <Link
            href="/#contact"
            className="text-[13.5px] font-medium text-[#2D4566] transition hover:text-[#087BFF]"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {onStart ? (
            <button
              type="button"
              onClick={onStart}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#062B50] px-5 py-2 text-[13px] font-semibold text-white shadow-[0_6px_16px_rgba(6,43,80,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#031d36] cursor-pointer"
            >
              Start Practicing
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <Link
              href="/subjects/innovation-management-and-entrepreneurship"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#062B50] px-5 py-2 text-[13px] font-semibold text-white shadow-[0_6px_16px_rgba(6,43,80,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#031d36]"
            >
              Start Practicing
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-[#062B50] lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-2 rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(6,43,80,0.10)] ring-1 ring-[#e5effa] lg:hidden">
          <div className="flex flex-col gap-3 text-[14px] font-semibold text-[#062B50]">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link
              href="/subjects/innovation-management-and-entrepreneurship"
              onClick={() => setOpen(false)}
            >
              Practice (IME)
            </Link>
            <div className="border-t border-slate-100 pt-2 pb-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Subjects
              </span>
              {SUBJECT_NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-1.5 text-[13px] font-medium"
                >
                  <span>{item.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </Link>
              ))}
            </div>
            <Link href="/#about" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/#contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
