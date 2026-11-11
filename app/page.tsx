"use client";

import { useState } from "react";
import { LandingPage } from "../components/landing/LandingPage";
import { QuizRunner } from "../components/quiz/QuizRunner";
import { questions } from "../data/questions";

export default function Home() {
  const [mode, setMode] = useState<"landing" | "quiz">("landing");

  function startQuiz() {
    setMode("quiz");
  }

  function goHome() {
    setMode("landing");
  }

  if (mode === "quiz") {
    return (
      <QuizRunner
        questions={questions}
        subjectTitle="INNOVATION MANAGEMENT"
        versionName="VERSION 1"
        onExit={goHome}
      />
    );
  }

  return <LandingPage onStart={startQuiz} />;
}
