"use client";

import { motion } from "framer-motion";
import { GitBranch, Star, Zap, Code2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function StatsGrid({ user }) {
  const stats = [
    {
      label: "Repositories",
      value: user.public_repos,
      icon: Code2,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      label: "Followers",
      value: user.followers,
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      label: "Plan",
      value: user.plan?.name || "Free",
      icon: Zap,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * idx }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <Card className="overflow-hidden border-border/50 bg-background/50 hover:bg-background/80 transition-colors shadow-sm hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-4 lg:p-5">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} border ${stat.border}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
