import crypto from "crypto";
import { Router, type Request, type Response, type NextFunction } from "express";
import rateLimit from "express-rate-limit";
import { db, listingsTable } from "@workspace/db";
import { eq, desc, sql, inArray } from "drizzle-orm";
import {
  AdminLoginBody,
  AdminGetListingsQueryParams,
  AdminCreateListingBody,
  AdminUpdateListingBody,
  AdminUpdateListingParams,
  AdminDeleteListingParams,
  AdminApproveListingParams,
} from "@workspace/api-zod";

const router = Router();

const ADMIN_SESSION_TOKEN = "nts_admin_session";
const activeSessions = new Set<string>();

const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts. Please try again later." },
  skipSuccessfulRequests: false,
});

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function timingSafeEqual(a: string, b: string): boolean {
  try {
    const aBuf = Buffer.from(a, "utf8");
    const bBuf = Buffer.from(b, "utf8");
    if (aBuf.length !== bBuf.length) {
      crypto.timingSafeEqual(aBuf, aBuf);
      return false;
    }
    return crypto.timingSafeEqual(aBuf, bBuf);
  } catch {
    return false;
  }
}

function extractToken(req: Request): string | null {
  const cookieToken = req.cookies?.[ADMIN_SESSION_TOKEN];
  if (cookieToken) return cookieToken;
  return null;
}

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const token = extractToken(req);
  if (!token || !activeSessions.has(token)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

async function uniqueSlug(base: string, excludeId?: number): Promise<string> {
  let slug = base;
  let count = 0;
  while (true) {
    const rows = await db
      .select({ id: listingsTable.id })
      .from(listingsTable)
      .where(eq(listingsTable.slug, slug))
      .limit(1);
    if (rows.length === 0 || (excludeId && rows[0].id === excludeId)) return slug;
    count++;
    slug = `${base}-${count}`;
  }
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

// Admin login — rate-limited, timing-safe, minimum response delay
router.post("/admin/login", loginRateLimiter, async (req, res) => {
  const loginStart = Date.now();
  const MIN_RESPONSE_MS = 300;

  async function respond(statusCode: number, body: object) {
    const elapsed = Date.now() - loginStart;
    const remaining = MIN_RESPONSE_MS - elapsed;
    if (remaining > 0) {
      await new Promise((resolve) => setTimeout(resolve, remaining));
    }
    res.status(statusCode).json(body);
  }

  try {
    const parsed = AdminLoginBody.safeParse(req.body);
    if (!parsed.success) {
      await respond(400, { error: "Password is required" });
      return;
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      req.log.error("ADMIN_PASSWORD environment variable is not set");
      await respond(500, { error: "Admin authentication is not configured" });
      return;
    }

    if (!timingSafeEqual(parsed.data.password, adminPassword)) {
      await respond(401, { error: "Invalid password" });
      return;
    }

    const token = generateToken();
    activeSessions.add(token);

    res.cookie(ADMIN_SESSION_TOKEN, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    await respond(200, { success: true, message: "Login successful" });
  } catch (err) {
    req.log.error({ err }, "Admin login failed");
    await respond(500, { error: "Login failed" });
  }
});

// Admin logout
router.post("/admin/logout", (req, res) => {
  const token = extractToken(req);
  if (token) {
    activeSessions.delete(token);
  }
  res.clearCookie(ADMIN_SESSION_TOKEN);
  res.json({ success: true, message: "Logged out successfully" });
});

// Check session
router.get("/admin/me", (req, res) => {
  const token = extractToken(req);
  const authenticated = !!(token && activeSessions.has(token));
  res.json({ authenticated });
});

// Dashboard stats
router.get("/admin/dashboard", requireAdmin, async (req, res) => {
  try {
    const all = await db.select().from(listingsTable);

    const stats = {
      totalListings: all.length,
      pendingCount: all.filter((r) => r.status === "Pending").length,
      publishedCount: all.filter((r) => r.status === "Published").length,
      inactiveCount: all.filter((r) => r.status === "Inactive").length,
      freeCount: all.filter((r) => r.tier === "Free").length,
      featuredCount: all.filter((r) => r.tier === "Featured").length,
      verifiedCount: all.filter((r) => r.tier === "Verified").length,
    };

    res.json(stats);
  } catch (err) {
    req.log.error({ err }, "Failed to get dashboard stats");
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
});

// Export CSV
router.get("/admin/listings/export", requireAdmin, async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(listingsTable)
      .orderBy(desc(listingsTable.createdAt));

    const headers = [
      "ID",
      "Name",
      "Slug",
      "Type",
      "City",
      "County",
      "Specializations",
      "Certifications",
      "Website",
      "Email",
      "Phone",
      "Hourly Rate",
      "Years Experience",
      "Description",
      "Logo URL",
      "Tier",
      "Status",
      "Created At",
    ];

    const csvRows = [
      headers.join(","),
      ...rows.map((r) => [
        r.id,
        `"${r.name.replace(/"/g, '""')}"`,
        r.slug,
        r.type,
        `"${r.city}"`,
        r.county,
        `"${((r.specializations as string[]) || []).join("; ")}"`,
        `"${((r.certifications as string[]) || []).join("; ")}"`,
        r.website || "",
        r.email,
        r.phone || "",
        r.hourlyRate || "",
        r.yearsExperience ?? "",
        `"${(r.description || "").replace(/"/g, '""')}"`,
        r.logoUrl || "",
        r.tier,
        r.status,
        r.createdAt.toISOString(),
      ].join(",")),
    ];

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=nurturethespectrum-listings.csv");
    res.send(csvRows.join("\n"));
  } catch (err) {
    req.log.error({ err }, "Failed to export listings");
    res.status(500).json({ error: "Failed to export listings" });
  }
});

// Get all listings (admin)
router.get("/admin/listings", requireAdmin, async (req, res) => {
  try {
    const parsed = AdminGetListingsQueryParams.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid query parameters" });
      return;
    }

    const { status, page = 1, limit = 20 } = parsed.data;
    const offset = (page - 1) * limit;

    let rows: (typeof listingsTable.$inferSelect)[];
    if (status) {
      rows = await db
        .select()
        .from(listingsTable)
        .where(eq(listingsTable.status, status as "Published" | "Pending" | "Inactive"))
        .orderBy(
          sql`CASE ${listingsTable.status} WHEN 'Pending' THEN 0 WHEN 'Published' THEN 1 ELSE 2 END`,
          desc(listingsTable.createdAt)
        );
    } else {
      rows = await db
        .select()
        .from(listingsTable)
        .orderBy(
          sql`CASE ${listingsTable.status} WHEN 'Pending' THEN 0 WHEN 'Published' THEN 1 ELSE 2 END`,
          desc(listingsTable.createdAt)
        );
    }

    const total = rows.length;
    const listings = rows.slice(offset, offset + limit).map(serializeListing);
    const totalPages = Math.ceil(total / limit);

    res.json({ listings, total, page, totalPages });
  } catch (err) {
    req.log.error({ err }, "Failed to get admin listings");
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});

// Create listing (admin)
router.post("/admin/listings", requireAdmin, async (req, res) => {
  try {
    const parsed = AdminCreateListingBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Validation failed: " + parsed.error.message });
      return;
    }

    const data = parsed.data;
    if (!data.name || !data.type || !data.city || !data.county || !data.description || !data.email) {
      res.status(400).json({ error: "Missing required fields: name, type, city, county, description, email" });
      return;
    }

    const baseSlug = generateSlug(data.name);
    const slug = await uniqueSlug(baseSlug);

    const [created] = await db
      .insert(listingsTable)
      .values({
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
        tier: (data.tier as "Free" | "Featured" | "Verified") || "Free",
        status: (data.status as "Published" | "Pending" | "Inactive") || "Published",
      })
      .returning();

    res.status(201).json(serializeListing(created));
  } catch (err) {
    req.log.error({ err }, "Failed to create listing");
    res.status(500).json({ error: "Failed to create listing" });
  }
});

// Approve listing
router.post("/admin/listings/:id/approve", requireAdmin, async (req, res) => {
  try {
    const parsed = AdminApproveListingParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid listing ID" });
      return;
    }

    const [updated] = await db
      .update(listingsTable)
      .set({ status: "Published", updatedAt: new Date() })
      .where(eq(listingsTable.id, parsed.data.id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Listing not found" });
      return;
    }

    res.json(serializeListing(updated));
  } catch (err) {
    req.log.error({ err }, "Failed to approve listing");
    res.status(500).json({ error: "Failed to approve listing" });
  }
});

// Update listing
router.patch("/admin/listings/:id", requireAdmin, async (req, res) => {
  try {
    const idParsed = AdminUpdateListingParams.safeParse({ id: Number(req.params.id) });
    if (!idParsed.success) {
      res.status(400).json({ error: "Invalid listing ID" });
      return;
    }

    const bodyParsed = AdminUpdateListingBody.safeParse(req.body);
    if (!bodyParsed.success) {
      res.status(400).json({ error: "Validation failed: " + bodyParsed.error.message });
      return;
    }

    const data = bodyParsed.data;
    const updateData: Partial<typeof listingsTable.$inferInsert> = {
      updatedAt: new Date(),
    };

    if (data.name !== undefined) {
      updateData.name = data.name;
      const baseSlug = generateSlug(data.name);
      updateData.slug = await uniqueSlug(baseSlug, idParsed.data.id);
    }
    if (data.type !== undefined) updateData.type = data.type as "Agency" | "Individual" | "Platform";
    if (data.city !== undefined) updateData.city = data.city;
    if (data.county !== undefined) updateData.county = data.county as "Philadelphia" | "Delaware County" | "Bucks County" | "Chester County";
    if (data.specializations !== undefined) updateData.specializations = data.specializations;
    if (data.certifications !== undefined) updateData.certifications = data.certifications;
    if (data.website !== undefined) updateData.website = data.website || null;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.phone !== undefined) updateData.phone = data.phone || null;
    if (data.hourlyRate !== undefined) updateData.hourlyRate = data.hourlyRate || null;
    if (data.yearsExperience !== undefined) updateData.yearsExperience = data.yearsExperience ?? null;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.logoUrl !== undefined) updateData.logoUrl = data.logoUrl || null;
    if (data.tier !== undefined) updateData.tier = data.tier as "Free" | "Featured" | "Verified";
    if (data.status !== undefined) updateData.status = data.status as "Published" | "Pending" | "Inactive";

    const [updated] = await db
      .update(listingsTable)
      .set(updateData)
      .where(eq(listingsTable.id, idParsed.data.id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Listing not found" });
      return;
    }

    res.json(serializeListing(updated));
  } catch (err) {
    req.log.error({ err }, "Failed to update listing");
    res.status(500).json({ error: "Failed to update listing" });
  }
});

