import { useParams, Link } from "wouter";
import { getPostBySlug } from "@/data/blog-posts";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import NotFound from "@/pages/not-found";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug);

  if (!post) return <NotFound />;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="container px-4 max-w-4xl mx-auto py-12 md:py-16">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
          </Link>

          <Badge variant="outline" className="border-primary/30 text-primary mb-4">Resources</Badge>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-primary leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
      </div>

      {/* Article body */}
      <div className="container px-4 max-w-3xl mx-auto py-12 md:py-16">
        {post.content}

        {/* Footer CTA */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="bg-primary/5 rounded-2xl border border-primary/10 p-8 text-center">
            <h3 className="text-xl font-bold text-primary mb-2">Ready to start your search?</h3>
            <p className="text-muted-foreground mb-6">
              Browse our directory of specialized caregivers serving the Philadelphia metro area.
            </p>
            <Link href="/directory" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
              Browse the Directory <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to all articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
