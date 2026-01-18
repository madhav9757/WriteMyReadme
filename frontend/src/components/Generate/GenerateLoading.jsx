import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function GenerateLoading() {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-8 text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Sparkles className="h-8 w-8 text-primary animate-pulse" />
        </div>
        <h3 className="text-lg font-semibold">Enhancing README</h3>
        <div className="space-y-3 max-w-md mx-auto">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6 mx-auto" />
          <Skeleton className="h-3 w-4/6 mx-auto" />
        </div>
      </CardContent>
    </Card>
  );
}
