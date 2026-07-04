"use client";
import alreadyLoggedInAuth from "@/hoc/alreadyLoggedInAuth";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredentials.user.getIdToken();

      //Send token to the backend for cookie setting
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        console.log("Redirecting to dashboard");
        router.push("/admin/dashboard");
      } else {
        const { message } = await response.json();
        setErrorMessage(message || "Failed to login. Please try again.");
      }
      router.push("/admin/dashboard");
    } catch (error: any) {
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Brand panel -- desktop only */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy-deep relative flex-col items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(68,140,255,0.15),transparent_60%)]" />
        <div className="relative z-10 flex flex-col items-center text-center max-w-md">
          <Image
            src="/images/uptech-logo.svg"
            alt="Uptech Logo"
            className="w-40 mb-8"
            width={160}
            height={160}
            style={{ height: "auto" }}
          />
          <h1 className="text-3xl font-bold text-white mb-3">
            Uptech Administration
          </h1>
          <p className="text-on-blue text-lg leading-relaxed">
            Manage applications, jobs, and your team&nbsp;&mdash; all in one
            place.
          </p>
        </div>
      </div>

      {/* Navy header strip -- mobile only */}
      <div className="flex lg:hidden items-center justify-center bg-navy-deep py-6 px-4">
        <Image
          src="/images/uptech-logo.svg"
          alt="Uptech Logo"
          className="w-24"
          width={96}
          height={96}
          style={{ height: "auto" }}
        />
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center bg-mist p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-md">
          <div className="bg-paper rounded-card shadow-card border border-line p-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-ink">Admin Login</h2>
              <p className="text-ink-soft text-sm mt-1">
                Sign in to access the dashboard
              </p>
            </div>

            <form
              id="loginForm"
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-ink-soft text-sm font-semibold uppercase tracking-wider mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-3 bg-mist border border-line rounded-card-sm focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-ink-soft text-sm font-semibold uppercase tracking-wider mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 bg-mist border border-line rounded-card-sm focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-brand text-white rounded-full shadow-glow-blue font-semibold hover:bg-brand-deep focus:outline-none focus:ring-2 focus:ring-brand/40 focus:ring-offset-2 transition-colors"
                >
                  Sign in
                </button>
              </div>
              {errorMessage && (
                <div
                  id="error-message"
                  className="bg-red-50 border border-red-200 rounded-card-sm px-4 py-3 text-red-600 text-sm text-center"
                >
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default alreadyLoggedInAuth(AdminLogin);
