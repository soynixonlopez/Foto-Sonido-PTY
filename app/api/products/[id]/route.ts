import { getMarketplaceProductById } from "@/lib/supabase/public";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });
  const product = await getMarketplaceProductById(id);
  if (!product) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json(product);
}
