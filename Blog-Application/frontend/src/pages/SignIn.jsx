import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn } from "lucide-react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

export default function SignIn() {
  const {login}=useContext(UserContext)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  if (!formData.email || !formData.password) {
    setError("Please fill in all fields");
    setIsLoading(false);
    return;
  }

  try {
    await login(formData); // context call
    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 px-3 py-2 rounded-md"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </button>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 shadow-lg rounded-xl p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-slate-700">Sign in to your BlogSpace account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-slate-900 font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md border-slate-200 
                           focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-slate-900 font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md border-slate-200 
                           focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 
                         bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                         text-white rounded-md disabled:opacity-70"
            >
              <LogIn className="w-4 h-4" />
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-slate-700">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/sign-up")}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
