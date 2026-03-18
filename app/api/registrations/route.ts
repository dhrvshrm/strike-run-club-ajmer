import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { Registration } from "@/lib/data";

export async function GET() {
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const registrations: Registration[] = (data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone,
    experienceLevel: r.experience_level,
    createdAt: r.created_at,
  }));

  return NextResponse.json(registrations);
}

export async function POST(request: Request) {
  const { name, email, phone, experienceLevel } = await request.json();

  const { data, error } = await supabase
    .from("registrations")
    .insert({ name, email, phone, experience_level: experienceLevel })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const registration: Registration = {
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    experienceLevel: data.experience_level,
    createdAt: data.created_at,
  };

  return NextResponse.json(registration, { status: 201 });
}
