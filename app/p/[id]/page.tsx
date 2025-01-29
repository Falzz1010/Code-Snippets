"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/supabase/db";
import { snippets } from "@/lib/supabase/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
import { Copy, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SnippetPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const [snippet, setSnippet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const response = await fetch(`/api/snippets/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch snippet");
        const data = await response.json();
        setSnippet(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load snippet",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [params.id, toast]);

  if (loading) return <div>Loading...</div>;
  if (!snippet) return <div>Snippet not found</div>;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.content);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy code",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([snippet.content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${snippet.title || "code"}.${snippet.language}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Copied!",
        description: "Link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              {snippet.title && (
                <h1 className="text-2xl font-bold">{snippet.title}</h1>
              )}
              <p className="text-sm text-muted-foreground">
                {new Date(snippet.created_at).toLocaleString()}
                {snippet.expires_at && (
                  <> · Expires: {new Date(snippet.expires_at).toLocaleString()}</>
                )}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="h-[500px] border rounded-md overflow-hidden">
            <Editor
              height="100%"
              language={snippet.language}
              value={snippet.content}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                readOnly: true,
                automaticLayout: true,
              }}
            />
          </div>
        </div>
      </Card>
    </main>
  );
}