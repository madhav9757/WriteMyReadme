"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

import RepoList from "@/components/Repo/RepoList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col bg-background text-foreground">
      <main className="flex-1 p-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-2xl font-bold mb-6"
        >
          Your Repositories
        </motion.h1>

        <ScrollArea className="h-[calc(85vh-6rem)] rounded-lg border">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 p-4"
          >
            <RepoList />
          </motion.div>
        </ScrollArea>
      </main>
    </div>
  );
}
