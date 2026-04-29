import { useEffect, useState } from "react";
import { getAllBlogs } from "../services/blog.services";
import BlogCard from "../components/BlogCard";
import { Sparkles, LayoutGrid, Search } from "lucide-react";

const Home = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllBlogs().then((data) => {
      setBlogs(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-black font-sans pb-20">
      <div className="absolute top-0 left-0 w-full h-[500px] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] bg-black/[0.02] rounded-full blur-[120px]" />
        <div className="absolute top-[10%] right-[-5%] w-[30%] h-[50%] bg-black/[0.01] rounded-full blur-[100px]" />
      </div>

      <main className="relative max-w-7xl mx-auto px-6 pt-16 md:pt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-black/40">
              <Sparkles size={12} />
              <span>Curated Stories</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
              The
              <br />
              Blogger<span className="text-black/10">.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 group-focus-within:text-black transition-colors" />
              <input
                type="text"
                placeholder="Search articles..."
                className="bg-black/[0.03] border border-black/[0.05] rounded-full py-3 pl-11 pr-6 text-sm outline-none focus:bg-white focus:ring-4 focus:ring-black/5 transition-all w-64"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-80 rounded-[2.5rem] bg-black/[0.03] animate-pulse border border-black/[0.05]"
              />
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <div key={blog.id} className="h-full">
                <BlogCard
                  id={blog.id}
                  title={blog.title}
                  content={blog.content}
                  published={blog.published}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border-t border-black/[0.05]">
            <p className="text-2xl font-bold text-black/20 uppercase tracking-widest">
              No stories found.
            </p>
          </div>
        )}
      </main>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-white/60 border border-black/[0.08] px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 z-50">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
          <LayoutGrid size={14} />
          <span>{blogs.length} Posts</span>
        </div>
        <div className="w-[1px] h-4 bg-black/10" />
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-[10px] font-black uppercase tracking-widest hover:text-black/50 transition-colors"
        >
          Back to Top
        </button>
      </div>
    </div>
  );
};

export default Home;
