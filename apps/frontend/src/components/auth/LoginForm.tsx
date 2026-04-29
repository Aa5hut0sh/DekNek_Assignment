import { useState } from "react";
import { useAuth } from "../../store/hooks";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
    const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-white overflow-hidden text-black font-sans">
      
      {/* Background Decorative Elements - Subtle black shapes to show off the glass blur */}
      <div className="absolute top-[20%] left-[30%] w-64 h-64 bg-black/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-[20%] right-[30%] w-96 h-96 bg-black/[0.02] rounded-full blur-3xl" />

      <div className="relative w-full max-w-md mx-4">
        {/* The Glass Card */}
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-2xl bg-white/40 border border-black/[0.08] p-12 rounded-[2.5rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] flex flex-col gap-8"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black tracking-tighter uppercase">Login</h1>
            <p className="text-sm font-medium text-black/40">Welcome back to Blogger.</p>
          </div>

          {error && (
            <div className="bg-black text-white text-[10px] uppercase tracking-widest py-3 px-4 text-center font-bold">
              {error}
            </div>
          )}

          {/* Inputs */}
          <div className="space-y-4">
            <div className="group relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 group-focus-within:text-black transition-colors" />
              <input
                type="email"
                placeholder="EMAIL"
                className="w-full bg-white/50 border border-black/[0.05] rounded-2xl px-12 py-4 text-sm outline-none transition-all focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 placeholder:text-black/20 font-bold tracking-tight"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="group relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 group-focus-within:text-black transition-colors" />
              <input
                type="password"
                placeholder="PASSWORD"
                className="w-full bg-white/50 border border-black/[0.05] rounded-2xl px-12 py-4 text-sm outline-none transition-all focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 placeholder:text-black/20 font-bold tracking-tight"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] overflow-hidden transition-all hover:shadow-2xl active:scale-[0.98] disabled:opacity-50"
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Enter <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </>
              )}
            </div>
          </button>

          {/* Simple Footer */}
          <div className="flex flex-col items-center gap-4 pt-4 border-t border-black/[0.05]">
            <a href="/signup" className="text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors">
              Create Account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;