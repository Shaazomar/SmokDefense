"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@override-r.com");
  const [password, setPassword] = useState("admin123");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Server connection failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f12] flex items-center justify-center p-4 font-sans text-slate-100">
      <div className="max-w-md w-full bg-[#12151a] border border-slate-800 rounded-xl p-8 shadow-2xl space-y-6">
        {/* BRAND HEADER */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-amber-400 text-lg">
            SD
          </div>
          <h1 className="font-display font-bold uppercase tracking-wider text-xl text-white">
            Override-R
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-amber-400/80">
            Protected Admin Portal
          </p>
        </div>

        {/* ERROR MSG */}
        {error && (
          <div className="p-3.5 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono text-center">
            {error}
          </div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@override-r.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-md pl-10 pr-4 py-2.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-800 rounded-md pl-10 pr-4 py-2.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold py-3 rounded-md transition-colors uppercase tracking-wider flex items-center justify-center gap-2 shadow-md mt-2"
          >
            {isLoading ? "Authenticating..." : "Sign In to Admin Console"}
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Encrypted Session Authentication</span>
          </div>
          <p className="text-[10px] font-mono text-slate-600">
            Default credentials: <code className="text-slate-400">admin@override-r.com</code> / <code className="text-slate-400">admin123</code>
          </p>
        </div>
      </div>
    </div>
  );
}
