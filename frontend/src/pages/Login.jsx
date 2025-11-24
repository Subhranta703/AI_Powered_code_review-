import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-semibold text-slate-50 mb-2">Welcome back</h2>
      <p className="text-sm text-slate-400 mb-6">Sign in to continue reviewing your code.</p>

      {error && (
        <div className="mb-3 text-xs text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
        <div className="space-y-1">
          <label className="text-xs text-slate-300">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full text-sm px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 outline-none focus:border-blue-500"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-slate-300">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full text-sm px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-2 text-sm px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-xs text-slate-400">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-blue-400 hover:text-blue-300">
          Create one
        </Link>
      </p>
    </div>
  );
};

export default Login;
