# Threat Model

## Project Overview

Nurture the Spectrum is a full-stack directory site for families seeking autism and special-needs caregivers in the Philadelphia area. The production stack is a React + Vite frontend in `artifacts/nurture-the-spectrum`, an Express 5 API in `artifacts/api-server`, and PostgreSQL access through Drizzle in `lib/db`.

The public site allows anonymous visitors to browse published caregiver listings, submit new listings for review, and send contact messages. A hidden admin portal manages listing approval, deletion, CSV import/export, and general listing administration through a custom password-based session flow.

## Assets

- **Admin access and session state** — the admin password and any session tokens grant full control over listing approval, import, export, creation, update, and deletion.
- **Provider contact and profile data** — listings contain email addresses, phone numbers, descriptions, websites, and other business/profile information. Some of this data is intentionally public, while submission-time contact data and pending listings are more sensitive.
- **Directory integrity** — published listings and tiers influence user trust and business reputation. Unauthorized creation, approval, deletion, or tampering would directly affect the site’s credibility.
- **Operational availability** — unauthenticated submission and contact endpoints can be abused to flood the database, logs, or moderation queue.
- **Application secrets** — `DATABASE_URL`, `ADMIN_PASSWORD`, and any future third-party API keys must remain outside client code and outside committed source/config where possible.
- **Visitor communications** — when visitors use inquiry or contact flows, the system must not let attacker-controlled listing content alter the intended recipient set or prefilled message content.

## Trust Boundaries

- **Browser to API** — all request data from the public site and admin UI is untrusted until validated server-side.
- **Public to admin boundary** — `/api/admin/*` routes must enforce authentication robustly; public visitors should only reach public browsing and submission APIs.
- **Submission to publication boundary** — data from `POST /api/listings/submit` enters the system as untrusted pending content and must not gain admin trust or public visibility without explicit review.
- **API to database** — the API has direct write access to the listings table, so auth or validation failures at the API layer can become persistent data tampering.
- **Server to logs** — request handling and contact submissions can place user data into logs; log access is more privileged than public access and must avoid unnecessary sensitive data.
- **Public site to external handlers** — published listing content can later flow into browser navigation sinks such as `mailto:` links and outbound URLs, so user-controlled fields must be encoded for the destination context rather than only HTML-escaped.
- **Internal/dev to production boundary** — `artifacts/mockup-sandbox` is development-only and should be ignored unless production reachability is demonstrated. Production analysis should focus on `artifacts/api-server`, `artifacts/nurture-the-spectrum`, `lib/db`, and shared client/schema libraries.

## Scan Anchors

- **Production entry points:** `artifacts/api-server/src/index.ts`, `artifacts/api-server/src/app.ts`, `artifacts/nurture-the-spectrum/src/main.tsx`
- **Highest-risk code areas:** `artifacts/api-server/src/routes/admin.ts`, `artifacts/api-server/src/routes/listings.ts`, `artifacts/api-server/src/routes/contact.ts`, `artifacts/nurture-the-spectrum/src/pages/listing.tsx`, `lib/api-client-react/src/custom-fetch.ts`
- **Public surfaces:** `/api/listings`, `/api/listings/featured`, `/api/listings/stats`, `/api/listings/:slug`, `/api/listings/submit`, `/api/contact`
- **Authenticated/admin surfaces:** all `/api/admin/*` routes and the `/admin` frontend pages
- **Public abuse hot spots:** anonymous form posts to `/api/contact` and `/api/listings/submit`, plus published listing data that later feeds `mailto:` or external-navigation sinks
- **Usually dev-only:** `artifacts/mockup-sandbox/**`

## Threat Categories

### Spoofing

The primary spoofing risk is unauthorized acquisition of admin access. The application uses a custom shared-password admin login rather than per-user identities, so the system must ensure that admin authentication is resistant to guessing, credential leakage, and token theft. Admin session tokens must be unpredictable, scoped to the server, and not exposed unnecessarily to browser-accessible JavaScript.

### Tampering

Attackers can tamper with directory data through public submissions or compromised admin access. The system must validate all request bodies server-side, keep public submissions in a non-public pending state until review, and ensure only authenticated admins can approve, import, edit, or delete listings. Untrusted listing content must also be encoded for every output context it enters, including URI query parameters, so stored values cannot change the meaning of client-side navigation targets.

### Information Disclosure

The application stores provider contact information and accepts contact form submissions. Public APIs must not expose non-public fields unintentionally, admin exports must remain admin-only, and logs must avoid recording sensitive data beyond what is operationally necessary. Admin credentials and other secrets must not be embedded in committed config or client-exposed paths. Listing fields that later become browser URLs, such as `website` and `logoUrl`, must be restricted to safe web schemes before they are stored or rendered. Any visitor communication shortcut, including `mailto:` links, must prevent attacker-controlled listing data from injecting hidden recipients or message content.

### Denial of Service

The public submission and contact endpoints are reachable without authentication and can write to persistent storage or logs. The system must apply rate limiting or equivalent abuse controls so attackers cannot cheaply flood the moderation queue, database, or operational logs. Because normal browser form posts are not stopped by CORS, public write endpoints must not rely on CORS alone as an abuse-control boundary when they accept simple form-encodable payloads.

### Elevation of Privilege

Any weakness in admin authentication becomes full application compromise because admins can publish, modify, import, export, and delete listings. The system must enforce admin authorization on every privileged route, avoid client-side trust in browser-stored bearer credentials, and ensure public content cannot be turned into script execution or credential theft in the admin or public frontend. Untrusted listing content must never be allowed to control `href`, `src`, `mailto:`, or other browser-navigation sinks with attacker-controlled parameters.