import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editBlog, getBlogById } from "../services/blog.services";
import { Globe, Lock, Loader2 } from "lucide-react";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch existing blog data on mount
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setIsLoading(true);
        const data = await getBlogById(Number(id));
        setTitle(data.title);
        setContent(data.content);
        setPublished(data.published);
      } catch (err: any) {
        setError("Failed to load blog post. It may have been deleted.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchBlogData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      await editBlog(Number(id), title, content, published);
      navigate("/myblogs");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update blog.");
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="animate-spin" />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Edit Story</h1>
        {error && <p className="text-red-500 text-xs font-bold uppercase">{error}</p>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Title"
          className="w-full bg-transparent border-b border-black/10 px-0 py-4 text-4xl font-bold focus:outline-none focus:border-black transition-colors"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Tell your story..."
          className="w-full bg-transparent border-none px-0 py-2 h-64 text-lg resize-none focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        {/* Public/Private Toggle */}
        <div className="flex items-center gap-4 py-4 border-t border-black/5">
          <button
            type="button"
            onClick={() => setPublished(!published)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
              published 
                ? "bg-black text-white border-black" 
                : "bg-white text-black/40 border-black/10"
            }`}
          >
            {published ? <Globe size={16} /> : <Lock size={16} />}
            <span className="text-xs font-black uppercase tracking-widest">
              {published ? "Public" : "Private (Draft)"}
            </span>
          </button>
        </div>

        <div className="flex gap-3">
          <button 
            type="submit"
            className="bg-black text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
          >
            Save Changes
          </button>
          <button 
            type="button"
            onClick={() => navigate("/myblogs")}
            className="border border-black/10 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black/5 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;