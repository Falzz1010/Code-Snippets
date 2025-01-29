import { Button } from "@/components/ui/button";
import { Code2, Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <div className="space-y-4">
          <Code2 className="mx-auto h-16 w-16" />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Share Your Code Snippets
          </h1>
          <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
            A simple and elegant way to share code snippets, error logs, and more. Anonymous sharing made easy.
          </p>
        </div>
        <div className="space-x-4">
          <Button asChild size="lg">
            <Link href="/new">
              <Plus className="mr-2 h-4 w-4" />
              Create New Paste
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/docs">
              Documentation
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}