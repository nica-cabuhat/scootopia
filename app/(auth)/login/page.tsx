"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof loginSchema>, string>>;

const LoginPage = () => {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});
    setFormError("");

    const form = new FormData(e.currentTarget);
    const parsed = loginSchema.safeParse({
      username: form.get("username"),
      password: form.get("password"),
    });

    if (!parsed.success) {
      const errors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof FieldErrors;
        errors[field] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    const res = await signIn("credentials", {
      username: parsed.data.username,
      password: parsed.data.password,
      redirect: false,
    });
    setLoading(false);

    if (res?.error) {
      setFormError("Invalid username or password.");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-3">
          <Image src="/logo.png" alt="Scootopia" width={56} height={56} />
          <h1 className="text-2xl font-medium uppercase tracking-widest">
            Scootopia
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label
              htmlFor="username"
              className={fieldErrors.username ? "text-destructive" : ""}
            >
              Username
            </Label>
            <Input
              id="username"
              name="username"
              autoComplete="username"
              className={`h-12 focus-visible:ring-1 ${fieldErrors.username ? "border-destructive focus-visible:ring-destructive" : ""}`}
              aria-invalid={!!fieldErrors.username}
            />
            {fieldErrors.username && (
              <p className="text-sm text-destructive">{fieldErrors.username}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="password"
              className={fieldErrors.password ? "text-destructive" : ""}
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className={`h-12 focus-visible:ring-1 ${fieldErrors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
              aria-invalid={!!fieldErrors.password}
            />
            {fieldErrors.password && (
              <p className="text-sm text-destructive">{fieldErrors.password}</p>
            )}
          </div>

          {formError && (
            <p className="text-sm text-destructive text-center">{formError}</p>
          )}

          <Button
            type="submit"
            className="w-full uppercase tracking-wide h-12 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
