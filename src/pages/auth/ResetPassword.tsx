import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Check } from "lucide-react";
import wecareIcon from "@/assets/wecare-icon.png";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    
    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      setPasswordReset(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C111A] to-[#111827] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle particles background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-[420px] relative z-10">
        {/* Auth card */}
        <div className="bg-surface rounded-xl border border-divider p-8 space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-2">
            <img src={wecareIcon} alt="Wecare" className="w-8 h-8" />
            <span className="text-lg font-semibold text-primary-text">Wecare</span>
          </div>

          {!passwordReset ? (
            <>
              <div>
                <h2 className="text-2xl font-semibold text-primary-text mb-2">Set new password</h2>
                <p className="text-sm text-secondary-text">
                  Your new password must be different from previously used passwords
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-primary-text">
                    New Password
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

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-sm font-medium text-primary-text">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" strokeWidth={1.5} />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 h-11 bg-input-bg border-divider text-primary-text placeholder:text-muted-text focus:border-emerald focus:ring-1 focus:ring-emerald"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-emerald hover:bg-emerald/90 text-white font-medium transition-all duration-200 hover:-translate-y-[1px]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Resetting password...
                    </div>
                  ) : (
                    "Reset password"
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center mx-auto">
                <div className="w-12 h-12 bg-emerald/20 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-emerald" strokeWidth={2} />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-primary-text">Password reset successful</h3>
                <p className="text-sm text-secondary-text">
                  Your password has been successfully reset.<br />
                  You can now sign in with your new password.
                </p>
              </div>

              <div className="pt-4">
                <Link to="/auth/signin">
                  <Button className="w-full h-11 bg-emerald hover:bg-emerald/90 text-white font-medium transition-all duration-200 hover:-translate-y-[1px]">
                    Continue to sign in
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
