"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Sun, Moon, Menu, Sparkles, Github, ChevronDown, User, LogOut, Settings, Bell, Search, X, Command } from "lucide-react";
import { useTheme } from "next-themes";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

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
  TooltipProvider,
} from "@/components/ui/tooltip";

export default function Header({ toggleSidebar }) {
  const { user, loading } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchInputRef = useRef(null);
  
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 50], [1, 0.98]);
  const headerBlur = useTransform(scrollY, [0, 50], [0, 16]);
  const progressScale = useTransform(scrollY, [0, 1000], [0, 1]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    // Keyboard shortcut for search
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchOpen]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/generate', label: 'Generate' },
  ];

  return (
    <TooltipProvider delayDuration={200}>
      <motion.header 
        style={{ 
          opacity: headerOpacity,
        }}
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled 
            ? 'bg-background/70 shadow-lg shadow-black/5 dark:shadow-black/20' 
            : 'bg-background/90'
        }`}
      >
        <div 
          className="absolute inset-0 backdrop-blur-xl"
          style={{
            backdropFilter: mounted ? `blur(${scrolled ? 16 : 12}px) saturate(180%)` : undefined,
            WebkitBackdropFilter: mounted ? `blur(${scrolled ? 16 : 12}px) saturate(180%)` : undefined,
          }}
        />
        
        <div className="relative flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Left Section */}
          <div className="flex items-center gap-4 lg:gap-6">
            {toggleSidebar && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 md:hidden hover:bg-accent/80 hover:scale-105 transition-all"
                  onClick={toggleSidebar}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </motion.div>
            )}

            <motion.button
              onClick={() => navigate("/")}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-primary/70 shadow-lg shadow-primary/30 transition-all group-hover:shadow-xl group-hover:shadow-primary/50"
              >
                <Sparkles className="h-5 w-5 text-primary-foreground" />
                <motion.div
                  className="absolute inset-0 rounded-xl bg-white/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-base font-bold tracking-tight leading-none">
                  Repo<span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Sensei</span>
                </span>
                <span className="text-[10px] text-muted-foreground font-medium">AI-Powered Docs</span>
              </div>
            </motion.button>

            {/* Navigation Links */}
            {user && (
              <motion.nav 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="hidden md:flex items-center gap-1 ml-2"
              >
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (idx + 1) }}
                  >
                    <Button
                      variant={isActive(item.path) ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => navigate(item.path)}
                      className={`h-9 px-4 text-sm font-medium transition-all ${
                        isActive(item.path) 
                          ? 'bg-accent shadow-sm' 
                          : 'hover:bg-accent/50'
                      }`}
                    >
                      {item.label}
                      {isActive(item.path) && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-accent/50 rounded-md -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Button>
                  </motion.div>
                ))}
              </motion.nav>
            )}
          </div>

          {/* Center Section - Search */}
          <AnimatePresence mode="wait">
            {user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  width: searchOpen ? "auto" : "0px",
                  minWidth: searchOpen ? "300px" : "0px",
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="hidden lg:block"
              >
                {searchOpen && (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      ref={searchInputRef}
                      placeholder="Search repositories..."
                      className="h-10 pl-10 pr-20 bg-accent/50 border-muted-foreground/20 focus-visible:ring-2 focus-visible:ring-primary/50 transition-all"
                      onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        ESC
                      </kbd>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                        onClick={() => setSearchOpen(false)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            
            {/* Search Toggle */}
            {user && !searchOpen && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/80 hidden lg:flex relative group"
                      onClick={() => setSearchOpen(true)}
                    >
                      <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
                      <kbd className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity sm:flex">
                        ⌘K
                      </kbd>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Search <kbd className="ml-1 text-[10px]">⌘K</kbd></p>
                </TooltipContent>
              </Tooltip>
            )}

            {/* Notifications (placeholder) */}
            {user && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/80 relative group"
                    >
                      <Bell className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                      <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom">Notifications</TooltipContent>
              </Tooltip>
            )}

            {/* Theme Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/80 relative overflow-hidden group"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-yellow-500/20 to-orange-500/20 dark:from-blue-500/20 dark:via-indigo-500/20 dark:to-purple-500/20"
                      animate={{
                        opacity: [0, 0.3, 0],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={theme}
                        initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {theme === "dark" ? (
                          <Sun className="h-4 w-4 group-hover:rotate-90 transition-transform duration-500" />
                        ) : (
                          <Moon className="h-4 w-4 group-hover:-rotate-12 transition-transform duration-500" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </TooltipContent>
            </Tooltip>

            <Separator orientation="vertical" className="mx-1.5 h-6" />

            {loading ? (
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-24 hidden sm:block" />
              </div>
            ) : user ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="h-10 gap-2.5 px-2 hover:bg-accent/80 data-[state=open]:bg-accent rounded-lg group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Avatar className="h-8 w-8 border-2 border-primary/20 shadow-md ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                          <AvatarImage src={user.avatar_url} alt={user.login} />
                          <AvatarFallback className="text-xs bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                            {user.name?.substring(0, 2).toUpperCase() || user.login?.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div className="hidden sm:flex flex-col items-start text-left leading-none">
                        <span className="text-sm font-semibold max-w-[120px] truncate">
                          {user.name || user.login}
                        </span>
                        <span className="text-[11px] text-muted-foreground font-medium">
                          {user.plan?.name || "Free Plan"}
                        </span>
                      </div>
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-80 mt-2 p-2"
                    forceMount
                  >
                    <DropdownMenuLabel className="font-normal p-3">
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="h-14 w-14 border-2 shadow-lg ring-2 ring-primary/10">
                            <AvatarImage src={user.avatar_url} alt={user.login} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-base">
                              {user.name?.substring(0, 2).toUpperCase() || user.login?.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background" />
                        </div>
                        <div className="flex flex-col space-y-1.5 flex-1 min-w-0">
                          <p className="text-sm font-bold leading-none truncate">
                            {user.name || user.login}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground truncate">
                            @{user.login}
                          </p>
                          {user.bio && (
                            <p className="text-[11px] leading-snug text-muted-foreground line-clamp-2 mt-1.5 pt-1.5 border-t">
                              {user.bio}
                            </p>
                          )}
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    
                    <DropdownMenuSeparator className="my-2" />
                    
                    <div className="px-2 py-2">
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: 'Repos', value: user.public_repos || 0, color: 'from-blue-500/10 to-blue-500/5' },
                          { label: 'Followers', value: user.followers || 0, color: 'from-green-500/10 to-green-500/5' },
                          { label: 'Following', value: user.following || 0, color: 'from-purple-500/10 to-purple-500/5' },
                        ].map((stat, idx) => (
                          <motion.div 
                            key={stat.label}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className={`space-y-1 p-3 rounded-lg bg-gradient-to-br ${stat.color} hover:shadow-md transition-all cursor-default border border-border/50`}
                          >
                            <p className="text-lg font-bold tabular-nums">{stat.value}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">{stat.label}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <DropdownMenuSeparator className="my-2" />
                    
                    <DropdownMenuItem 
                      className="text-sm cursor-pointer rounded-md py-2.5 px-3"
                      onClick={() => window.open(user.html_url, "_blank")}
                    >
                      <Github className="mr-3 h-4 w-4" />
                      View GitHub Profile
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      className="text-sm cursor-pointer rounded-md py-2.5 px-3"
                      onClick={() => navigate("/dashboard")}
                    >
                      <User className="mr-3 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>

                    <DropdownMenuItem 
                      className="text-sm cursor-pointer rounded-md py-2.5 px-3"
                      onClick={() => navigate("/settings")}
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="my-2" />
                    
                    <div className="p-1">
                      <LogoutButton />
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <GitHubLoginButton />
              </motion.div>
            )}
          </div>
        </div>

        {/* Animated Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-blue-500 to-purple-500 origin-left shadow-lg shadow-primary/50"
          style={{
            scaleX: progressScale,
          }}
        />
      </motion.header>
    </TooltipProvider>
  );
}