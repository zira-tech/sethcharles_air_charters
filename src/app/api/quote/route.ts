import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { origin, destination, date, passengers, tripType, returnDate } = body;

    // Find route
    const route = await prisma.route.findFirst({
      where: {
        origin: { code: origin },
        destination: { code: destination },
      },
      include: {
        origin: true,
        destination: true,
      },
    });

    if (!route) {
      return NextResponse.json({ error: "Route not found" }, { status: 404 });
    }

    // Find suitable aircraft
    const aircraft = await prisma.aircraft.findMany({
      where: {
        passengers: { gte: parseInt(passengers) },
        status: "active",
      },
      orderBy: { price: "asc" },
    });

    // Get settings
    const settings = await prisma.setting.findMany();
    const taxRate = parseFloat(settings.find((s) => s.key === "tax_rate")?.value || "16") / 100;
    const returnDiscount = parseFloat(settings.find((s) => s.key === "return_discount")?.value || "20") / 100;

    // Calculate prices
    const basePrice = route.price;
    const tripMultiplier = tripType === "return" ? (1 + returnDiscount) : 1;
    const quotes = aircraft.map((a) => {
      const legPrice = a.price;
      const totalLegs = tripType === "multi-leg" ? 2.5 : (tripType === "return" ? 1.8 : 1);
      const price = legPrice * totalLegs;
      const taxes = price * taxRate;
      return {
        aircraft: {
          id: a.id,
          name: a.name,
          category: a.category,
          passengers: a.passengers,
          image: a.image,
        },
        route: {
          origin: route.origin,
          destination: route.destination,
          flightTime: route.flightTime,
        },
        subtotal: Math.round(price),
        taxes: Math.round(taxes),
        total: Math.round(price + taxes),
        currency: "USD",
      };
    });

    return NextResponse.json({
      success: true,
      quotes,
      date,
      returnDate,
      passengers,
      tripType,
    });
  } catch (error) {
    console.error("Quote error:", error);
    return NextResponse.json({ error: "Failed to generate quote" }, { status: 500 });
  }
}
