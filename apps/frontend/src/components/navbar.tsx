import { useAuth } from "../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, PenSquare, User, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity"
        >
          BLOGGER<span className="text-white">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {!isAuthenticated ? (
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-sm font-medium hover:text-gray-400 transition">
                Log in
              </Link>
              <Link
                to="/signup"
                className="bg-white text-black px-5 py-2 text-sm font-bold rounded-full hover:bg-gray-200 transition"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link 
                to="/myblogs" 
                className="text-sm font-medium opacity-70 hover:opacity-100 transition"
              >
                My Feed
              </Link>
              
              <Link
                to="/write"
                className="flex items-center gap-2 border border-white/20 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black transition duration-300"
              >
                <PenSquare size={16} />
                <span>Write</span>
              </Link>

              <div className="h-6 w-[1px] bg-white/20" /> {/* Divider */}

              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition">
                  <User size={16} />
                </div>
                <span className="text-sm font-medium">{user?.name?.split(' ')[0]}</span>
              </div>

              <button
                onClick={logout}
                className="p-2 hover:bg-white/10 rounded-full transition"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-white/10 px-6 py-8 flex flex-col gap-6">
          {isAuthenticated ? (
            <>
              <Link to="/myblogs" className="text-xl font-bold">My Blogs</Link>
              <Link to="/write" className="text-xl font-bold">Write Blog</Link>
              <button onClick={logout} className="text-left text-xl font-bold text-gray-500">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-xl font-bold">Login</Link>
              <Link to="/signup" className="text-xl font-bold text-gray-500">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;