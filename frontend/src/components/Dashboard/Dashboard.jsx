"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import DashboardHeader from "./DashboardHeader";
import StatsGrid from "./StatsGrid";
import ReposSection from "./ReposSection";
import FooterStatus from "./FooterStatus";
import DashboardSkeleton from "./DashboardSkeleton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function Dashboard() {
  const { user, loading, refreshUser } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshUser();
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (loading) return <DashboardSkeleton />;
  if (!user) return <AuthGate navigate={navigate} />;

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-8 p-4 md:p-8 lg:p-12"
    >
      <DashboardHeader
        user={user}
        headerY={headerY}
        headerOpacity={headerOpacity}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onGenerate={() => navigate("/generate")}
      />

      <StatsGrid user={user} />

      <ReposSection user={user} />

      <FooterStatus />
    </motion.div>
  );
}
