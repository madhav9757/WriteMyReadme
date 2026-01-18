"use client";

import { motion } from "framer-motion";
import { GitBranch, Star, Zap, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function StatsGrid({ user }) {
  const stats = [
    {
      label: "Repositories",
      value: user.public_repos,
      icon: GitBranch,
      trend: "+12%",
    },
    {
      label: "Followers",
      value: user.followers,
      icon: Star,
      trend: "+8%",
    },
    {
      label: "Plan",
      value: user.plan?.name || "Free",
      icon: Zap,
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <motion.div key={stat.label} whileHover={{ y: -4 }}>
          <Card className="overflow-hidden">
            <CardContent className="flex items-center gap-4 p-6">
              <stat.icon className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <p className="text-xs uppercase text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              {stat.trend && (
                <Badge variant="secondary">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.trend}
                </Badge>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
