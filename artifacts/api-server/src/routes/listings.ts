import { Router } from "express";
import { db, listingsTable } from "@workspace/db";
import { eq, and, inArray, sql, desc, asc, or } from "drizzle-orm";
import {
  GetListingsQueryParams,
  SubmitListingBody,
} from "@workspace/api-zod";

const router = Router();

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

async function uniqueSlug(base: string): Promise<string> {
  const rows = await db
    .select({ slug: listingsTable.slug })
    .from(listingsTable)
    .where(
      sql`${listingsTable.slug} = ${base} OR ${listingsTable.slug} LIKE ${base + "-%"}`
    );

  if (rows.length === 0) return base;

  const taken = new Set(rows.map((r) => r.slug));
  if (!taken.has(base)) return base;

  let count = 1;
  while (taken.has(`${base}-${count}`)) {
    count++;
  }
  return `${base}-${count}`;
}

function serializeListing(row: typeof listingsTable.$inferSelect) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    type: row.type,
    city: row.city,
    county: row.county,
    specializations: (row.specializations as string[]) || [],
    certifications: (row.certifications as string[]) || [],
    website: row.website ?? null,
    phone: row.phone ?? null,
    hourlyRate: row.hourlyRate ?? null,
    yearsExperience: row.yearsExperience ?? null,
    description: row.description,
    logoUrl: row.logoUrl ?? null,
    tier: row.tier,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

router.get("/listings", async (req, res) => {
  try {
    const parsed = GetListingsQueryParams.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid query parameters" });
      return;
    }

    const { county, type, specializations, certifications, page = 1, limit: rawLimit = 12 } = parsed.data;
    const limit = Math.min(rawLimit, 50);
    const offset = (page - 1) * limit;

    const conditions = [eq(listingsTable.status, "Published")];

    if (county) {
      conditions.push(eq(listingsTable.county, county as "Philadelphia" | "Delaware County" | "Bucks County" | "Chester County"));
    }
    if (type) {
      conditions.push(eq(listingsTable.type, type as "Agency" | "Individual" | "Platform"));
    }

    if (specializations) {
      const specs = specializations.split(",").map((s) => s.trim()).filter(Boolean);
      if (specs.length > 0) {
        conditions.push(
          or(...specs.map((s) => sql`${listingsTable.specializations}::jsonb @> ${JSON.stringify([s])}::jsonb`))!
        );
      }
    }

    if (certifications) {
      const certs = certifications.split(",").map((c) => c.trim()).filter(Boolean);
      if (certs.length > 0) {
        conditions.push(
          or(...certs.map((c) => sql`${listingsTable.certifications}::jsonb @> ${JSON.stringify([c])}::jsonb`))!
        );
      }
    }

    const whereClause = and(...conditions);

    const orderExpr = [
      sql`CASE ${listingsTable.tier} WHEN 'Verified' THEN 0 WHEN 'Featured' THEN 1 ELSE 2 END`,
      desc(listingsTable.createdAt),
    ];

    const [rows, countResult] = await Promise.all([
      db
        .select()
        .from(listingsTable)
        .where(whereClause)
        .orderBy(...orderExpr)
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(listingsTable)
        .where(whereClause),
    ]);

    const total = countResult[0]?.count ?? 0;
    const listings = rows.map(serializeListing);
    const totalPages = Math.ceil(total / limit);

    res.json({ listings, total, page, totalPages });
  } catch (err) {
    req.log.error({ err }, "Failed to get listings");
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});

router.get("/listings/featured", async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(listingsTable)
      .where(
        and(
          eq(listingsTable.status, "Published"),
          or(
            eq(listingsTable.tier, "Featured"),
            eq(listingsTable.tier, "Verified")
          )
        )
      )
      .orderBy(
        sql`CASE ${listingsTable.tier} WHEN 'Verified' THEN 0 WHEN 'Featured' THEN 1 ELSE 2 END`,
        desc(listingsTable.createdAt)
      )
      .limit(3);

    res.json(rows.map(serializeListing));
  } catch (err) {
    req.log.error({ err }, "Failed to get featured listings");
    res.status(500).json({ error: "Failed to fetch featured listings" });
  }
});

router.get("/listings/stats", async (req, res) => {
  try {
    const publishedCondition = eq(listingsTable.status, "Published");

    const [countyRows, typeRows, tierRows, totalResult] = await Promise.all([
      db
        .select({ label: listingsTable.county, count: sql<number>`count(*)::int` })
        .from(listingsTable)
        .where(publishedCondition)
        .groupBy(listingsTable.county),
      db
        .select({ label: listingsTable.type, count: sql<number>`count(*)::int` })
        .from(listingsTable)
        .where(publishedCondition)
        .groupBy(listingsTable.type),
      db
        .select({ label: listingsTable.tier, count: sql<number>`count(*)::int` })
        .from(listingsTable)
        .where(publishedCondition)
        .groupBy(listingsTable.tier),
      db
        .select({ total: sql<number>`count(*)::int` })
        .from(listingsTable)
        .where(publishedCondition),
    ]);

    res.json({
      byCounty: countyRows,
      byType: typeRows,
      byTier: tierRows,
      total: totalResult[0]?.total ?? 0,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get listing stats");
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

router.get("/listings/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const rows = await db
      .select()
      .from(listingsTable)
      .where(and(eq(listingsTable.slug, slug), eq(listingsTable.status, "Published")))
      .limit(1);

    if (rows.length === 0) {
      res.status(404).json({ error: "Listing not found" });
      return;
    }

    res.json(serializeListing(rows[0]));
  } catch (err) {
    req.log.error({ err }, "Failed to get listing by slug");
    res.status(500).json({ error: "Failed to fetch listing" });
  }
});

router.post("/listings/submit", async (req, res) => {
  try {
    const parsed = SubmitListingBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Validation failed: " + parsed.error.message });
      return;
    }

    const data = parsed.data;
    const baseSlug = generateSlug(data.name);
    const slug = await uniqueSlug(baseSlug);

    await db.insert(listingsTable).values({
      name: data.name,
      slug,
      type: data.type as "Agency" | "Individual" | "Platform",
      city: data.city,
      county: data.county as "Philadelphia" | "Delaware County" | "Bucks County" | "Chester County",
      specializations: data.specializations || [],
      certifications: data.certifications || [],
      website: data.website || null,
      email: data.email,
      phone: data.phone || null,
      hourlyRate: data.hourlyRate || null,
      yearsExperience: data.yearsExperience ?? null,
      description: data.description,
      logoUrl: data.logoUrl || null,
      tier: "Free",
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Your listing has been submitted for review. We will contact you within 2-3 business days.",
    });
  } catch (err) {
    req.log.error({ err }, "Failed to submit listing");
    res.status(500).json({ error: "Failed to submit listing" });
  }
});

export default router;
