import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(locations);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const location = await prisma.location.create({
      data: {
        name: body.name,
        code: body.code.toUpperCase(),
        city: body.city,
        airport: body.airport || "",
      },
    });
    return NextResponse.json(location);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create location" }, { status: 500 });
  }
}
