"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginForm } from "@/types/forms";
import { useAuthVM } from "@/viewmodels/useAuthVM";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import Link from "next/link";

export default function LoginPage() {
  const { login, loginPending, loginWithGoogle } = useAuthVM();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left — form */}
      <div className="flex flex-col px-8 md:px-14 py-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 w-fit">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path
              d="M4 16L16 5l12 11v10a3 3 0 01-3 3H7a3 3 0 01-3-3V16z"
              fill="#1A6B72"
              fillOpacity="0.15"
              stroke="#1A6B72"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <rect
              x="12.5" y="15.5" width="7" height="9" rx="1.2"
              stroke="#1A6B72" strokeWidth="2"
              fill="#1A6B72" fillOpacity="0.6"
            />
          </svg>
          <span className="text-lg font-bold tracking-tight">FlatNest</span>
        </Link>

        {/* Form */}
        <div className="flex-1 flex flex-col justify-center max-w-[420px] w-full mt-10 md:mt-0">
          <h1 className="text-4xl md:text-[42px] font-bold tracking-tight leading-tight">
            Welcome back<br />to FlatNest.
          </h1>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Sign in to message owners, save flats, and pick up where you left off.
          </p>

          <form
            onSubmit={handleSubmit((d) => login(d))}
            className="space-y-4 mt-9"
          >
            <div className="space-y-1.5">
              <Label htmlFor="email" className="font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="h-12 rounded-xl"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-destructive text-xs">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <Label htmlFor="password" className="font-semibold">Password</Label>
                <a className="text-xs font-semibold text-primary cursor-pointer hover:opacity-70 transition-opacity">
                  Forgot?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-12 rounded-xl"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-destructive text-xs">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-full text-base mt-2"
              disabled={loginPending}
            >
              {loginPending ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <GoogleSignInButton onCredential={loginWithGoogle} />

          <p className="text-sm text-muted-foreground text-center mt-7">
            New to FlatNest?{" "}
            <Link href="/register" className="text-primary font-semibold hover:opacity-70 transition-opacity">
              Create an account →
            </Link>
          </p>
        </div>

        <p className="text-xs text-muted-foreground mt-8">
          By signing in you agree to our{" "}
          <span className="text-foreground cursor-pointer hover:underline">Terms</span>{" "}
          and{" "}
          <span className="text-foreground cursor-pointer hover:underline">Privacy Policy</span>.
        </p>
      </div>

      {/* Right — decorative panel */}
      <div
        className="hidden md:flex relative overflow-hidden"
        style={{ background: "#1A6B72" }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)",
          }}
        />

        {/* Testimonial */}
        <div className="relative mt-auto p-14 text-white">
          <p className="text-xs font-bold tracking-widest uppercase opacity-75 mb-5">
            From the community
          </p>
          <blockquote className="text-2xl md:text-[28px] font-semibold leading-snug tracking-tight text-balance">
            "Found my flat in Banani in three days — chatted with the owner directly, visited the same weekend, signed the lease that Monday."
          </blockquote>
          <div className="flex items-center gap-3 mt-8">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              FM
            </div>
            <div>
              <p className="font-semibold">Faisal Mahmud</p>
              <p className="text-sm opacity-75">Software engineer · Banani</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
