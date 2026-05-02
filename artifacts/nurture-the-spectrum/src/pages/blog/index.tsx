import { Link } from "wouter";
import { blogPosts } from "@/data/blog-posts";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Blog() {
  return (
    <div className="container py-16 px-4 max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <Badge variant="outline" className="border-primary/30 text-primary mb-4">Resources</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary mb-4">
          Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Guides, tips, and resources to help Philadelphia-area families navigate special needs caregiving.
        </p>
      </div>

      <div className="space-y-6">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="group hover:shadow-md transition-shadow cursor-pointer border-border/60 hover:border-primary/20">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 leading-snug">
                  {post.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
