import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json({
    id: data.id,
    title: data.title,
    description: data.description,
    date: data.date,
    location: data.location,
    imageUrl: data.image_url,
    recap: data.recap,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  const { data, error } = await supabase
    .from("events")
    .update({
      title: body.title,
      description: body.description,
      date: body.date,
      location: body.location,
      recap: body.recap ?? null,
    })
    .eq("id", id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    id: data.id,
    title: data.title,
    description: data.description,
    date: data.date,
    location: data.location,
    imageUrl: data.image_url,
    recap: data.recap,
  });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return new NextResponse(null, { status: 204 });
}
