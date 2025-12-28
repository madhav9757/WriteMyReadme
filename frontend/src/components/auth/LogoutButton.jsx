"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function LogoutButton() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      toast.success("Signed out successfully");
    } catch (err) {
      console.error(err);
      toast.error("Sign out failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleLogout}
              variant="ghost"
              disabled={loading}
              className="h-8 w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all group overflow-hidden"
            >
              {loading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" />
              ) : (
                <LogOut className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5 mr-2" />
              )}
              
              <span className="text-xs font-medium">
                {loading ? "Signing out..." : "Sign out"}
              </span>
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="md:hidden">
          <p className="text-[10px] font-medium">Sign out</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}