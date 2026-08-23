"use client";

import React, { useState } from "react";
import { TESTING_WORKFLOW_DEMO } from "@/lib/data/homepageData";
import { DemoTag } from "@/components/ui/DemoTag";
import { CheckCircle2, Play, FileCheck, ShieldCheck } from "lucide-react";

export function TestingSection() {
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testLog, setTestLog] = useState<typeof TESTING_WORKFLOW_DEMO>([]);

  const runSystemTestSequence = () => {
    setIsRunningTest(true);
    setTestLog([]);

    TESTING_WORKFLOW_DEMO.forEach((item, index) => {
      setTimeout(() => {
        setTestLog((prev) => [...prev, item]);
        if (index === TESTING_WORKFLOW_DEMO.length - 1) {
          setIsRunningTest(false);
        }
      }, (index + 1) * 600);
    });
  };

  return (
    <section className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">11 / TESTING</span>
            <DemoTag />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            KNOW THAT IT WORKS.<br />
            <span className="text-ink-soft">BEFORE YOU NEED IT.</span>
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            Automated test sequences verify physical damper stroke time, fan current feedback, and pressure differential setpoints, generating inspector-ready compliance records.
          </p>
        </div>

        {/* Closed-Loop Digital Testing Workflow Ribbon */}
        <div className="my-10 flex flex-wrap items-center justify-between border border-line bg-canvas p-6 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-accent">01. DEVICE</span>
            <span>→</span>
            <span className="font-bold text-ink">02. COMMAND</span>
            <span>→</span>
            <span className="font-bold text-ink">03. FEEDBACK</span>
            <span>→</span>
            <span className="font-bold text-accent">04. RESULT</span>
            <span>→</span>
            <span className="font-bold text-ink">05. RECORD</span>
          </div>
          <button
            onClick={runSystemTestSequence}
            disabled={isRunningTest}
            className="mt-4 rounded-full bg-ink px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-accent disabled:opacity-50 sm:mt-0"
          >
            {isRunningTest ? "Executing Test Sequence..." : "Run Test Routine →"}
          </button>
        </div>

        {/* Test Execution Output & Record Generator Panel */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Test Live Terminal Stream */}
          <div className="rounded border border-line bg-white p-6 lg:col-span-7">
            <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-xs">
              <span className="font-bold text-ink">LIVE SEQUENTIAL TEST STREAM</span>
              <span className="text-accent font-semibold">{isRunningTest ? "TESTING IN PROGRESS..." : "STANDBY"}</span>
            </div>

            <div className="mt-6 space-y-4 font-mono text-xs">
              {testLog.length === 0 && !isRunningTest && (
                <p className="text-ink-faint py-8 text-center">
                  Click &quot;Run Test Routine&quot; above to simulate an automated off-peak damper & fan test sequence.
                </p>
              )}

              {testLog.map((item, idx) => (
                <div key={idx} className="border border-line bg-canvas p-4 transition-all">
                  <div className="flex items-center justify-between border-b border-line/60 pb-2">
                    <span className="font-bold text-ink">{item.device} // [{item.type}]</span>
                    <span className="font-bold text-emerald-600">RESULT: {item.result}</span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-ink-soft">
                    <div>COMMAND: <span className="font-semibold text-ink">{item.command}</span></div>
                    <div>FEEDBACK: <span className="font-semibold text-accent">{item.feedback}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Test Record Certificate Preview */}
          <div className="border border-line bg-canvas p-6 font-mono text-xs lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="font-bold text-accent">DIGITAL TEST RECORD GENERATOR</span>
                <FileCheck className="h-4 w-4 text-ink-soft" />
              </div>

              <div className="my-6 space-y-2 text-ink-soft">
                <p className="text-ink font-semibold">INSPECTION LOG #TR-2026-0814</p>
                <p>TEST DATE: August 2026</p>
                <p>TEST SCOPE: Floor 18 Smoke Control Sub-System</p>
                <p>PASSED CRITERIA: Damper stroke &lt; 15s, Stairwell pressure 45-50 Pa</p>
                <p>DIGITAL SIGNATURE: SHA-256 Verified</p>
              </div>
            </div>

            <div className="border-t border-line pt-4 text-[10px] text-ink-faint leading-relaxed">
              <span className="font-semibold text-ink uppercase">REGULATORY NOTICE:</span> Software-generated digital test records provide verifiable diagnostic documentation for facility inspectors but do not substitute for mandatory physical testing required by local AHJ regulations.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
