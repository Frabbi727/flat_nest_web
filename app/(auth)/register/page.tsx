"use client";

import { Suspense, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import {
  registerStep1Schema,
  googleBasicSchema,
  type RegisterStep1Form,
  type GoogleBasicForm,
} from "@/types/forms";
import { useAuthVM } from "@/viewmodels/useAuthVM";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import Link from "next/link";

function RegisterForm() {
  const searchParams = useSearchParams();
  const isGoogleUser = searchParams.get("googleUser") === "true";

  const {
    registerStep1,
    registerStep1Pending,
    registerStep1ApiErrors,
    registerBasic,
    registerBasicPending,
    registerBasicApiErrors,
    loginWithGoogle,
  } = useAuthVM();

  const regularForm = useForm<RegisterStep1Form>({
    resolver: zodResolver(registerStep1Schema),
  });
  const regularPassword = useWatch({ control: regularForm.control, name: "password" }) ?? "";

  const googleForm = useForm<GoogleBasicForm>({
    resolver: zodResolver(googleBasicSchema),
  });
  const googlePassword = useWatch({ control: googleForm.control, name: "password" }) ?? "";

  useEffect(() => {
    if (!registerStep1ApiErrors) return;
    for (const [field, message] of Object.entries(registerStep1ApiErrors)) {
      regularForm.setError(field as keyof RegisterStep1Form, { message });
    }
  }, [registerStep1ApiErrors, regularForm.setError]);

  useEffect(() => {
    if (!registerBasicApiErrors) return;
    for (const [field, message] of Object.entries(registerBasicApiErrors)) {
      googleForm.setError(field as keyof GoogleBasicForm, { message });
    }
  }, [registerBasicApiErrors, googleForm.setError]);

  if (isGoogleUser) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Complete your profile</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Set a phone number and password so you can also log in with email.
            </p>
          </div>

          <form
            onSubmit={googleForm.handleSubmit((d) =>
              registerBasic({ phone: d.phone, password: d.password })
            )}
            className="space-y-4"
          >
            <div className="space-y-1">
              <Label htmlFor="g-phone">Phone Number</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm select-none">
                  +88
                </span>
                <Input
                  id="g-phone"
                  type="tel"
                  placeholder="01711000000"
                  className="rounded-l-none"
                  {...googleForm.register("phone")}
                />
              </div>
              {googleForm.formState.errors.phone && (
                <p className="text-destructive text-xs">
                  {googleForm.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="g-password">Password</Label>
              <Input
                id="g-password"
                type="password"
                placeholder="Min 8 characters"
                {...googleForm.register("password")}
              />
              <PasswordStrengthMeter password={googlePassword} />
              {googleForm.formState.errors.password && (
                <p className="text-destructive text-xs">
                  {googleForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="g-password-confirmation">Confirm Password</Label>
              <Input
                id="g-password-confirmation"
                type="password"
                placeholder="Re-enter your password"
                {...googleForm.register("password_confirmation")}
              />
              {googleForm.formState.errors.password_confirmation && (
                <p className="text-destructive text-xs">
                  {googleForm.formState.errors.password_confirmation.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={registerBasicPending}>
              {registerBasicPending ? "Saving…" : "Continue"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create account</h1>
          <p className="text-muted-foreground text-sm mt-1">Join FlatNest</p>
        </div>

        <form
          onSubmit={regularForm.handleSubmit((d) => registerStep1(d))}
          className="space-y-4"
        >
          <div className="space-y-1">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" {...regularForm.register("name")} />
            {regularForm.formState.errors.name && (
              <p className="text-destructive text-xs">
                {regularForm.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...regularForm.register("email")}
            />
            {regularForm.formState.errors.email && (
              <p className="text-destructive text-xs">
                {regularForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm select-none">
                +88
              </span>
              <Input
                id="phone"
                type="tel"
                placeholder="01711000000"
                className="rounded-l-none"
                {...regularForm.register("phone")}
              />
            </div>
            {regularForm.formState.errors.phone && (
              <p className="text-destructive text-xs">
                {regularForm.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Min 8 characters"
              {...regularForm.register("password")}
            />
            <PasswordStrengthMeter password={regularPassword} />
            {regularForm.formState.errors.password && (
              <p className="text-destructive text-xs">
                {regularForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password_confirmation">Confirm Password</Label>
            <Input
              id="password_confirmation"
              type="password"
              placeholder="Re-enter your password"
              {...regularForm.register("password_confirmation")}
            />
            {regularForm.formState.errors.password_confirmation && (
              <p className="text-destructive text-xs">
                {regularForm.formState.errors.password_confirmation.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={registerStep1Pending}
          >
            {registerStep1Pending ? "Creating account…" : "Create Account"}
          </Button>
        </form>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs uppercase tracking-wider text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <GoogleSignInButton onCredential={loginWithGoogle} />

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
