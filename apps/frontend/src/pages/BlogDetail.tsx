import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById } from "../services/blog.services";
import { ArrowLeft, Globe, Lock, Loader2 } from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchFullBlog = async () => {
      try {
        setIsLoading(true);
        const data = await getBlogById(Number(id));
        setBlog(data);
      } catch (err: any) {
        setError("Article not found or has been removed.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchFullBlog();
  }, [id]);

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <Loader2 className="animate-spin text-black" size={40} />
        <p className="text-xs font-black uppercase tracking-widest text-black/40">
          Loading Story...
        </p>
      </div>
    );

  if (error || !blog)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center px-4">
        <h2 className="text-2xl font-black uppercase mb-4">{error}</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-bold border-b-2 border-black pb-1"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <article className="min-h-screen bg-white text-black pb-20">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:opacity-60 transition-opacity"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="flex items-center gap-4">
          <span
            className={`flex items-center gap-1 text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
              blog.published
                ? "bg-black text-white"
                : "bg-black/5 text-black/40"
            }`}
          >
            {blog.published ? <Globe size={10} /> : <Lock size={10} />}
            {blog.published ? "Published" : "Draft"}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-6 pt-16 md:pt-24">
        <header className="mb-12 space-y-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] ">
            {blog.title}
          </h1>

          <div className="flex items-center gap-6 text-black/40 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center font-bold text-black text-xs">
                {blog.author?.name?.charAt(0) || "U"}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">
                {blog.author?.name || "Author"}
              </span>
            </div>
          </div>
        </header>

        {/* Blog Body */}
        <section className="prose prose-lg max-w-none">
          <div className="text-xl leading-relaxed text-black/80 whitespace-pre-wrap font-serif">
            {blog.content}
          </div>
        </section>

        {/* Footer Actions */}
        <footer className="mt-20 pt-10 border-t border-black/5">
          <div className="bg-black/[0.02] p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30 mb-1">
                Finished Reading?
              </p>
              <h4 className="text-xl font-bold">
                Share this story or explore more.
              </h4>
            </div>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="bg-black text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Explore Articles
            </button>
          </div>
        </footer>
      </main>
    </article>
  );
};

export default BlogDetail;
