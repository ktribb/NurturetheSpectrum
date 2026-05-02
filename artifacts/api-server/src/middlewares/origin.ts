import type { Request, Response, NextFunction } from "express";

function buildAllowedOrigins(): Set<string> {
  const origins = new Set<string>([
    ...(process.env.CORS_ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean),
    ...(process.env.REPLIT_DOMAINS ?? "")
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean)
      .map((d) => `https://${d}`),
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost",
    "http://localhost:80",
  ]);

  const devDomain = (process.env.REPLIT_DEV_DOMAIN ?? "").trim();
  if (devDomain) {
    origins.add(`https://${devDomain}`);
  }

  return origins;
}

export const allowedOrigins: Set<string> = buildAllowedOrigins();

function originFromReferer(referer: string | undefined): string | null {
  if (!referer) return null;
  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

/**
 * Reject cross-site form posts (CSRF) on anonymous state-changing endpoints by
 * requiring the browser's Origin header (or Referer fallback) to identify an
 * allowed origin. Modern browsers always send Origin on POST/PUT/PATCH/DELETE,
 * so attacker-hosted HTML forms cannot impersonate the legitimate site even
 * when CORS is permissive at the transport layer.
 */
export function requireSameOrigin(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const origin = req.get("origin") ?? null;
  const referer = originFromReferer(req.get("referer"));
  const candidate = origin ?? referer;

  if (!candidate) {
    req.log?.warn(
      { method: req.method, path: req.path },
      "Rejected request missing Origin/Referer header",
    );
    res.status(403).json({ error: "Forbidden: missing Origin/Referer header" });
    return;
  }

  if (!allowedOrigins.has(candidate)) {
    req.log?.warn(
      { method: req.method, path: req.path, candidate },
      "Rejected request from disallowed origin",
    );
    res.status(403).json({ error: "Forbidden: origin not allowed" });
    return;
  }

  next();
}
