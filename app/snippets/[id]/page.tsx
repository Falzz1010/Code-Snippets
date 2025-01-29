import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { CodeBlock } from './components/code-block';
import { ShareButton } from './components/share-button';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function SnippetPage({ params }: { params: { id: string } }) {
  const { data: snippet, error } = await supabase
    .from('snippets')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !snippet) {
    notFound();
  }

  return (
    <div className="container max-w-4xl mx-auto p-4 md:p-8">
      <Card className="overflow-hidden border bg-card">
        {/* Header */}
        <div className="border-b p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-tight">
                {snippet.title || 'Untitled Snippet'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <ShareButton 
                snippetId={snippet.id} 
                title={snippet.title || 'Code Snippet'} 
              />
              <Badge variant="secondary" className="capitalize">
                {snippet.language || 'plaintext'}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="mr-2 h-4 w-4" />
            <time dateTime={snippet.created_at}>
              {new Date(snippet.created_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <CodeBlock 
            code={snippet.content} 
            language={snippet.language || 'plaintext'} 
          />
        </div>

        {/* Footer */}
        <div className="bg-muted/40 p-6 flex items-center justify-between text-sm text-muted-foreground">
          <div>
            ID: {snippet.id}
          </div>
          {snippet.expires_at && (
            <div>
              Expires: {new Date(snippet.expires_at).toLocaleDateString()}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

