-- AlterTable: Add missing columns to Trip
ALTER TABLE "Trip" ADD COLUMN "tripType" TEXT NOT NULL DEFAULT 'DAILY_CRUISE';
ALTER TABLE "Trip" ADD COLUMN "schedule" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Trip" ADD COLUMN "inclusions" TEXT NOT NULL DEFAULT '[]';
ALTER TABLE "Trip" ADD COLUMN "itinerary" TEXT NOT NULL DEFAULT '[]';

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "adults" INTEGER NOT NULL DEFAULT 1,
    "kids" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT NOT NULL DEFAULT '',
    "tripType" TEXT NOT NULL DEFAULT '',
    "tripId" TEXT NOT NULL DEFAULT '',
    "tripTitle" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "SeaPackage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "boatType" TEXT NOT NULL,
    "maxGuests" INTEGER NOT NULL DEFAULT 15,
    "priceFrom" DOUBLE PRECISION NOT NULL,
    "inclusions" TEXT NOT NULL DEFAULT '[]',
    "exclusions" TEXT NOT NULL DEFAULT '[]',
    "timeline" TEXT NOT NULL DEFAULT '[]',
    "specs" TEXT NOT NULL DEFAULT '{}',
    "addOns" TEXT NOT NULL DEFAULT '[]',
    "gallery" TEXT NOT NULL DEFAULT '[]',
    "coverImage" TEXT NOT NULL DEFAULT '',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "IslandDestination" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    "isPopular" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "PageContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "page" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'text',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "AddOn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "price" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'sea',
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Stay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL DEFAULT 'hotel',
    "coverImage" TEXT NOT NULL DEFAULT '',
    "gallery" TEXT NOT NULL DEFAULT '[]',
    "priceFrom" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceNote" TEXT NOT NULL DEFAULT '',
    "amenities" TEXT NOT NULL DEFAULT '[]',
    "tags" TEXT NOT NULL DEFAULT '[]',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "action" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "itemId" TEXT NOT NULL DEFAULT '',
    "itemName" TEXT NOT NULL DEFAULT '',
    "adminEmail" TEXT NOT NULL DEFAULT '',
    "details" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Spot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL DEFAULT 'spot',
    "coverImage" TEXT NOT NULL DEFAULT '',
    "gallery" TEXT NOT NULL DEFAULT '[]',
    "tags" TEXT NOT NULL DEFAULT '[]',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SeaPackage_slug_key" ON "SeaPackage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "IslandDestination_slug_key" ON "IslandDestination"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PageContent_page_section_key_key" ON "PageContent"("page", "section", "key");

-- CreateIndex
CREATE UNIQUE INDEX "AddOn_slug_key" ON "AddOn"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Stay_slug_key" ON "Stay"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Spot_slug_key" ON "Spot"("slug");