// Import CSV
router.post("/admin/import-csv", requireAdmin, async (req, res) => {
  try {
    const { csv } = req.body as { csv?: string };
    if (!csv || typeof csv !== "string") {
      res.status(400).json({ error: "CSV content is required" });
      return;
    }

    const lines = csv.split(/\r?\n/).filter((l) => l.trim());
    if (lines.length < 2) {
      res.status(400).json({ error: "CSV must have a header row and at least one data row" });
      return;
    }

    function parseCSVLine(line: string): string[] {
      const fields: string[] = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (ch === "," && !inQuotes) {
          fields.push(current.trim());
          current = "";
        } else {
          current += ch;
        }
      }
      fields.push(current.trim());
      return fields;
    }

    function normalizeType(raw: string): "Agency" | "Individual" | "Platform" {
      const v = raw.trim().toLowerCase();
      if (v === "agency") return "Agency";
      if (v === "platform") return "Platform";
      return "Individual";
    }

    function normalizeCounty(raw: string): "Philadelphia" | "Delaware County" | "Bucks County" | "Chester County" {
      const v = raw.toLowerCase();
      if (v.includes("delaware")) return "Delaware County";
      if (v.includes("bucks")) return "Bucks County";
      if (v.includes("chester")) return "Chester County";
      return "Philadelphia";
    }

    function splitList(raw: string): string[] {
      if (!raw.trim()) return [];
      return raw.split(/[;,]/).map((s) => s.trim()).filter(Boolean);
    }

    const headers = parseCSVLine(lines[0]).map((h) => h.toLowerCase().trim());

    function col(row: string[], name: string): string {
      const idx = headers.indexOf(name);
      return idx >= 0 ? (row[idx] ?? "").trim() : "";
    }

    const results = { imported: 0, skipped: 0, errors: [] as string[] };

    for (let i = 1; i < lines.length; i++) {
      const row = parseCSVLine(lines[i]);
      if (row.every((c) => !c)) continue;

      const name = col(row, "name");
      if (!name) {
        results.errors.push(`Row ${i + 1}: missing Name, skipped`);
        results.skipped++;
        continue;
      }

      const rawCityCounty = col(row, "city/county");
      let city = rawCityCounty;
      let county = normalizeCounty(rawCityCounty);
      if (rawCityCounty.includes(",")) {
        const parts = rawCityCounty.split(",");
        city = parts[0].trim();
        county = normalizeCounty(parts.slice(1).join(","));
      }
      if (!city) city = "Philadelphia";

      const rawEmail = col(row, "email");
      const email = rawEmail || `contact@${name.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`;

      const notes = col(row, "notes");
      const contactStatus = col(row, "contact status");
      const descriptionParts = [notes, contactStatus ? `Contact Status: ${contactStatus}` : ""].filter(Boolean);
      const description = descriptionParts.join(" | ") || `${name} is a caregiver serving the Philadelphia metro area.`;

      const yearsRaw = col(row, "years experience");
      const yearsExperience = yearsRaw ? parseInt(yearsRaw, 10) || null : null;

      try {
        const baseSlug = generateSlug(name);
        const slug = await uniqueSlug(baseSlug);

        await db.insert(listingsTable).values({
          name,
          slug,
          type: normalizeType(col(row, "type")),
          city,
          county,
          specializations: splitList(col(row, "specialization")),
          certifications: splitList(col(row, "certifications")),
          website: col(row, "website") || null,
          email,
          phone: col(row, "phone") || null,
          hourlyRate: col(row, "hourly rate") || null,
          yearsExperience,
          description,
          logoUrl: null,
          tier: "Free",
          status: "Published",
        });
        results.imported++;
      } catch (rowErr: unknown) {
        const msg = rowErr instanceof Error ? rowErr.message : String(rowErr);
        results.errors.push(`Row ${i + 1} (${name}): ${msg}`);
        results.skipped++;
      }
    }

    res.json({
      success: true,
      imported: results.imported,
      skipped: results.skipped,
      errors: results.errors,
      message: `Imported ${results.imported} listing${results.imported !== 1 ? "s" : ""}. ${results.skipped > 0 ? `Skipped ${results.skipped}.` : ""}`,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to import CSV");
    res.status(500).json({ error: "Failed to import CSV" });
  }
});

// Bulk delete listings
router.delete("/admin/listings", requireAdmin, async (req, res) => {
  try {
    const { ids } = req.body as { ids?: unknown };
    if (!Array.isArray(ids) || ids.length === 0) {
      res.status(400).json({ error: "ids must be a non-empty array of listing IDs" });
      return;
    }
    const numericIds = ids.map(Number).filter((n) => Number.isFinite(n) && n > 0);
    if (numericIds.length === 0) {
      res.status(400).json({ error: "No valid listing IDs provided" });
      return;
    }
    const deleted = await db
      .delete(listingsTable)
      .where(inArray(listingsTable.id, numericIds))
      .returning({ id: listingsTable.id });
    res.json({ success: true, deleted: deleted.length, message: `Deleted ${deleted.length} listing${deleted.length !== 1 ? "s" : ""}` });
  } catch (err) {
    req.log.error({ err }, "Failed to bulk delete listings");
    res.status(500).json({ error: "Failed to delete listings" });
  }
});

// Delete listing
router.delete("/admin/listings/:id", requireAdmin, async (req, res) => {
  try {
    const parsed = AdminDeleteListingParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid listing ID" });
      return;
    }

    const [deleted] = await db
      .delete(listingsTable)
      .where(eq(listingsTable.id, parsed.data.id))
      .returning();

    if (!deleted) {
      res.status(404).json({ error: "Listing not found" });
      return;
    }

    res.json({ success: true, message: "Listing deleted successfully" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete listing");
    res.status(500).json({ error: "Failed to delete listing" });
  }
});

export default router;
