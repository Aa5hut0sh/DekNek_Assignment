import { useState } from "react";
import { useAuth } from "../../store/hooks";
import { User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const { signup, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signup(email, password, name);
      navigate("/");
    } catch {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-white overflow-hidden text-black font-sans">
      
      {/* Background Decorative Elements - Subtle black shapes for blur depth */}
      <div className="absolute top-[10%] right-[20%] w-72 h-72 bg-black/[0.02] rounded-full blur-3xl" />
      <div className="absolute bottom-[10%] left-[20%] w-96 h-96 bg-black/[0.03] rounded-full blur-3xl" />

      <div className="relative w-full max-w-lg mx-4">
        {/* The Glass Card */}
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-3xl bg-white/40 border border-black/[0.08] p-10 md:p-14 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] flex flex-col gap-8"
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">Join Us</h1>
            <p className="text-sm font-medium text-black/40 tracking-tight">Create your account to start writing.</p>
          </div>

          {error && (
            <div className="bg-black text-white text-[10px] uppercase tracking-widest py-3 px-4 text-center font-bold animate-pulse">
              {error}
            </div>
          )}

          {/* Form Inputs */}
          <div className="space-y-4">
            <div className="group relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 group-focus-within:text-black transition-colors" />
              <input
                type="text"
                placeholder="FULL NAME"
                className="w-full bg-white/60 border border-black/[0.05] rounded-2xl px-14 py-4.5 text-sm outline-none transition-all focus:bg-white focus:border-black focus:ring-8 focus:ring-black/5 placeholder:text-black/20 font-bold tracking-tight"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="group relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 group-focus-within:text-black transition-colors" />
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-white/60 border border-black/[0.05] rounded-2xl px-14 py-4.5 text-sm outline-none transition-all focus:bg-white focus:border-black focus:ring-8 focus:ring-black/5 placeholder:text-black/20 font-bold tracking-tight"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="group relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 group-focus-within:text-black transition-colors" />
              <input
                type="password"
                placeholder="CHOOSE PASSWORD"
                className="w-full bg-white/60 border border-black/[0.05] rounded-2xl px-14 py-4.5 text-sm outline-none transition-all focus:bg-white focus:border-black focus:ring-8 focus:ring-black/5 placeholder:text-black/20 font-bold tracking-tight"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </>
              )}
            </div>
          </button>

          {/* Footer */}
          <div className="text-center pt-2">
            <p className="text-[11px] font-bold text-black/30 uppercase tracking-widest">
              Already have an account?{" "}
              <a href="/login" className="text-black hover:underline underline-offset-8 transition-all">
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;