import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const aircraft = await prisma.aircraft.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(aircraft);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch aircraft" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const aircraft = await prisma.aircraft.create({
      data: {
        name: body.name,
        category: body.category,
        passengers: parseInt(body.passengers),
        range: parseInt(body.range),
        speed: parseInt(body.speed),
        baggage: parseInt(body.baggage) || 0,
        price: parseInt(body.price),
        image: body.image || "",
        features: body.features || "",
        status: body.status || "active",
      },
    });
    return NextResponse.json(aircraft);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create aircraft" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const aircraft = await prisma.aircraft.update({
      where: { id: body.id },
      data: {
        name: body.name,
        category: body.category,
        passengers: parseInt(body.passengers),
        range: parseInt(body.range),
        speed: parseInt(body.speed),
        baggage: parseInt(body.baggage) || 0,
        price: parseInt(body.price),
        image: body.image,
        features: body.features,
        status: body.status,
      },
    });
    return NextResponse.json(aircraft);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update aircraft" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    
    await prisma.aircraft.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete aircraft" }, { status: 500 });
  }
}
