import { Router, type Request, type Response, type NextFunction } from "express";
import { db, listingsTable } from "@workspace/db";
import { eq, and, desc, sql, count } from "drizzle-orm";
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

// Simple in-memory session store (cookie-based token)
// In production, use a proper session store
const ADMIN_SESSION_TOKEN = "nts_admin_session";
const activeSessions = new Set<string>();

function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies?.[ADMIN_SESSION_TOKEN] || req.headers["x-admin-token"];
  if (!token || !activeSessions.has(token as string)) {
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

// Admin login
router.post("/admin/login", async (req, res) => {
  try {
    const parsed = AdminLoginBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Password is required" });
      return;
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      res.status(500).json({ error: "Admin password not configured" });
      return;
    }

    if (parsed.data.password !== adminPassword) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    const token = generateToken();
    activeSessions.add(token);

    // Set cookie
    res.cookie(ADMIN_SESSION_TOKEN, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    // Also return token in response for clients that can't use cookies
    res.json({ success: true, message: "Login successful", token });
  } catch (err) {
    req.log.error({ err }, "Admin login failed");
    res.status(500).json({ error: "Login failed" });
  }
});

// Admin logout
router.post("/admin/logout", (req, res) => {
  const token = req.cookies?.[ADMIN_SESSION_TOKEN] || req.headers["x-admin-token"];
  if (token) {
    activeSessions.delete(token as string);
  }
  res.clearCookie(ADMIN_SESSION_TOKEN);
  res.json({ success: true, message: "Logged out successfully" });
});

// Check session
router.get("/admin/me", (req, res) => {
  const token = req.cookies?.[ADMIN_SESSION_TOKEN] || req.headers["x-admin-token"];
  const authenticated = !!(token && activeSessions.has(token as string));
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

    let query = db.select().from(listingsTable);

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
