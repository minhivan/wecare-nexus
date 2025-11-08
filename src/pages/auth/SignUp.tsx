import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Chrome, Github, Mail, Lock, User } from "lucide-react";
import wecareIcon from "@/assets/wecare-icon.png";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) return;
    
    setIsLoading(true);
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      // Show verify email state
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
              Join thousands<br />of changemakers<br />worldwide
            </h2>
            <p className="text-base text-secondary-text leading-relaxed">
              Start managing your campaigns and making impact in minutes.
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
            <h2 className="text-2xl font-semibold text-primary-text mb-2">Create your account</h2>
            <p className="text-sm text-secondary-text">Get started with Wecare today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-primary-text">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" strokeWidth={1.5} />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-11 bg-input-bg border-divider text-primary-text placeholder:text-muted-text focus:border-emerald focus:ring-1 focus:ring-emerald"
                  required
                />
              </div>
            </div>

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
              <p className="text-xs text-muted-text">Must be at least 8 characters</p>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                className="mt-0.5"
              />
              <Label htmlFor="terms" className="text-sm text-secondary-text cursor-pointer leading-relaxed">
                I agree to the{" "}
                <Link to="/terms" className="text-emerald hover:text-emerald/80">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-emerald hover:text-emerald/80">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !agreeToTerms}
              className="w-full h-11 bg-emerald hover:bg-emerald/90 text-white font-medium transition-all duration-200 hover:-translate-y-[1px] disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                "Create account"
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
            Already have an account?{" "}
            <Link to="/auth/signin" className="text-emerald hover:text-emerald/80 font-medium transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
