"use client";

import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LogoutButton() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout(); // clears AuthContext + localStorage
      toast({ title: "Logged out successfully", type: "success" });
    } catch (err) {
      console.error(err);
      toast({ title: "Failed to logout", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={handleLogout}
        variant="secondary"
        className="flex items-center gap-2"
        disabled={loading}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-gray-200 border-t-transparent rounded-full animate-spin" />
        ) : (
          <LogOut className="w-5 h-5" />
        )}
        {loading ? "Logging out..." : "Logout"}
      </Button>
    </motion.div>
  );
}
