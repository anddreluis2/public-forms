import { NextResponse } from "next/server";
import { instruments } from "../route";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const instrument = instruments.find((i) => i.id === params.id);
  if (!instrument) {
    return NextResponse.json(
      { error: "Instrument not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(instrument);
}
