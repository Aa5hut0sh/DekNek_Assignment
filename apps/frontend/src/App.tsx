import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyBlogs from "./pages/MyBlogs";
import WriteBlog from "./pages/WriteBlog";
import EditBlog from "./pages/EditBlog";
import BlogDetail from "./pages/BlogDetail";
import { useAuth } from "./store/hooks";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        <Route
          path="/myblogs"
          element={
            <ProtectedRoute>
              <MyBlogs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/write"
          element={
            <ProtectedRoute>
              <WriteBlog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
