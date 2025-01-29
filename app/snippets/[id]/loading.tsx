import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container max-w-4xl mx-auto p-4 md:p-8">
      <Card className="overflow-hidden">
        <div className="border-b p-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-6 w-[100px]" />
          </div>
          <Skeleton className="h-5 w-[150px]" />
        </div>

        <div className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        <div className="bg-muted/40 p-6">
          <Skeleton className="h-5 w-[200px]" />
        </div>
      </Card>
    </div>
  );
}
