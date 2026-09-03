import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "alabsyabdelrhman@gmail.com";
  const password = process.env.ADMIN_PASSWORD ?? "abdo.elwa@yahoo.com";
  const name = process.env.ADMIN_NAME ?? "Absy Abdelrhman";

  const hashed = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: { password: hashed, name },
    create: { email, password: hashed, name },
  });

  const defaultFlags = [
    { key: "nav-sea", value: "true" },
    { key: "nav-adventure", value: "true" },
    { key: "nav-stays", value: "true" },
    { key: "nav-spots", value: "true" },
    { key: "nav-eats", value: "true" },
    { key: "nav-experiences", value: "true" },
    { key: "section_hero", value: "true" },
    { key: "section_mood_grid", value: "true" },
    { key: "section_featured_sea", value: "true" },
    { key: "section_adventure", value: "true" },
    { key: "section_stays", value: "true" },
    { key: "section_spots_eats", value: "true" },
    { key: "section_day_planner", value: "true" },
  ];

  for (const flag of defaultFlags) {
    await prisma.siteConfig.upsert({
      where: { key: flag.key },
      update: {},
      create: flag,
    });
  }

  // --- Sea Packages ---
  const seaPackages = [
    {
      title: "Half-Day Speedboat",
      slug: "half-day-speedboat",
      description: "3 hours of pure speed. Two snorkel stops, crystal water, no crowd.",
      duration: "3 hours",
      boatType: "Speedboat",
      maxGuests: 12,
      priceFrom: 75,
      inclusions: ["Snorkel gear", "Soft drinks", "Fruits", "Capt. & crew"],
      exclusions: ["Hotel transfer", "Lunch", "Underwater camera"],
      timeline: [
        { time: "09:00", title: "Departure from Marina", description: "Board at Hurghada Marina. Safety briefing and departure." },
        { time: "09:45", title: "First Snorkel Stop", description: "Coral garden snorkeling. Fish, color, crystal water." },
        { time: "10:45", title: "Lagoon Break", description: "Hidden lagoon. Knee-deep turquoise, pure relaxation." },
        { time: "11:30", title: "Second Snorkel Stop", description: "Deeper reef with more marine life." },
        { time: "12:30", title: "Return to Marina", description: "Ride back with the wind." },
      ],
      specs: { Vessel: "Twin-engine speedboat", Speed: "40+ knots", Crew: "Captain + deckhand", Safety: "Life jackets, first aid, VHF radio" },
      addOns: [
        { name: "GoPro Underwater Camera", price: 25, description: "4K footage of your trip" },
        { name: "Fruit & Juice Package", price: 15, description: "Tropical fruits & fresh juices" },
      ],
      gallery: [
        { src: "/images/speedboat/speedboat-frame-1.jpg", alt: "Speedboat in turquoise water" },
        { src: "/images/speedboat/speedboat-frame-2.jpg", alt: "Fresh fruit on board" },
        { src: "/images/speedboat/speedboat-frame-3.jpg", alt: "Boat at reef anchor" },
      ],
      coverImage: "/images/speedboat/speedboat-frame-1.jpg",
      featured: true,
      order: 1,
    },
    {
      title: "Full-Day Island Hopping",
      slug: "full-day-island-hopping",
      description: "Mahmya, Giftun, and hidden sandbars. Lunch on the beach.",
      duration: "8 hours",
      boatType: "Motor yacht",
      maxGuests: 20,
      priceFrom: 120,
      inclusions: ["Lunch", "Snorkel gear", "Soft drinks", "Fruits", "Capt. & crew", "Hotel transfer"],
      exclusions: ["Underwater camera", "Alcoholic drinks", "Tips"],
      timeline: [
        { time: "08:00", title: "Departure", description: "Board at Marina. Coffee, pastries, open sea ahead." },
        { time: "09:30", title: "Mahmya Island", description: "White sand beach, turquoise shallows, reef off the shore." },
        { time: "11:30", title: "Snorkel at Giftun", description: "Giftun National Park. Coral gardens, sea turtles." },
        { time: "13:00", title: "Beach Lunch", description: "Picnic on the sand. Grilled fish, fresh salads." },
        { time: "14:30", title: "Hidden Sandbar", description: "Sandbar at low tide. Crystal water, zero crowds." },
        { time: "16:00", title: "Return", description: "Cruise back as the sun lowers." },
      ],
      specs: { Vessel: "Motor yacht with sun deck", Islands: "2-3 stops", Lunch: "Beach picnic included", Activities: "Snorkeling, swimming, sunbathing" },
      addOns: [
        { name: "VIP Seafood Lunch", price: 40, description: "Fresh seafood feast on the island" },
        { name: "Professional Photographer", price: 50, description: "Drone + underwater photos" },
      ],
      gallery: [
        { src: "/images/hero-beach.jpg", alt: "White sand beach at golden hour" },
        { src: "/images/hero-turquoise.jpg", alt: "Turquoise lagoon from above" },
        { src: "/images/speedboat/speedboat-frame-3.jpg", alt: "Boat at island anchor" },
      ],
      coverImage: "/images/hero-beach.jpg",
      featured: true,
      order: 2,
    },
    {
      title: "Sunset Sail",
      slug: "sunset-sail",
      description: "Golden hour on the water. Drinks, music, and a sky that catches fire.",
      duration: "2.5 hours",
      boatType: "Sailing yacht",
      maxGuests: 15,
      priceFrom: 65,
      inclusions: ["Soft drinks", "Snacks", "Crew"],
      exclusions: ["Hotel transfer", "Dinner", "Private charter"],
      timeline: [
        { time: "16:30", title: "Board & Settle", description: "Step aboard. Welcome drink, golden hour begins." },
        { time: "17:00", title: "Sail Out", description: "Hoist the sails. Leave the marina behind." },
        { time: "17:30", title: "Golden Hour", description: "The sky changes color every minute." },
        { time: "17:45", title: "The Sunset", description: "Sun hits the horizon. Liquid gold." },
        { time: "18:00", title: "Twilight Cruise", description: "Sky turns purple. Music plays, drinks flow." },
        { time: "18:30", title: "Return", description: "Glide back under the first stars." },
      ],
      specs: { Vessel: "Traditional sailing yacht", Pace: "Relaxed, no rushing", Drinks: "Complimentary cocktails & snacks", Music: "Curated sunset playlist" },
      addOns: [
        { name: "Professional Photographer", price: 50, description: "Golden hour portraits on the yacht" },
      ],
      gallery: [
        { src: "/images/sea-sunset.jpg", alt: "Golden hour on the Red Sea" },
        { src: "/images/speedboat/speedboat-frame-2.jpg", alt: "Sailing yacht at sunset" },
        { src: "/images/speedboat/speedboat-moment-1.jpg", alt: "Twilight on the water" },
      ],
      coverImage: "/images/sea-sunset.jpg",
      featured: true,
      order: 3,
    },
    {
      title: "Private Boat Day",
      slug: "private-boat-day",
      description: "Your boat, your captain, your route. Fully customizable.",
      duration: "Full day",
      boatType: "Private yacht",
      maxGuests: 10,
      priceFrom: 350,
      inclusions: ["Private captain", "Custom route", "Lunch", "Snorkel gear", "Soft drinks"],
      exclusions: ["Alcoholic drinks (available for purchase)", "Underwater camera"],
      timeline: [
        { time: "08:00", title: "Your Way", description: "Board your private yacht. Discuss the day with your captain." },
        { time: "09:00", title: "First Stop", description: "Reef, island, or open water. Your choice." },
        { time: "11:00", title: "Second Stop", description: "New water, new fish, new view." },
        { time: "13:00", title: "Lunch on Board", description: "Private chef prepares lunch. Seafood, salads, cold rosé." },
        { time: "15:00", title: "Afternoon Adventure", description: "Snorkeling, swimming, or floating in turquoise silence." },
        { time: "17:00", title: "Sunset Return", description: "Cruise back as the sky turns gold." },
      ],
      specs: { Vessel: "Private motor yacht", Captain: "Dedicated private captain", Customization: "Fully custom route", Service: "Private steward on board" },
      addOns: [
        { name: "GoPro Underwater Camera", price: 25, description: "4K underwater footage" },
        { name: "VIP Seafood Lunch", price: 40, description: "Fresh seafood feast" },
        { name: "Professional Photographer", price: 50, description: "Drone + underwater photos" },
      ],
      gallery: [
        { src: "/images/speedboat/speedboat-frame-2.jpg", alt: "Fresh fruit on private yacht" },
        { src: "/images/speedboat/speedboat-frame-1.jpg", alt: "Private yacht in open water" },
        { src: "/images/sea-sunset.jpg", alt: "Sunset from the yacht deck" },
      ],
      coverImage: "/images/speedboat/speedboat-frame-2.jpg",
      featured: false,
      order: 4,
    },
    {
      title: "Snorkeling Safari",
      slug: "snorkeling-safari",
      description: "Three reefs, two hours each. The underwater world, unfiltered.",
      duration: "6 hours",
      boatType: "Motor boat",
      maxGuests: 15,
      priceFrom: 85,
      inclusions: ["Snorkel guide", "Snorkel gear", "Lunch", "Soft drinks"],
      exclusions: ["Hotel transfer", "Underwater camera", "Wetsuit rental"],
      timeline: [
        { time: "08:30", title: "Board & Briefing", description: "Gear fitting, safety talk, reef overview." },
        { time: "09:00", title: "Reef One: Garden Reef", description: "Shallow coral garden. Clownfish, parrotfish." },
        { time: "10:30", title: "Reef Two: Wall Dive", description: "Vertical coral wall. Schools of barracuda." },
        { time: "12:00", title: "Beach Lunch", description: "Stop at a quiet sandbar. Lunch on the beach." },
        { time: "13:00", title: "Reef Three: Blue Hole", description: "Natural underwater sinkhole. Crystal visibility." },
        { time: "14:30", title: "Return", description: "Cruise back to the marina." },
      ],
      specs: { Vessel: "Motor boat with sun deck", Guide: "Certified snorkel instructor", Equipment: "Full snorkel gear included", Reefs: "3 stops, different ecosystems" },
      addOns: [
        { name: "Snorkeling Gear Upgrade", price: 10, description: "Premium mask, fins & wetsuit" },
        { name: "GoPro Underwater Camera", price: 25, description: "4K underwater footage" },
      ],
      gallery: [
        { src: "/images/hero-turquoise.jpg", alt: "Crystal turquoise water with reef" },
        { src: "/images/sea-turtle-dive.jpg", alt: "Underwater coral wall" },
        { src: "/images/hero-beach.jpg", alt: "Sandbar lunch stop" },
      ],
      coverImage: "/images/hero-turquoise.jpg",
      featured: false,
      order: 5,
    },
    {
      title: "Dolphin Watch Cruise",
      slug: "dolphin-watch-cruise",
      description: "Chasing pods at sunrise. No guarantees — that's the magic.",
      duration: "4 hours",
      boatType: "Speedboat",
      maxGuests: 12,
      priceFrom: 90,
      inclusions: ["Snorkel gear", "Soft drinks", "Fruits", "Capt. & crew"],
      exclusions: ["Lunch", "Hotel transfer", "Dolphin guarantee"],
      timeline: [
        { time: "07:00", title: "Early Departure", description: "Dolphins are most active at sunrise." },
        { time: "07:30", title: "Open Water Search", description: "Captain scans for dolphin pods." },
        { time: "08:00", title: "Dolphin Encounter", description: "If found, cut the engine and float. They come to you." },
        { time: "09:00", title: "Snorkel Stop", description: "Reef snorkeling after the dolphin search." },
        { time: "10:00", title: "Return", description: "Back to the marina. Early start, big reward." },
      ],
      specs: { Vessel: "Fast speedboat", Timing: "Sunrise departure", Crew: "Experienced dolphin trackers", Note: "No guarantees — wild animals" },
      addOns: [
        { name: "GoPro Underwater Camera", price: 25, description: "Capture dolphin moments" },
      ],
      gallery: [
        { src: "/images/dolphin-poster.jpg", alt: "Dolphins in clear water" },
        { src: "/images/speedboat/speedboat-frame-1.jpg", alt: "Speedboat at sunrise" },
        { src: "/images/hero-turquoise.jpg", alt: "Crystal water at dawn" },
      ],
      coverImage: "/images/dolphin-poster.jpg",
      featured: false,
      order: 6,
    },
  ];

  for (const pkg of seaPackages) {
    const existing = await prisma.seaPackage.findUnique({ where: { slug: pkg.slug } });
    const data = {
      ...pkg,
      inclusions: JSON.stringify(pkg.inclusions),
      exclusions: JSON.stringify(pkg.exclusions),
      timeline: JSON.stringify(pkg.timeline),
      specs: JSON.stringify(pkg.specs),
      addOns: JSON.stringify(pkg.addOns),
      gallery: JSON.stringify(pkg.gallery),
    };
    if (existing) {
      await prisma.seaPackage.update({ where: { slug: pkg.slug }, data });
    } else {
      await prisma.seaPackage.create({ data });
    }
  }

  // --- Island Destinations ---
  const islandDestinations = [
    {
      name: "Mahmya Island",
      slug: "mahmya",
      description: "White sand, turquoise water, and a reef ten steps from the beach. The closest thing to paradise without leaving Hurghada.",
      image: "/images/hero-beach.jpg",
      isPopular: true,
      order: 1,
    },
    {
      name: "Giftun Island",
      slug: "giftun",
      description: "Protected national park. Coral gardens, sea turtles, and untouched shorelines.",
      image: "/images/hero-turquoise.jpg",
      isPopular: true,
      order: 2,
    },
    {
      name: "Orange Bay",
      slug: "orange-bay",
      description: "Shallow turquoise lagoon, soft sand, and the most photographed beach in Hurghada.",
      image: "/images/speedboat/speedboat-frame-3.jpg",
      isPopular: true,
      order: 3,
    },
    {
      name: "Dolphin House",
      slug: "dolphin-house",
      description: "A reef where dolphins live. No guarantees you'll see them — but when you do, it's unreal.",
      image: "/images/dolphin-poster.jpg",
      isPopular: true,
      order: 4,
    },
    {
      name: "Magawish Island",
      slug: "magawish",
      description: "Quiet, remote, and surrounded by some of the best snorkeling in the Red Sea.",
      image: "/images/speedboat/speedboat-moment-1.jpg",
      isPopular: false,
      order: 5,
    },
    {
      name: "Abu Minqar",
      slug: "abu-minqar",
      description: "Deep blue channels, dramatic walls, and schools of barracuda. For the adventurous.",
      image: "/images/sea-turtle-dive.jpg",
      isPopular: false,
      order: 6,
    },
  ];

  for (const dest of islandDestinations) {
    const existing = await prisma.islandDestination.findUnique({ where: { slug: dest.slug } });
    if (existing) {
      await prisma.islandDestination.update({ where: { slug: dest.slug }, data: dest });
    } else {
      await prisma.islandDestination.create({ data: dest });
    }
  }

  // --- Stays ---
  const stays = [
    {
      title: "Steigenberger Al Dau",
      slug: "steigenberger-al-dau",
      description: "5-star resort with private beach, multiple pools, and world-class spa.",
      location: "Hurghada",
      category: "resort",
      coverImage: "/images/hero-beach.jpg",
      priceFrom: 120,
      priceNote: "per night",
      amenities: ["Private beach", "Pools", "Spa", "Restaurant", "Diving center", "Kids club"],
      tags: ["family", "beachfront", "luxury"],
      featured: true,
      visible: true,
      order: 1,
    },
    {
      title: "Serenity Makadi Beach",
      slug: "serenity-makadi-beach",
      description: "All-inclusive beach resort in Makadi Bay. Perfect for families and couples.",
      location: "Makadi Bay",
      category: "resort",
      coverImage: "/images/hero-turquoise.jpg",
      priceFrom: 95,
      priceNote: "per night",
      amenities: ["All-inclusive", "Beach", "Pools", "Water sports", "Kids club"],
      tags: ["all-inclusive", "family", "beach"],
      featured: true,
      visible: true,
      order: 2,
    },
    {
      title: "El Gouna Apart-Hotel",
      slug: "el-gouna-apart-hotel",
      description: "Self-catering apartments in the heart of El Gouna. Walking distance to the lagoon.",
      location: "El Gouna",
      category: "apartment",
      coverImage: "/images/speedboat/speedboat-frame-3.jpg",
      priceFrom: 60,
      priceNote: "per night",
      amenities: ["Kitchen", "Pool", "Free WiFi", "Parking", "Lagoon access"],
      tags: ["self-catering", "budget", "central"],
      featured: false,
      visible: true,
      order: 3,
    },
    {
      title: "Sheraton Miramar",
      slug: "sheraton-miramar",
      description: "Beachfront resort with stunning Red Sea views and premium amenities.",
      location: "El Gouna",
      category: "resort",
      coverImage: "/images/sea-sunset.jpg",
      priceFrom: 150,
      priceNote: "per night",
      amenities: ["Beachfront", "Pools", "Spa", "Restaurants", "Water sports", "Tennis"],
      tags: ["luxury", "beachfront", "couples"],
      featured: true,
      visible: true,
      order: 4,
    },
    {
      title: "Villa Sahara Garden",
      slug: "villa-sahara-garden",
      description: "Private villa with pool and garden. Ideal for groups and family gatherings.",
      location: "Soma Bay",
      category: "villa",
      coverImage: "/images/speedboat/speedboat-frame-2.jpg",
      priceFrom: 250,
      priceNote: "per night",
      amenities: ["Private pool", "Garden", "BBQ area", "Free WiFi", "Parking", "5 bedrooms"],
      tags: ["private", "groups", "family", "luxury"],
      featured: false,
      visible: true,
      order: 5,
    },
    {
      title: "Desert Rose Residence",
      slug: "desert-rose-residence",
      description: "Modern studio in a quiet residential area. Great value for longer stays.",
      location: "Hurghada",
      category: "apartment",
      coverImage: "/images/dolphin-poster.jpg",
      priceFrom: 35,
      priceNote: "per night",
      amenities: ["Kitchen", "Free WiFi", "AC", "Washing machine", "Parking"],
      tags: ["budget", "long-stay", "quiet"],
      featured: false,
      visible: true,
      order: 6,
    },
  ];

  for (const stay of stays) {
    const data = { ...stay, amenities: JSON.stringify(stay.amenities), tags: JSON.stringify(stay.tags) };
    const existing = await prisma.stay.findUnique({ where: { slug: stay.slug } });
    if (existing) {
      await prisma.stay.update({ where: { slug: stay.slug }, data });
    } else {
      await prisma.stay.create({ data });
    }
  }

  // --- Spots ---
  const spots = [
    {
      title: "The Boulevard",
      slug: "the-boulevard",
      description: "El Gouna's main promenade. Cafes, shops, and waterfront dining.",
      location: "El Gouna",
      category: "spot",
      coverImage: "/images/hero-beach.jpg",
      tags: ["walking", "shopping", "evening"],
      featured: true,
      visible: true,
      order: 1,
    },
    {
      title: "Old Vic Pub",
      slug: "old-vic-pub",
      description: "British-style pub with live music. The social hub of El Gouna.",
      location: "El Gouna",
      category: "eat",
      coverImage: "/images/sea-sunset.jpg",
      tags: ["nightlife", "music", "pub"],
      featured: true,
      visible: true,
      order: 2,
    },
    {
      title: "Fish Market",
      slug: "fish-market",
      description: "Fresh seafood restaurant right on the marina. Pick your fish, they cook it.",
      location: "Hurghada Marina",
      category: "eat",
      coverImage: "/images/hero-turquoise.jpg",
      tags: ["seafood", "fresh", "marina"],
      featured: true,
      visible: true,
      order: 3,
    },
    {
      title: "Desert Viewpoint",
      slug: "desert-viewpoint",
      description: "Panoramic desert view. Best at sunset. Bring a camera.",
      location: "Hurghada Hills",
      category: "spot",
      coverImage: "/images/speedboat/speedboat-frame-1.jpg",
      tags: ["sunset", "viewpoint", "nature"],
      featured: false,
      visible: true,
      order: 4,
    },
    {
      title: "Maharba Coffee",
      slug: "maharba-coffee",
      description: "Specialty coffee shop with local beans. Best flat white in town.",
      location: "El Gouna",
      category: "eat",
      coverImage: "/images/speedboat/speedboat-frame-2.jpg",
      tags: ["coffee", "cafe", "morning"],
      featured: false,
      visible: true,
      order: 5,
    },
    {
      title: "Sheraton Diving Reef",
      slug: "sheraton-diving-reef",
      description: "Accessible house reef right off the beach. Great for beginners.",
      location: "Sheraton Beach",
      category: "spot",
      coverImage: "/images/sea-turtle-dive.jpg",
      tags: ["snorkeling", "reef", "beach"],
      featured: false,
      visible: true,
      order: 6,
    },
  ];

  for (const spot of spots) {
    const data = { ...spot, tags: JSON.stringify(spot.tags) };
    const existing = await prisma.spot.findUnique({ where: { slug: spot.slug } });
    if (existing) {
      await prisma.spot.update({ where: { slug: spot.slug }, data });
    } else {
      await prisma.spot.create({ data });
    }
  }

  // --- AddOns ---
  const addOns = [
    { name: "GoPro Underwater Camera", slug: "gopro-camera", description: "4K underwater footage of your trip", price: 25, category: "equipment", visible: true, order: 1 },
    { name: "Professional Photographer", slug: "professional-photographer", description: "Drone + underwater photos from a pro photographer", price: 50, category: "media", visible: true, order: 2 },
    { name: "VIP Seafood Lunch", slug: "vip-seafood-lunch", description: "Fresh seafood feast on the island", price: 40, category: "food", visible: true, order: 3 },
    { name: "Fruit & Juice Package", slug: "fruit-juice-package", description: "Tropical fruits & fresh juices", price: 15, category: "food", visible: true, order: 4 },
    { name: "Snorkeling Gear Upgrade", slug: "snorkel-upgrade", description: "Premium mask, fins & wetsuit", price: 10, category: "equipment", visible: true, order: 5 },
    { name: "Sunset Drinks Package", slug: "sunset-drinks", description: "Cocktails and snacks for the golden hour", price: 20, category: "food", visible: true, order: 6 },
  ];

  for (const addon of addOns) {
    const existing = await prisma.addOn.findUnique({ where: { slug: addon.slug } });
    if (existing) {
      await prisma.addOn.update({ where: { slug: addon.slug }, data: addon });
    } else {
      await prisma.addOn.create({ data: addon });
    }
  }

  console.log("Seed complete: admin, feature flags, sea packages, island destinations, stays, spots, and add-ons created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
