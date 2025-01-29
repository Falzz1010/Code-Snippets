import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container max-w-4xl mx-auto p-4 md:p-8">
      <Card className="p-6">
        <div className="flex items-center space-x-3 text-yellow-600 dark:text-yellow-500">
          <AlertCircle className="h-6 w-6" />
          <h2 className="text-xl font-semibold">Snippet Not Found</h2>
        </div>
        <p className="mt-3 text-muted-foreground">
          The snippet you're looking for doesn't exist or has been removed.
        </p>
      </Card>
    </div>
  );
}
