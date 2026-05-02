import { useParams, Link } from "wouter";
import { getPostBySlug, blogPosts } from "@/data/blog-posts";
import { ArrowLeft, ArrowRight, Clock, Calendar, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import NotFound from "@/pages/not-found";

const COVER_GRADIENTS = [
  "from-[hsl(195,72%,28%)] to-[hsl(195,72%,48%)]",
  "from-[hsl(185,65%,26%)] to-[hsl(200,60%,46%)]",
  "from-[hsl(145,30%,30%)] to-[hsl(175,50%,40%)]",
  "from-[hsl(205,65%,33%)] to-[hsl(185,55%,48%)]",
];

const COVER_ICONS = ["🏙️", "🌊", "🌿", "🌅"];

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug);

  if (!post) return <NotFound />;

  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const gradient = COVER_GRADIENTS[postIndex % COVER_GRADIENTS.length];
  const icon = COVER_ICONS[postIndex % COVER_ICONS.length];

  // Related posts: up to 2 others, same tags preferred
  const related = blogPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aShared = a.tags.filter((t) => post.tags.includes(t)).length;
      const bShared = b.tags.filter((t) => post.tags.includes(t)).length;
      return bShared - aShared;
    })
    .slice(0, 2);

  return (
    <div className="min-h-screen">
      {/* ── Hero banner ─────────────────────────────────────── */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${gradient}`}>
        {/* Decorative blobs */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-white/8" />

        <div className="container relative px-4 md:px-6 max-w-4xl mx-auto py-14 md:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-white/75 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Blog
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-sm text-white/75">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Wave bottom edge */}
        <div className="relative h-10 overflow-hidden">
          <svg
            viewBox="0 0 1440 40"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full"
            fill="hsl(210 40% 98%)"
          >
            <path d="M0,40 C360,0 1080,40 1440,10 L1440,40 Z" />
          </svg>
        </div>
      </div>

      {/* ── Article layout ──────────────────────────────────── */}
      <div className="container px-4 md:px-6 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">

          {/* Article body */}
          <article className="flex-1 min-w-0">
            {post.content}

            {/* Footer CTA */}
            <div className="mt-14 pt-10 border-t border-border">
              <div
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} px-8 py-12 text-center shadow-lg`}
              >
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
                <span className="relative text-3xl block mb-3" role="img" aria-label="">{icon}</span>
                <h3 className="relative text-xl font-bold text-white mb-2">
                  Ready to start your search?
                </h3>
                <p className="relative text-white/80 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
                  Browse our directory of specialized caregivers serving the Philadelphia metro area — filtered by region, type, and certification.
                </p>
                <Link
                  href="/directory"
                  className="relative inline-flex items-center gap-2 bg-white text-primary font-bold px-7 py-3 rounded-full hover:bg-white/90 transition-colors text-sm shadow-md"
                >
                  Browse the Directory <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to all articles
                </Link>
              </div>
            </div>
          </article>

          {/* Sticky sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* About this guide */}
              <div className="bg-card border border-border/60 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-sm text-foreground">About this guide</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Related articles */}
              {related.length > 0 && (
                <div className="bg-card border border-border/60 rounded-2xl p-5">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-foreground mb-4">
                    Related Articles
                  </h3>
                  <ul className="space-y-4">
                    {related.map((rp, i) => {
                      const ri = blogPosts.findIndex((p) => p.slug === rp.slug);
                      return (
                        <li key={rp.slug}>
                          <Link
                            href={`/blog/${rp.slug}`}
                            className="group flex gap-3 items-start"
                          >
                            <div
                              className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${
                                COVER_GRADIENTS[ri % COVER_GRADIENTS.length]
                              } flex items-center justify-center text-base`}
                            >
                              <span role="img" aria-label="">{COVER_ICONS[ri % COVER_ICONS.length]}</span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-3">
                                {rp.title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">{rp.readTime}</p>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Directory CTA */}
              <div className="bg-secondary/60 border border-border/60 rounded-2xl p-5 text-center">
                <p className="text-xs font-bold text-foreground mb-1">Find a caregiver now</p>
                <p className="text-xs text-muted-foreground mb-4">
                  Search our full directory by county, type &amp; specialty.
                </p>
                <Link href="/directory">
                  <button className="w-full text-xs font-semibold bg-primary text-primary-foreground px-4 py-2.5 rounded-full hover:bg-primary/90 transition-colors">
                    Search Directory →
                  </button>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
