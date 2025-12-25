"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

import GitHubLoginButton from "@/components/Auth/GitHubLoginButton";
import LogoutButton from "@/components/Auth/LogoutButton";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function Header({ toggleSidebar }) {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  // Load theme on mount
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = !darkMode;
    setDarkMode(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
    localStorage.setItem("theme", nextTheme ? "dark" : "light");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background border-b sticky top-0 z-50">
      {/* Sidebar Toggle (mobile) */}
      {toggleSidebar && (
        <button
          className="md:hidden p-2 rounded hover:bg-muted"
          onClick={toggleSidebar}
        >
          <motion.div whileTap={{ scale: 0.9 }}>☰</motion.div>
        </button>
      )}

      {/* Brand */}
      <div className="text-xl font-semibold tracking-tight">
        RepoReadMe
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={handleThemeToggle}>
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        {/* Auth */}
        {user ? <LogoutButton /> : <GitHubLoginButton />}
      </div>
    </header>
  );
}
