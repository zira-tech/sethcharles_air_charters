import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
        aircraft: true,
      },
      orderBy: { createdAt: "desc" },
    });
    
    const routeIds = bookings.filter(b => b.routeId).map(b => b.routeId!);
    const routes = routeIds.length > 0 
      ? await prisma.route.findMany({
          where: { id: { in: routeIds } },
          include: { origin: true, destination: true },
        })
      : [];
    const routesMap = new Map(routes.map(r => [r.id, r]));
    
    const result = bookings.map(b => ({
      ...b,
      route: b.routeId ? routesMap.get(b.routeId) || null : null,
    }));
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log('Creating booking with data:', JSON.stringify(body, null, 2));
    
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const isCallback = body.type === "callback" || body.type === "callback_request";
    let reference = isCallback ? "SETH-CB-" : "SETH-";
    for (let i = 0; i < 6; i++) {
      reference += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const bookingData: any = {
      reference,
      type: isCallback ? "callback" : (body.type || "booking"),
      currency: body.currency || "USD",
      status: isCallback ? "callback_requested" : "pending",
      paymentStatus: isCallback ? "awaiting_contact" : "pending",
      contactEmail: body.email || null,
      contactPhone: body.phone || null,
      contactName: body.firstName && body.lastName ? `${body.firstName} ${body.lastName}` : null,
      tripDetails: body.tripDetails || null,
      tripType: body.tripType || "one-way",
      passengers: body.passengers ? parseInt(body.passengers) : null,
      subtotal: body.subtotal ? parseInt(body.subtotal) : 0,
      taxes: body.taxes ? parseInt(body.taxes) : 0,
      total: body.total ? parseInt(body.total) : 0,
    };

    if (body.aircraftId) bookingData.aircraftId = body.aircraftId;
    if (body.routeId) bookingData.routeId = body.routeId;
    if (body.userId) bookingData.userId = body.userId;
    if (body.date) {
      bookingData.date = new Date(body.date);
    } else {
      bookingData.date = null;
    }
    if (body.returnDate) bookingData.returnDate = new Date(body.returnDate);
    if (body.passengerDetails) bookingData.passengerDetails = JSON.stringify(body.passengerDetails);
    if (body.conciergeServices) bookingData.conciergeServices = JSON.stringify(body.conciergeServices);

    console.log('Creating booking with parsed data:', JSON.stringify(bookingData, null, 2));

    const booking = await prisma.booking.create({
      data: bookingData,
    });

    console.log('Booking created successfully:', booking);
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json({ error: "Failed to create booking", details: String(error) }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    const booking = await prisma.booking.update({
      where: { id },
      data: {
        status: status || undefined,
        notes: notes !== undefined ? notes : undefined,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Booking update error:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
