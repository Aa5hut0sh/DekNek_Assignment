import { useState } from "react";
import { createBlog } from "../services/blog.services";
import { useNavigate } from "react-router-dom";
import { Send, Eye, Type, AlignLeft, Sparkles, Loader2 } from "lucide-react";

const WriteBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createBlog(title, content, published);
      navigate("/myblogs");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-black font-sans pb-32">
      
      {/* Background Decorative Depth */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[40%] h-[50%] bg-black/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-[5%] w-[30%] h-[40%] bg-black/[0.01] rounded-full blur-[100px]" />
      </div>

      <main className="relative max-w-5xl mx-auto px-6 pt-20 md:pt-32">
        
        {/* Header Branding */}
        <div className="mb-16 space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-black/30">
            <Sparkles size={12} />
            <span>Drafting Mode</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Create<br />Content<span className="text-black/10">.</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="group relative">
            <input
              type="text"
              placeholder="YOUR STORY TITLE"
              className="w-full bg-transparent text-4xl md:text-6xl font-black tracking-tighter  placeholder:text-black/5 outline-none transition-all focus:placeholder:text-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div className="h-[1px] w-0 bg-black transition-all duration-700 group-focus-within:w-full" />
          </div>

          {/* Content Textarea */}
          <div className="relative">
            <div className="absolute -left-12 top-2 hidden lg:flex flex-col gap-6 text-black/20">
              <Type size={20} />
              <AlignLeft size={20} />
            </div>
            <textarea
              placeholder="Tell your story..."
              className="w-full bg-transparent text-xl md:text-2xl leading-relaxed font-medium placeholder:text-black/10 outline-none min-h-[400px] resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* Floating Glass Control Bar */}
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl">
            <div className="backdrop-blur-3xl bg-white/60 border border-black/[0.08] p-4 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center justify-between">
              
              <div className="flex items-center gap-6 px-4">
                {/* Custom Toggle Switch */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative w-10 h-5 bg-black/5 rounded-full border border-black/10 transition-colors group-hover:bg-black/10">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={published}
                      onChange={() => setPublished(!published)}
                    />
                    <div className="absolute top-1 left-1 w-3 h-3 bg-black rounded-full transition-transform peer-checked:translate-x-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                    {published ? "Public" : "Private Draft"}
                  </span>
                </label>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  type="button"
                  className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest text-black/40 hover:bg-black/5 transition-all"
                >
                  <Eye size={14} /> Preview
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-black/20"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Publish <Send size={14} />
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default WriteBlog;