-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Side" AS ENUM ('LOCKSMITH', 'AUTOMOTIVE');

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "side" "Side" NOT NULL,
    "service" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "vehicleMake" TEXT,
    "vehicleModel" TEXT,
    "area" TEXT NOT NULL,
    "preferredDate" TIMESTAMP(3),
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

