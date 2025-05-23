import { NextResponse } from "next/server";
import db from "@/lib/database/db";
import Cards from "@/lib/database/models/cards.model";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const deckType = searchParams.get("deckType");
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "60");

  try {
    await db();

    const query = {
      ...(deckType && { deckType }),
      ...(search && { name: { $regex: new RegExp(search, "i") } }),
    };

    const cards = await Cards.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-__v")
      .lean();

    return NextResponse.json(cards, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: `Failed to getCards: ${(e as Error).message}` }, { status: 500 });
  }
}
