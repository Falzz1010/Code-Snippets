'use client';

import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";

export default function Error() {
  return (
    <div className="container max-w-4xl mx-auto p-4 md:p-8">
      <Card className="p-6">
        <div className="flex items-center space-x-3 text-destructive">
          <XCircle className="h-6 w-6" />
          <h2 className="text-xl font-semibold">Error Loading Snippet</h2>
        </div>
        <p className="mt-3 text-muted-foreground">
          There was a problem loading this snippet. Please try again later.
        </p>
      </Card>
    </div>
  );
}
