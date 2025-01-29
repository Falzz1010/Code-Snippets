"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Editor from "@monaco-editor/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Copy, FileUp, Share2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "sql", label: "SQL" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "xml", label: "XML" },
  { value: "yaml", label: "YAML" },
  { value: "markdown", label: "Markdown" },
  { value: "plaintext", label: "Plain Text" },
];

export default function NewSnippet() {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("plaintext");
  const [expirationEnabled, setExpirationEnabled] = useState(false);
  const [expirationDate, setExpirationDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateSnippet = async () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Content is required",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Log untuk debug
      console.log("Sending request to /api/snippets");
      
      const response = await fetch("/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim() || null,
          content: content.trim(),
          language: language || "plaintext"
        })
      });

      // Log response status
      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to create snippet");
      }

      toast({
        title: "Success",
        description: "Snippet created successfully",
      });

      // Redirect ke snippet yang baru dibuat
      router.push(`/snippets/${data.id}`);

    } catch (error) {
      console.error("Error creating snippet:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create snippet",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setContent(content);
      
      // Try to detect language from file extension
      const extension = file.name.split('.').pop()?.toLowerCase();
      const languageMap: Record<string, string> = {
        'js': 'javascript',
        'ts': 'typescript',
        'py': 'python',
        'java': 'java',
        'go': 'go',
        'rs': 'rust',
        'cpp': 'cpp',
        'cs': 'csharp',
        'php': 'php',
        'rb': 'ruby',
        'swift': 'swift',
        'kt': 'kotlin',
        'sql': 'sql',
        'html': 'html',
        'css': 'css',
        'json': 'json',
        'xml': 'xml',
        'yml': 'yaml',
        'yaml': 'yaml',
        'md': 'markdown',
        'txt': 'plaintext',
      };
      
      if (extension && languageMap[extension]) {
        setLanguage(languageMap[extension]);
      }
    };
    reader.readAsText(file);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <Tabs defaultValue="editor" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="upload">Upload File</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title (Optional)</Label>
              <Input
                id="title"
                placeholder="Enter a title for your code snippet"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editor">Code</Label>
              <div className="h-[500px] border rounded-md overflow-hidden">
                <Editor
                  height="100%"
                  defaultLanguage="plaintext"
                  language={language}
                  value={content}
                  onChange={(value) => setContent(value || "")}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="file">Upload Code File</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Label
                  htmlFor="file"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <FileUp className="h-12 w-12 text-muted-foreground mb-4" />
                  <span className="text-lg font-medium mb-2">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Supported file types: .txt, .js, .py, .java, and more
                  </span>
                </Label>
              </div>
            </div>
          </TabsContent>

          <div className="space-y-4 pt-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="expiration"
                checked={expirationEnabled}
                onCheckedChange={setExpirationEnabled}
              />
              <Label htmlFor="expiration">Set expiration date</Label>
            </div>

            {expirationEnabled && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !expirationDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expirationDate ? format(expirationDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={expirationDate}
                    onSelect={setExpirationDate}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}

            <Button
              className="w-full"
              onClick={handleCreateSnippet}
              disabled={isLoading || !content}
            >
              {isLoading ? (
                "Creating..."
              ) : (
                <>
                  <Share2 className="mr-2 h-4 w-4" />
                  Create Snippet
                </>
              )}
            </Button>
          </div>
        </Tabs>
      </Card>
    </main>
  );
}
