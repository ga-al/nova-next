import { NextResponse } from "next/server";

const MAX_FIELD = 2000;

/**
 * Portfolio demo endpoint: validates the payload and acknowledges success.
 * It does not send email or persist data — keep UI copy aligned with that.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const contact =
      typeof body.contact === "string" ? body.contact.trim() : "";
    const message =
      typeof body.message === "string" ? body.message.trim() : "";
    const consent = body.consent === true;

    if (!name || !contact || !message || !consent) {
      return NextResponse.json(
        { error: "Name, contact, message and consent are required" },
        { status: 400 },
      );
    }

    if (
      name.length > MAX_FIELD ||
      contact.length > MAX_FIELD ||
      message.length > MAX_FIELD
    ) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    return NextResponse.json({ ok: true, demo: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
