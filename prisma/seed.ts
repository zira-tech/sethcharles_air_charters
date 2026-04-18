import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create locations
  const nbo = await prisma.location.create({
    data: { name: "Nairobi (Jomo Kenyatta)", code: "NBO", city: "Nairobi", airport: "Jomo Kenyatta International Airport" },
  });

  const mra = await prisma.location.create({
    data: { name: "Masai Mara (Keekorok)", code: "MRA", city: "Masai Mara", airport: "Keekorok Airstrip" },
  });

  const mba = await prisma.location.create({
    data: { name: "Mombasa (Moi)", code: "MBA", city: "Mombasa", airport: "Moi International Airport" },
  });

  const aso = await prisma.location.create({
    data: { name: "Amboseli", code: "ASO", city: "Amboseli", airport: "Amboseli Airport" },
  });

  const lau = await prisma.location.create({
    data: { name: "Lamu", code: "LAU", city: "Lamu", airport: "Lamu Airport" },
  });

  const zanzibar = await prisma.location.create({
    data: { name: "Zanzibar", code: "ZNZ", city: "Zanzibar", airport: "Abeid Amani Karume International Airport" },
  });

  const jnb = await prisma.location.create({
    data: { name: "Johannesburg", code: "JNB", city: "Johannesburg", airport: "O.R. Tambo International Airport" },
  });

  const dxb = await prisma.location.create({
    data: { name: "Dubai", code: "DXB", city: "Dubai", airport: "Dubai International Airport" },
  });

  // Create aircraft
  await prisma.aircraft.create({
    data: {
      name: "Citation Mustang",
      category: "light",
      passengers: 4,
      range: 2150,
      speed: 630,
      baggage: 6,
      price: 4500,
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80",
      features: "WiFi, Pressurized Cabin, Lavatory, Club Seating",
      status: "active",
    },
  });

  await prisma.aircraft.create({
    data: {
      name: "Learjet 75",
      category: "light",
      passengers: 8,
      range: 3700,
      speed: 860,
      baggage: 8,
      price: 6800,
      image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=80",
      features: "WiFi, Full Stand-Up Cabin, Galley, Entertainment System",
      status: "active",
    },
  });

  await prisma.aircraft.create({
    data: {
      name: "Citation XLS+",
      category: "midsize",
      passengers: 9,
      range: 3800,
      speed: 800,
      baggage: 10,
      price: 8500,
      image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=80",
      features: "WiFi, Satellite Phone, Full Galley, Private Lavatory",
      status: "active",
    },
  });

  await prisma.aircraft.create({
    data: {
      name: "Gulfstream G280",
      category: "midsize",
      passengers: 10,
      range: 6000,
      speed: 850,
      baggage: 14,
      price: 12000,
      image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80",
      features: "WiFi, Bed Configuration, Shower Available, Catering Service",
      status: "active",
    },
  });

  await prisma.aircraft.create({
    data: {
      name: "Gulfstream G450",
      category: "heavy",
      passengers: 16,
      range: 8100,
      speed: 850,
      baggage: 20,
      price: 18000,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
      features: "WiFi, Multiple Living Areas, Full Galley, Crew Rest Area",
      status: "maintenance",
    },
  });

  await prisma.aircraft.create({
    data: {
      name: "Global 6000",
      category: "heavy",
      passengers: 17,
      range: 11400,
      speed: 900,
      baggage: 24,
      price: 22000,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
      features: "WiFi, Stand-Up Cabin, Private Stateroom, Gourmet Galley",
      status: "active",
    },
  });

  // Create routes
  await prisma.route.create({
    data: { originId: nbo.id, destinationId: mra.id, flightTime: "1h 15m", price: 4500, status: "active" },
  });

  await prisma.route.create({
    data: { originId: nbo.id, destinationId: mba.id, flightTime: "1h 10m", price: 5200, status: "active" },
  });

  await prisma.route.create({
    data: { originId: nbo.id, destinationId: aso.id, flightTime: "45m", price: 3200, status: "active" },
  });

  await prisma.route.create({
    data: { originId: nbo.id, destinationId: lau.id, flightTime: "1h 30m", price: 6800, status: "active" },
  });

  await prisma.route.create({
    data: { originId: nbo.id, destinationId: zanzibar.id, flightTime: "1h 20m", price: 5900, status: "active" },
  });

  await prisma.route.create({
    data: { originId: nbo.id, destinationId: jnb.id, flightTime: "4h 30m", price: 18500, status: "active" },
  });

  await prisma.route.create({
    data: { originId: nbo.id, destinationId: dxb.id, flightTime: "5h 00m", price: 22000, status: "active" },
  });

  // Create testimonials
  await prisma.testimonial.create({
    data: {
      quote: "Sethcharles Air Charters transformed our safari into an unforgettable journey. From Nairobi to the Masai Mara in absolute comfort.",
      author: "James M.",
      title: "Private Equity Partner, London",
      initials: "JM",
      status: "active",
    },
  });

  await prisma.testimonial.create({
    data: {
      quote: "The attention to detail is remarkable. They coordinated our entire East African expedition seamlessly.",
      author: "Sarah K.",
      title: "CEO, Tech Startup",
      initials: "SK",
      status: "active",
    },
  });

  await prisma.testimonial.create({
    data: {
      quote: "When time matters, Sethcharles delivers. Last-minute booking, flawless execution.",
      author: "David O.",
      title: "Film Producer, Los Angeles",
      initials: "DO",
      status: "active",
    },
  });

  // Create settings
  await prisma.setting.create({
    data: { key: "tax_rate", value: "16" },
  });

  await prisma.setting.create({
    data: { key: "currency", value: "USD" },
  });

  await prisma.setting.create({
    data: { key: "kes_rate", value: "155" },
  });

  await prisma.setting.create({
    data: { key: "eur_rate", value: "0.92" },
  });

  await prisma.setting.create({
    data: { key: "gbp_rate", value: "0.79" },
  });

  await prisma.setting.create({
    data: { key: "minimum_notice_hours", value: "4" },
  });

  await prisma.setting.create({
    data: { key: "return_discount", value: "20" },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
