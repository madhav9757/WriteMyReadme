"use client";

import { LayoutDashboard, Award } from "lucide-react";
import RepoList from "@/components/Repo/RepoList";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ReposSection({ user }) {
  return (
    <Card className="overflow-hidden shadow-xl">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex gap-3 items-center">
          <LayoutDashboard className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Your Repositories</CardTitle>
            <CardDescription>Select a project to generate README</CardDescription>
          </div>
        </div>

        <Badge variant="outline">
          <Award className="h-4 w-4 mr-1" />
          {user.public_repos}
        </Badge>
      </CardHeader>

      <Separator />

      <CardContent className="p-6">
        <RepoList />
      </CardContent>
    </Card>
  );
}
