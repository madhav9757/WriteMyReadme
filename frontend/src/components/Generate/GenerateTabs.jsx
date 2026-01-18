import { Eye, Code2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GenerateTabs({ view, setView }) {
  return (
    <Tabs value={view} onValueChange={setView} className="hidden md:block">
      <TabsList className="h-9">
        <TabsTrigger value="preview" className="gap-2 text-xs">
          <Eye className="h-3.5 w-3.5" /> Preview
        </TabsTrigger>
        <TabsTrigger value="code" className="gap-2 text-xs">
          <Code2 className="h-3.5 w-3.5" /> Source
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
