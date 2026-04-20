import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const routes = await prisma.route.findMany({
      include: {
        origin: true,
        destination: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(routes);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch routes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const route = await prisma.route.create({
      data: {
        originId: body.originId,
        destinationId: body.destinationId,
        flightTime: body.flightTime,
        price: parseInt(body.price),
        status: body.status || "active",
      },
      include: {
        origin: true,
        destination: true,
      },
    });
    return NextResponse.json(route);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create route" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const route = await prisma.route.update({
      where: { id: body.id },
      data: {
        originId: body.originId,
        destinationId: body.destinationId,
        flightTime: body.flightTime,
        price: parseInt(body.price),
        status: body.status,
      },
      include: {
        origin: true,
        destination: true,
      },
    });
    return NextResponse.json(route);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update route" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    
    await prisma.route.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete route" }, { status: 500 });
  }
}
