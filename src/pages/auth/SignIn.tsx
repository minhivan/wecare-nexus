import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Chrome, Github, Mail, Lock } from "lucide-react";
import wecareIcon from "@/assets/wecare-icon.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C111A] to-[#111827] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle particles background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-[1360px] flex items-center justify-between gap-24 relative z-10">
        {/* Left branding - hidden on mobile */}
        <div className="hidden lg:flex flex-1 flex-col gap-6">
          <div className="flex items-center gap-3">
            <img src={wecareIcon} alt="Wecare" className="w-12 h-12" />
            <div>
              <h1 className="text-2xl font-bold text-primary-text">Wecare</h1>
              <p className="text-sm text-secondary-text">Empower change, together</p>
            </div>
          </div>
          <div className="space-y-4 max-w-md">
            <h2 className="text-4xl font-bold text-primary-text leading-tight">
              Track impact,<br />drive engagement,<br />grow together
            </h2>
            <p className="text-base text-secondary-text leading-relaxed">
              Comprehensive analytics and campaign management for nonprofit organizations.
            </p>
          </div>
        </div>

        {/* Auth card */}
        <div className="w-full max-w-[420px] bg-surface rounded-xl border border-divider p-8 space-y-6">
          {/* Logo for mobile */}
          <div className="lg:hidden flex items-center gap-2 mb-2">
            <img src={wecareIcon} alt="Wecare" className="w-8 h-8" />
            <span className="text-lg font-semibold text-primary-text">Wecare</span>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-text mb-2">Welcome back</h2>
            <p className="text-sm text-secondary-text">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-primary-text">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" strokeWidth={1.5} />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-input-bg border-divider text-primary-text placeholder:text-muted-text focus:border-emerald focus:ring-1 focus:ring-emerald"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-primary-text">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" strokeWidth={1.5} />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 bg-input-bg border-divider text-primary-text placeholder:text-muted-text focus:border-emerald focus:ring-1 focus:ring-emerald"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm text-secondary-text cursor-pointer">
                  Remember me
                </Label>
              </div>
              <Link to="/auth/forgot-password" className="text-sm text-emerald hover:text-emerald/80 transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-emerald hover:bg-emerald/90 text-white font-medium transition-all duration-200 hover:-translate-y-[1px]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-divider" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface px-3 text-muted-text">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="ghost"
              className="h-11 bg-hover-state border border-divider text-secondary-text hover:text-primary-text hover:bg-hover-state/80 transition-all duration-200"
            >
              <Chrome className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Google
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="h-11 bg-hover-state border border-divider text-secondary-text hover:text-primary-text hover:bg-hover-state/80 transition-all duration-200"
            >
              <Github className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Github
            </Button>
          </div>

          <div className="text-center text-sm text-secondary-text">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-emerald hover:text-emerald/80 font-medium transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
