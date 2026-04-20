import React, { useState } from "react";
import { Lock, User } from "lucide-react";

interface Props {
  next: string;
}

export function AdminLoginForm({ next }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError((data.error as string) || "登入失敗");
        return;
      }
      const dest =
        next.startsWith("/") && !next.startsWith("//")
          ? next
          : "/admin/videos/";
      window.location.href = dest;
    } catch {
      setError("無法連線伺服器，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Shopzpin
        </p>
        <h1 className="mt-2 text-2xl font-bold text-white">管理後台</h1>
        <p className="mt-2 text-sm text-slate-400">
          請登入後管理影片與內容（與官網前台分開）
        </p>
      </div>

      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-8">
        {error && (
          <div
            className="mb-6 rounded-lg border border-red-900/50 bg-red-950/40 px-4 py-3 text-sm text-red-200"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="admin-login-user"
              className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-300"
            >
              <User className="h-4 w-4 text-slate-500" />
              帳號
            </label>
            <input
              id="admin-login-user"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-[#ffcb05]/30 placeholder:text-slate-600 focus:border-[#ffcb05] focus:ring-2"
              placeholder="管理員帳號"
              required
            />
          </div>
          <div>
            <label
              htmlFor="admin-login-pass"
              className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-300"
            >
              <Lock className="h-4 w-4 text-slate-500" />
              密碼
            </label>
            <input
              id="admin-login-pass"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-[#ffcb05]/30 placeholder:text-slate-600 focus:border-[#ffcb05] focus:ring-2"
              placeholder="密碼"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#ffcb05] py-3 text-sm font-bold text-slate-900 shadow-lg shadow-[#ffcb05]/10 transition hover:bg-[#e6b604] disabled:opacity-50"
          >
            {loading ? "登入中…" : "登入"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-500">
          <a href="/" className="text-slate-400 underline-offset-2 hover:text-[#ffcb05] hover:underline">
            返回 Shopzpin 官網
          </a>
        </p>
      </div>
    </div>
  );
}
