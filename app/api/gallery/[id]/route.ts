import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data: image, error: fetchError } = await supabase
    .from("gallery_images")
    .select("src")
    .eq("id", id)
    .single();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 404 });
  }

  // Extract file name from public URL
  const fileName = image.src.split("/").pop();
  if (fileName) {
    await supabase.storage.from("gallery").remove([fileName]);
  }

  const { error } = await supabase.from("gallery_images").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
