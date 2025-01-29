'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';

// Copy button component
function CopyButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className="absolute top-2 right-2 h-8 w-8 p-0"
      onClick={copy}
    >
      {isCopied ? (
        <Check className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      <span className="sr-only">Copy code</span>
    </Button>
  );
}

// Code block component
export function CodeBlock({ code, language }: { code: string; language: string }) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by rendering simple pre tag initially
  if (!mounted) {
    return (
      <div className="relative">
        <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
          <code className="text-sm">{code}</code>
        </pre>
      </div>
    );
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const syntaxTheme = currentTheme === 'dark' ? oneDark : oneLight;

  return (
    <div className="relative">
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={syntaxTheme}
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          padding: '1rem',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}
        PreTag="div"
      >
        {code}
      </SyntaxHighlighter>
      <CopyButton text={code} />
    </div>
  );
}
