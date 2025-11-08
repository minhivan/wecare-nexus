import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Home, Plus, HelpCircle, Mail, Activity } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#0C111A] via-[#111827] to-[#0C111A]">
      {/* Ambient Glow Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-emerald/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-cyan/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1360px] px-6 text-center">
        {/* Floating Heart Animation */}
        <div className="mb-8 flex justify-center">
          <div className="animate-[float_3s_ease-in-out_infinite]">
            <Heart 
              className="h-24 w-24 text-emerald/40" 
              strokeWidth={1}
              fill="currentColor"
            />
          </div>
        </div>

        {/* 404 Text with Gradient Outline */}
        <h1 
          className="mb-6 text-[180px] font-bold leading-none tracking-tight animate-fade-in"
          style={{
            background: 'linear-gradient(135deg, #34D399 0%, #06B6D4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 80px rgba(52, 211, 153, 0.3)',
          }}
        >
          404
        </h1>

        {/* Subtext */}
        <p className="mb-4 text-2xl font-medium text-[#E5E7EB] animate-fade-in animation-delay-100">
          Looks like you took a wrong turn, but kindness is just one click away.
        </p>
        <p className="mb-12 text-base text-[#9CA3AF] animate-fade-in animation-delay-200">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* CTA Buttons */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-4 animate-fade-in animation-delay-300">
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="group relative overflow-hidden bg-emerald hover:bg-emerald/90 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-emerald/25 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Home className="h-5 w-5" />
              Back to Dashboard
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald to-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>

          <Button
            onClick={() => navigate("/campaigns/new")}
            variant="outline"
            size="lg"
            className="group border-2 border-cyan/30 bg-cyan/5 hover:bg-cyan/10 text-[#E5E7EB] px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-cyan/50"
          >
            <Plus className="mr-2 h-5 w-5" />
            Start a New Campaign
          </Button>
        </div>

        {/* Help Row */}
        <div className="flex flex-wrap items-center justify-center gap-8 border-t border-white/5 pt-8 animate-fade-in animation-delay-400">
          <a
            href="https://docs.lovable.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors duration-200"
          >
            <HelpCircle className="h-4 w-4" />
            Help Center
          </a>
          <a
            href="mailto:support@wecare.org"
            className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors duration-200"
          >
            <Mail className="h-4 w-4" />
            Contact Support
          </a>
          <a
            href="/status"
            className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors duration-200"
          >
            <Activity className="h-4 w-4" />
            System Status
          </a>
        </div>
      </div>

      {/* Custom Animation for Floating */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
