"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Sun, Moon, Menu, Sparkles, Github, ChevronDown, User, LogOut, Settings, Bell, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

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
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Header({ toggleSidebar }) {
  const { user, loading } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 50], [1, 0.98]);
  const headerBlur = useTransform(scrollY, [0, 50], [0, 12]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header 
      style={{ 
        opacity: headerOpacity,
        backdropFilter: `blur(${headerBlur}px)`,
      }}
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled 
          ? 'bg-background/80 shadow-sm' 
          : 'bg-background/95'
      } backdrop-blur-md`}
    >
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {toggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 md:hidden hover:bg-accent/50"
              onClick={toggleSidebar}
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}

          <motion.button
            onClick={() => navigate("/")}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <motion.div 
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 transition-all group-hover:shadow-xl group-hover:shadow-primary/35"
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>
            <span className="text-sm font-bold tracking-tight hidden sm:block">
              Repo<span className="text-primary">Sensei</span>
            </span>
          </motion.button>

          {/* Navigation Links (desktop) */}
          {user && (
            <nav className="hidden md:flex items-center gap-1 ml-4">
              <Button
                variant={isActive('/dashboard') ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="h-8 px-3 text-xs font-medium"
              >
                Dashboard
              </Button>
              <Button
                variant={isActive('/generate') ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => navigate('/generate')}
                className="h-8 px-3 text-xs font-medium"
              >
                Generate
              </Button>
            </nav>
          )}
        </div>

        {/* Center Section - Search (desktop only) */}
        <AnimatePresence>
          {searchOpen && user && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "300px" }}
              exit={{ opacity: 0, width: 0 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search repositories..."
                  className="h-9 pl-9 pr-3 bg-muted/50 border-muted-foreground/20"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Section */}
        <div className="flex items-center gap-1.5">
          
          {/* Search Toggle (desktop) */}
          {user && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-md text-muted-foreground hidden lg:flex"
                  onClick={() => setSearchOpen(!searchOpen)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Search</TooltipContent>
            </Tooltip>
          )}

          {/* Theme Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-md text-muted-foreground relative overflow-hidden group"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="mx-1 h-5" />

          {loading ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-4 w-20 hidden sm:block" />
            </div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="h-9 gap-2 px-2 hover:bg-accent/50 data-[state=open]:bg-accent"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Avatar className="h-7 w-7 border border-primary/20 shadow-sm">
                      <AvatarImage src={user.avatar_url} alt={user.login} />
                      <AvatarFallback className="text-[10px] bg-primary text-primary-foreground">
                        {user.name?.substring(0, 2).toUpperCase() || user.login?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
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
              <DropdownMenuContent 
                align="end" 
                className="w-72 mt-2"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 shadow-md">
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
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="space-y-1 p-2 rounded-md hover:bg-muted/50 cursor-default"
                    >
                      <p className="text-sm font-bold">{user.public_repos || 0}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">Repos</p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="space-y-1 p-2 rounded-md hover:bg-muted/50 cursor-default"
                    >
                      <p className="text-sm font-bold">{user.followers || 0}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">Followers</p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="space-y-1 p-2 rounded-md hover:bg-muted/50 cursor-default"
                    >
                      <p className="text-sm font-bold">{user.following || 0}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">Following</p>
                    </motion.div>
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

                <DropdownMenuItem 
                  className="text-xs cursor-pointer"
                  onClick={() => navigate("/settings")}
                >
                  <Settings className="mr-2 h-3.5 w-3.5" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                
                <div className="p-1">
                  <LogoutButton />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <GitHubLoginButton />
            </motion.div>
          )}
        </div>
      </div>

      {/* Progress bar on scroll */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-blue-500 to-purple-500 origin-left"
        style={{
          scaleX: useTransform(scrollY, [0, 1000], [0, 1]),
        }}
      />
    </motion.header>
  );
}