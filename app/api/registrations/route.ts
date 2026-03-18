import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { Registration } from "@/lib/data";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "Strike Run Club <onboarding@resend.dev>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

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

  const { data: existing } = await supabase
    .from("registrations")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: "This email is already registered." },
      { status: 409 }
    );
  }

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

  await Promise.all([
    // Confirmation to registrant
    resend.emails.send({
      from: FROM,
      to: registration.email,
      subject: "Welcome to Strike Run Club!",
      html: `
        <p>Hi ${registration.name},</p>
        <p>You're officially registered for <strong>Strike Run Club</strong>! We're thrilled to have you.</p>
        <p>Experience level: <strong>${registration.experienceLevel}</strong></p>
        <p>We'll be in touch soon with next steps. Lace up!</p>
        <p>— The Strike Run Club Team</p>
      `,
    }),
    // Notification to admin
    resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `New registration: ${registration.name}`,
      html: `
        <p>A new member just registered:</p>
        <ul>
          <li><strong>Name:</strong> ${registration.name}</li>
          <li><strong>Email:</strong> ${registration.email}</li>
          <li><strong>Phone:</strong> ${registration.phone}</li>
          <li><strong>Experience:</strong> ${registration.experienceLevel}</li>
        </ul>
      `,
    }),
  ]);

  return NextResponse.json(registration, { status: 201 });
}
