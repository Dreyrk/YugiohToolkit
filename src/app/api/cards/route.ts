import { NextResponse } from "next/server";
import db from "@/lib/database/db";
import Cards from "@/lib/database/models/cards.model";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const deckTypeParams = searchParams.get("deckType")?.trim();
  const types = searchParams.get("types");
  const search = searchParams.get("search")?.trim() || "";
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "60");

  try {
    await db();

    const deckType = deckTypeParams === "side" ? { $in: ["main", "extra"] } : deckTypeParams;

    const query = {
      ...(deckType && { deckType }),
      ...(search && { name: { $regex: new RegExp(search, "i") } }),
      ...(types && {
        type: {
          $in: types
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        },
      }),
    };

    const cards = await Cards.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json(cards, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: `Failed to getCards: ${(e as Error).message}` }, { status: 500 });
  }
}
