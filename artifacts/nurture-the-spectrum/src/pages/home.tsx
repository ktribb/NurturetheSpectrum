import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COUNTIES, PROVIDER_TYPES } from "@/lib/constants";
import { useGetFeaturedListings } from "@workspace/api-client-react";
import { ListingCard } from "@/components/listing-card";
import { useState } from "react";
import { Search, Eye, Handshake, ShieldCheck, Heart, Users, ArrowRight } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();
  const [county, setCounty] = useState("");
  const [type, setType] = useState("");

  const { data: featuredListings, isLoading } = useGetFeaturedListings();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (county && county !== "any") params.append("county", county);
    if (type && type !== "any") params.append("type", type);
    setLocation(`/directory?${params.toString()}`);
  };

  return (
    <div className="flex flex-col">
      {/* HERO ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Soft layered background */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/8"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, hsl(195 72% 70% / 0.18), transparent 45%), radial-gradient(circle at 85% 75%, hsl(145 35% 70% / 0.18), transparent 45%)",
          }}
        />
        {/* Decorative SVG blobs */}
        <svg
          aria-hidden
          className="absolute -top-24 -right-24 w-96 h-96 text-primary/10"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M44.5,-52.6C56.7,-44.7,64.6,-29.2,68.4,-12.5C72.3,4.3,72.1,22.3,63.5,34.6C54.9,46.9,38,53.5,21.4,58.1C4.7,62.6,-11.7,65,-26,60.3C-40.3,55.6,-52.5,43.7,-58.6,29.4C-64.6,15,-64.6,-1.7,-59.7,-16.6C-54.8,-31.5,-45,-44.5,-32.6,-52.4C-20.2,-60.3,-5.2,-63,9.7,-62.4C24.7,-61.8,32.3,-60.5,44.5,-52.6Z" transform="translate(100 100)" />
        </svg>
        <svg
          aria-hidden
          className="absolute -bottom-32 -left-20 w-96 h-96 text-accent/10"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M38.4,-52.6C49.3,-44.5,57.4,-32.5,62.5,-18.7C67.5,-4.9,69.5,10.7,64.6,23.4C59.7,36.1,47.9,45.9,34.7,53.4C21.4,60.9,6.7,66.1,-8.4,66.5C-23.6,66.9,-39.3,62.6,-49.7,52.6C-60,42.6,-65,27,-66.5,11.1C-67.9,-4.7,-65.9,-20.8,-58.5,-33.6C-51.1,-46.4,-38.4,-55.8,-25,-61.5C-11.6,-67.2,2.4,-69.1,15.7,-65.8C29.1,-62.5,27.4,-60.7,38.4,-52.6Z" transform="translate(100 100)" />
        </svg>

        <div className="container relative px-4 md:px-6 py-20 md:py-32">
          <div className="flex flex-col items-center space-y-6 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Heart className="w-3.5 h-3.5 fill-current" />
              Trusted by Philadelphia-area families
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Find the right caregiver
              <br />
              <span className="text-primary">for your child</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              A trusted directory connecting families of children with autism and special needs to
              qualified, compassionate caregivers across the Philadelphia metro area.
            </p>

            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-3 w-full mt-6 max-w-3xl bg-card p-3 sm:p-4 rounded-2xl shadow-xl border border-border/60"
            >
              <div className="flex-1">
                <Select value={county} onValueChange={setCounty}>
                  <SelectTrigger
                    aria-label="Select County"
                    className="h-12 text-base border-0 bg-transparent shadow-none focus:ring-0 focus-visible:ring-0"
                  >
                    <SelectValue placeholder="Any County" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any County</SelectItem>
                    {COUNTIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="hidden sm:block w-px bg-border my-2" />
              <div className="flex-1">
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger
                    aria-label="Provider Type"
                    className="h-12 text-base border-0 bg-transparent shadow-none focus:ring-0 focus-visible:ring-0"
                  >
                    <SelectValue placeholder="Any Provider Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Type</SelectItem>
                    {PROVIDER_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto h-12 px-8 text-base font-semibold shadow-md gap-2"
              >
                <Search className="w-4 h-4" />
                Search
              </Button>
            </form>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground pt-4">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Verified providers
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                Family-curated
              </span>
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" />
                Free to use
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CAREGIVERS ───────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-3 text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">
              Curated for you
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Featured Caregivers
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
              Highly qualified professionals and agencies trusted by our community.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-72 bg-muted animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : featuredListings && featuredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredListings.slice(0, 3).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/40 rounded-2xl">
              <p className="text-muted-foreground">No featured caregivers available yet.</p>
            </div>
          )}

          <div className="mt-14 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setLocation("/directory")}
              className="gap-2 h-12 px-8"
            >
              View All Caregivers
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">
              How it works
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-3">
              Three simple steps
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mt-4">
              Clear, supportive steps to find the right care for your family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Search,
                step: "01",
                title: "Search",
                desc: "Filter by county, provider type, and specializations to find the perfect match for your child's needs.",
              },
              {
                icon: Eye,
                step: "02",
                title: "Review",
                desc: "Read detailed profiles, verify credentials, and understand each provider's approach to care.",
              },
              {
                icon: Handshake,
                step: "03",
                title: "Connect",
                desc: "Reach out directly to providers to discuss your family's needs and begin building a relationship.",
              },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div
                key={step}
                className="flex flex-col items-center text-center bg-card p-8 rounded-2xl shadow-sm border border-border/60 hover:shadow-md transition-shadow"
              >
                <div className="relative mb-5">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center shadow-sm">
                    {step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 px-8 py-14 md:px-16 md:py-20 text-center shadow-xl">
            <svg
              aria-hidden
              className="absolute -top-12 -right-12 w-64 h-64 text-white/10"
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              <path d="M44.5,-52.6C56.7,-44.7,64.6,-29.2,68.4,-12.5C72.3,4.3,72.1,22.3,63.5,34.6C54.9,46.9,38,53.5,21.4,58.1C4.7,62.6,-11.7,65,-26,60.3C-40.3,55.6,-52.5,43.7,-58.6,29.4C-64.6,15,-64.6,-1.7,-59.7,-16.6C-54.8,-31.5,-45,-44.5,-32.6,-52.4C-20.2,-60.3,-5.2,-63,9.7,-62.4C24.7,-61.8,32.3,-60.5,44.5,-52.6Z" transform="translate(100 100)" />
            </svg>
            <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground tracking-tight">
              Ready to find quality care?
            </h2>
            <p className="relative text-primary-foreground/85 text-lg mt-4 max-w-2xl mx-auto">
              Browse our growing directory of trusted caregivers, agencies, and resources for special needs families.
            </p>
            <div className="relative mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setLocation("/directory")}
                className="h-12 px-8 text-base font-semibold gap-2"
              >
                Browse the Directory
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setLocation("/submit")}
                className="h-12 px-8 text-base font-semibold bg-transparent text-primary-foreground border-primary-foreground/40 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                List Your Service
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
