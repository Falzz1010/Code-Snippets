import { NextResponse } from "next/server";
import { db } from "@/lib/supabase/db";
import { snippets } from "@/lib/supabase/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [snippet] = await db
      .select()
      .from(snippets)
      .where(eq(snippets.id, params.id));

    if (!snippet) {
      return NextResponse.json(
        { error: "Snippet not found" },
        { status: 404 }
      );
    }

    // Check if snippet has expired
    if (snippet.expires_at && new Date(snippet.expires_at) < new Date()) {
      return NextResponse.json(
        { error: "Snippet has expired" },
        { status: 410 }
      );
    }

    return NextResponse.json(snippet);
  } catch (error) {
    console.error("Failed to fetch snippet:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}