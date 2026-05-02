import { useState } from "react";
import { Link } from "wouter";
import { blogPosts } from "@/data/blog-posts";
import { ArrowRight, Clock, Calendar, BookOpen, MapPin, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Distinct gradient palettes per post (cycles if more posts added)
const COVER_STYLES = [
  {
    gradient: "from-[hsl(195,72%,30%)] to-[hsl(195,72%,50%)]",
    icon: "🏙️",
    pattern: "Philadelphia",
  },
  {
    gradient: "from-[hsl(185,65%,28%)] to-[hsl(200,60%,48%)]",
    icon: "🌊",
    pattern: "Delaware",
  },
  {
    gradient: "from-[hsl(145,30%,32%)] to-[hsl(175,50%,42%)]",
    icon: "🌿",
    pattern: "Maryland",
  },
  {
    gradient: "from-[hsl(205,65%,35%)] to-[hsl(185,55%,50%)]",
    icon: "🌅",
    pattern: "South Jersey",
  },
];

// Collect all unique tags
const ALL_TAGS = ["All", ...Array.from(new Set(blogPosts.flatMap((p) => p.tags)))];

function CoverArt({ index }: { index: number }) {
  const style = COVER_STYLES[index % COVER_STYLES.length];
  return (
    <div
      className={`relative h-48 bg-gradient-to-br ${style.gradient} overflow-hidden flex items-center justify-center`}
    >
      {/* Decorative circles */}
      <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -left-4 w-36 h-36 rounded-full bg-white/8" />
      <div className="relative flex flex-col items-center gap-2">
        <span className="text-4xl" role="img" aria-label={style.pattern}>
          {style.icon}
        </span>
        <span className="text-white/80 text-xs font-semibold uppercase tracking-widest">
          {style.pattern}
        </span>
      </div>
    </div>
  );
}

function PostCard({ post, index }: { post: (typeof blogPosts)[number]; index: number }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group bg-card border border-border/60 rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/25 transition-all duration-300 flex flex-col h-full cursor-pointer">
        <CoverArt index={index} />

        <div className="flex flex-col flex-1 p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-3 flex-1">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all whitespace-nowrap">
              Read More <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function Blog() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.tags.includes(activeTag));

  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/8 via-background to-accent/6 border-b border-border/40">
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, hsl(195 72% 70% / 0.15), transparent 40%), radial-gradient(circle at 10% 80%, hsl(145 35% 70% / 0.12), transparent 40%)",
          }}
        />
        <div className="container relative px-4 md:px-6 py-16 md:py-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-5">
            <BookOpen className="w-3.5 h-3.5" />
            Resources
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Blog &amp; Guides
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Guides, tips, and curated resources to help Philadelphia-area families navigate
            special needs caregiving — by region, diagnosis, and provider type.
          </p>
        </div>
      </section>

      {/* ── Content + Sidebar ────────────────────────────────── */}
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* ── Main column ──────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Filter tags */}
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Filter by topic
              </p>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                      activeTag === tag
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-card text-foreground/70 border-border/60 hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Article count */}
            <p className="text-sm text-muted-foreground mb-6">
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              {activeTag !== "All" ? ` about "${activeTag}"` : ""}
            </p>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {filtered.map((post, i) => (
                  <PostCard
                    key={post.slug}
                    post={post}
                    index={blogPosts.indexOf(post)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-muted/30 rounded-2xl">
                <p className="text-muted-foreground">No articles match this filter.</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTag("All")}
                  className="mt-3 text-primary"
                >
                  Clear filter
                </Button>
              </div>
            )}
          </div>

          {/* ── Sidebar ──────────────────────────────────────── */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            {/* Recent articles */}
            <div className="bg-card border border-border/60 rounded-2xl p-6">
              <h3 className="font-bold text-sm uppercase tracking-wider text-foreground mb-5">
                Recent Articles
              </h3>
              <ul className="space-y-4">
                {blogPosts.slice(0, 4).map((post, i) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex gap-3 items-start"
                    >
                      <div
                        className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${
                          COVER_STYLES[i % COVER_STYLES.length].gradient
                        } flex items-center justify-center text-base`}
                      >
                        <span role="img" aria-label="">
                          {COVER_STYLES[i % COVER_STYLES.length].icon}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{post.readTime}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Region links */}
            <div className="bg-card border border-border/60 rounded-2xl p-6">
              <h3 className="font-bold text-sm uppercase tracking-wider text-foreground mb-4">
                Browse by Region
              </h3>
              <ul className="space-y-2">
                {["Philadelphia", "Delaware", "Maryland", "South Jersey"].map((region) => (
                  <li key={region}>
                    <button
                      onClick={() => setActiveTag(region)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-full text-left"
                    >
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-accent" />
                      {region}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter / contact CTA */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-center">
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10" />
              <Mail className="w-8 h-8 text-white/90 mx-auto mb-3 relative" />
              <h3 className="font-bold text-white mb-2 relative">Stay in the loop</h3>
              <p className="text-primary-foreground/80 text-xs leading-relaxed mb-4 relative">
                Have a question or want to suggest a resource? We'd love to hear from you.
              </p>
              <Link href="/contact" className="relative">
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-full text-xs font-semibold"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
