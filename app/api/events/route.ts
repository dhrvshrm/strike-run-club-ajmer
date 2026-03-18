import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const events = (data ?? []).map((e) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    date: e.date,
    location: e.location,
    imageUrl: e.image_url,
    recap: e.recap,
  }));

  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const { title, description, date, location, imageUrl, recap } =
    await request.json();

  const { data, error } = await supabase
    .from("events")
    .insert({ title, description, date, location, image_url: imageUrl, recap })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    {
      id: data.id,
      title: data.title,
      description: data.description,
      date: data.date,
      location: data.location,
      imageUrl: data.image_url,
      recap: data.recap,
    },
    { status: 201 }
  );
}
