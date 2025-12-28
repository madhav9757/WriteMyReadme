"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import api from "@/api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      
      if (res.data?.success && res.data?.user) {
        await fetchGitHubUserDetails(res.data.user);
      } else if (res.data?.user) {
        await fetchGitHubUserDetails(res.data.user);
      }
    } catch (error) {
      console.log("User not authenticated:", error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchGitHubUserDetails = async (authUser) => {
    try {
      const githubRes = await fetch(`https://api.github.com/users/${authUser.login}`);
      
      if (githubRes.ok) {
        const githubData = await githubRes.json();
        
        setUser({
          ...authUser,
          name: githubData.name || authUser.login,
          avatar_url: githubData.avatar_url,
          bio: githubData.bio,
          company: githubData.company,
          location: githubData.location,
          blog: githubData.blog,
          twitter_username: githubData.twitter_username,
          public_repos: githubData.public_repos,
          public_gists: githubData.public_gists,
          followers: githubData.followers,
          following: githubData.following,
          created_at: githubData.created_at,
          updated_at: githubData.updated_at,
          html_url: githubData.html_url,
          repos_url: githubData.repos_url,
          plan: githubData.plan || { name: "Free" },
        });
      } else {
        setUser({
          ...authUser,
          avatar_url: `https://github.com/${authUser.login}.png`,
          public_repos: 0,
          followers: 0,
          following: 0,
          plan: { name: "Free" },
        });
      }
    } catch (error) {
      console.error("Failed to fetch GitHub details:", error);
      setUser({
        ...authUser,
        avatar_url: `https://github.com/${authUser.login}.png`,
        public_repos: 0,
        followers: 0,
        following: 0,
        plan: { name: "Free" },
      });
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed");
    }
  };

  const refreshUser = async () => {
    setLoading(true);
    await fetchUser();
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        setUser, 
        logout, 
        refreshUser,
        isAuthenticated, 
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};