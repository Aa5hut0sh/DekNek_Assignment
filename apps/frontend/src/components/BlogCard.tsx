import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Edit2, Eye, EyeOff, Trash2, Loader2 } from "lucide-react";
import { deleteBlog } from "../services/blog.services";
import { useState } from "react";

interface BlogCardProps {
  id: number;
  title: string;
  content: string;
  published: boolean;
  isOwner?: boolean;
  onTogglePublish?: () => void;
  onDelete?: (id: number) => void;
}

const BlogCard = ({
  id,
  title,
  content,
  published,
  isOwner = false,
  onTogglePublish,
  onDelete,
}: BlogCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); 

    if (!window.confirm("This action cannot be undone. Delete story?")) return;

    try {
      setIsDeleting(true);
      await deleteBlog(id);

      if (onDelete) {
        onDelete(id);
      } else {
        navigate("/myblogs", { replace: true });
      }
    } catch (error) {
      alert("Could not delete the blog. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group relative h-[350px]">
      <div className="relative h-full overflow-hidden rounded-2xl border border-black/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-black/20 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.07)] flex flex-col">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex items-center justify-between mb-4">
          <div
            className={`flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border transition-colors ${
              published
                ? "bg-white/90 text-black border-white"
                : "bg-black/40 text-white/70 border-white/20"
            }`}
          >
            {published ? <Eye size={12} /> : <EyeOff size={12} />}
            {published ? "Live" : "Hidden"}
          </div>
        </div>

        {/* 2. Content Area with Scrollable Text */}
        <div className="relative flex-grow flex flex-col overflow-hidden">
          <Link to={`/blog/${id}`}>
            <h2 className="mb-3 text-xl font-bold leading-tight text-black transition-colors group-hover:text-black/90 lg:text-2xl line-clamp-2">
              {title}
            </h2>
          </Link>

          {/* Scrollable Container */}
          <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
            <p className=" font-medium leading-relaxed text-black/60">
              {content}
            </p>
          </div>
        </div>

        <div className="relative flex items-center justify-between pt-6 mt-4 border-t border-black/5">
          <Link
            to={`/blog/${id}`}
            className="group/btn flex items-center gap-2 text-sm font-semibold text-black"
          >
            Read Article
            <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
              <ArrowRight size={16} />
            </span>
          </Link>

          {isOwner && (
            <div className="flex items-center gap-2">
              <button
                onClick={onTogglePublish}
                className="rounded-lg border border-black/10 bg-black/5 p-2 text-black/70 hover:bg-black hover:text-white transition-all duration-300"
                title={published ? "Unpublish" : "Publish"}
              >
                {published ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>

              <Link
                to={`/edit/${id}`}
                className="rounded-lg border border-black/10 bg-black/5 p-2 text-black/70 hover:bg-black hover:text-white transition-all duration-300"
                title="Edit"
              >
                <Edit2 size={16} />
              </Link>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-lg border border-red-100 bg-red-50 p-2 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 disabled:opacity-50"
                title="Delete Permanently"
              >
                {isDeleting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Trash2 size={16} />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Adding a small global style for the scrollbar directly or in your index.css */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default BlogCard;
