import { useEffect, useState } from "react";
import { getAllUserBlogs, editBlog } from "../services/blog.services";
import BlogCard from "../components/BlogCard";
import { FolderEdit, Plus, BarChart3, Globe, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = async () => {
    setIsLoading(true);
    const data = await getAllUserBlogs();
    console.log("BLOGS API RESPONSE:", data);
    setBlogs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const togglePublish = async (id: number, published: boolean) => {
    await editBlog(id, undefined, undefined, !published);
    fetchBlogs();
  };

  const handleDeleteLocally = (deletedId: number) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== deletedId));
  };

  // Stats calculation
  const publishedCount = blogs.filter((b) => b.published).length;
  const draftCount = blogs.length - publishedCount;

  return (
    <div className="relative min-h-screen bg-white text-black font-sans pb-20">
      {/* Background Depth Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-black/[0.01] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-black/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <main className="relative max-w-7xl mx-auto px-6 pt-16 md:pt-24">
        {/* Header & Stats Section */}
        <div className="flex flex-col gap-12 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-black/40">
                <FolderEdit size={14} />
                <span>Workspace</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
                My
                <br />
                Stories<span className="text-black/10">.</span>
              </h1>
            </div>

            {/* Quick Actions & Stats Glass Panel */}
            <div className="backdrop-blur-xl bg-white/40 border border-black/[0.08] p-6 rounded-[2rem] shadow-xl flex items-center gap-8 min-w-[300px]">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-black/30">
                  Total
                </p>
                <p className="text-2xl font-black leading-none">
                  {blogs.length}
                </p>
              </div>
              <div className="w-[1px] h-8 bg-black/10" />
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-black/30 flex items-center gap-1">
                  <Globe size={10} /> Published
                </p>
                <p className="text-2xl font-black leading-none">
                  {publishedCount}
                </p>
              </div>
              <div className="w-[1px] h-8 bg-black/10" />
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-black/30 flex items-center gap-1">
                  <Lock size={10} /> Drafts
                </p>
                <p className="text-2xl font-black leading-none">{draftCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Blogs Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-80 rounded-[2.5rem] bg-black/[0.03] animate-pulse border border-black/[0.05]"
              />
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                content={blog.content}
                published={blog.published}
                isOwner
                onTogglePublish={() => togglePublish(blog.id, blog.published)}
                onDelete={handleDeleteLocally}
              />
            ))}

            {/* "Create New" Glass Card */}
            <Link
              to="/write"
              className="group h-full min-h-[300px] flex flex-col items-center justify-center gap-4 rounded-[2.5rem] border-2 border-dashed border-black/10 hover:border-black/30 hover:bg-black/[0.02] transition-all duration-500"
            >
              <div className="p-4 rounded-full bg-black/5 group-hover:bg-black group-hover:text-white transition-all duration-500">
                <Plus size={32} />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-black/40 group-hover:text-black">
                New Story
              </span>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 border border-dashed border-black/10 rounded-[3rem] bg-black/[0.01]">
            <BarChart3 size={48} className="text-black/10 mb-6" />
            <h2 className="text-xl font-black uppercase tracking-widest text-black/20 mb-8">
              No articles created yet
            </h2>
            <Link
              to="/write"
              className="bg-black text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Start Writing
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyBlogs;
