import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

// Validate environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase credentials');
}

// Log untuk debug (hapus di production)
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(0, 10) + '...');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request: Request) {
  try {
    // Test Supabase connection
    const { data: testData, error: testError } = await supabase
      .from('snippets')
      .select('count')
      .limit(1);

    if (testError) {
      console.error('Supabase connection test failed:', testError);
      return NextResponse.json(
        { error: 'Database connection failed', details: testError.message },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('Request body:', body);

    if (!body.content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('snippets')
      .insert({
        title: body.title,
        content: body.content,
        language: body.language || 'plaintext'
      })
      .select()
      .single();

    if (error) {
      console.error('Insert error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create snippet',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Snippets API is working" });
}

