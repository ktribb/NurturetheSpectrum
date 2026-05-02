import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  pgEnum,
  json,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const listingTypeEnum = pgEnum("listing_type", [
  "Agency",
  "Individual",
  "Platform",
]);

export const listingCountyEnum = pgEnum("listing_county", [
  "Philadelphia",
  "Delaware County",
  "Bucks County",
  "Chester County",
]);

export const listingTierEnum = pgEnum("listing_tier", [
  "Free",
  "Featured",
  "Verified",
]);

export const listingStatusEnum = pgEnum("listing_status", [
  "Published",
  "Pending",
  "Inactive",
]);

export const listingsTable = pgTable("listings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  type: listingTypeEnum("type").notNull(),
  city: text("city").notNull(),
  county: listingCountyEnum("county").notNull(),
  specializations: json("specializations").$type<string[]>().notNull().default([]),
  certifications: json("certifications").$type<string[]>().notNull().default([]),
  website: text("website"),
  email: text("email").notNull(),
  phone: text("phone"),
  hourlyRate: text("hourly_rate"),
  yearsExperience: integer("years_experience"),
  description: text("description").notNull(),
  logoUrl: text("logo_url"),
  tier: listingTierEnum("tier").notNull().default("Free"),
  status: listingStatusEnum("status").notNull().default("Pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertListingSchema = createInsertSchema(listingsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertListing = z.infer<typeof insertListingSchema>;
export type Listing = typeof listingsTable.$inferSelect;
