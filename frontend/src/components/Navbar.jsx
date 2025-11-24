import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-slate-950">
            AI
          </div>
          <span className="font-semibold text-slate-100 tracking-tight">
            CodeReview<span className="text-blue-400">.pro</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm ${isActive ? "text-blue-400" : "text-slate-300 hover:text-blue-300"}`
            }
          >
            Home
          </NavLink>

          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-sm ${isActive ? "text-blue-400" : "text-slate-300 hover:text-blue-300"}`
              }
            >
              Dashboard
            </NavLink>
          )}

          {user ? (
            <>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Hi, <span className="text-slate-100">{user.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hidden sm:inline text-xs px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
