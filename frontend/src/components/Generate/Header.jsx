"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, Sparkles, Github, ChevronDown, User, LogOut, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";

import GitHubLoginButton from "@/components/auth/GitHubLoginButton";
import LogoutButton from "@/components/auth/LogoutButton";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header({ toggleSidebar }) {
  const { user, loading } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="flex h-12 items-center justify-between px-4 sm:px-6">
        
        <div className="flex items-center gap-4">
          {toggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}

          <motion.button
            onClick={() => navigate("/")}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform group-hover:rotate-12">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-bold tracking-tight bg-clip-text">
              Repo<span className="text-primary">Sensei</span>
            </span>
          </motion.button>
        </div>

        <div className="flex items-center gap-1.5">
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-md text-muted-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>

          <Separator orientation="vertical" className="mx-1 h-4" />

          {loading ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-20 hidden sm:block" />
            </div>
          ) : user ? (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 gap-2 px-1.5 hover:bg-accent/50">
                    <Avatar className="h-6 w-6 border">
                      <AvatarImage src={user.avatar_url} alt={user.login} />
                      <AvatarFallback className="text-[10px] bg-primary text-primary-foreground">
                        {user.name?.substring(0, 2).toUpperCase() || user.login?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex flex-col items-start text-left leading-none">
                      <span className="text-xs font-medium max-w-[100px] truncate">
                        {user.name || user.login}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {user.plan?.name || "Free"}
                      </span>
                    </div>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 mt-2">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2">
                        <AvatarImage src={user.avatar_url} alt={user.login} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.name?.substring(0, 2).toUpperCase() || user.login?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1 flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-none truncate">
                          {user.name || user.login}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                          @{user.login}
                        </p>
                        {user.bio && (
                          <p className="text-[10px] leading-tight text-muted-foreground line-clamp-2 mt-1">
                            {user.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  
                  <DropdownMenuSeparator />
                  
                  <div className="px-2 py-2">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="space-y-1">
                        <p className="text-sm font-bold">{user.public_repos || 0}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">Repos</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold">{user.followers || 0}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">Followers</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold">{user.following || 0}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">Following</p>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem 
                    className="text-xs cursor-pointer"
                    onClick={() => window.open(user.html_url, "_blank")}
                  >
                    <Github className="mr-2 h-3.5 w-3.5" />
                    View GitHub Profile
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    className="text-xs cursor-pointer"
                    onClick={() => navigate("/dashboard")}
                  >
                    <User className="mr-2 h-3.5 w-3.5" />
                    Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  
                  <div className="p-1">
                    <LogoutButton />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <GitHubLoginButton />
          )}
        </div>
      </div>
    </header>
  );
}