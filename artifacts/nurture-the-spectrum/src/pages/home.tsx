import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COUNTIES, PROVIDER_TYPES } from "@/lib/constants";
import { useGetFeaturedListings } from "@workspace/api-client-react";
import { ListingCard } from "@/components/listing-card";
import { useState } from "react";

export default function Home() {
  const [, setLocation] = useLocation();
  const [county, setCounty] = useState("");
  const [type, setType] = useState("");

  const { data: featuredListings, isLoading } = useGetFeaturedListings();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (county) params.append("county", county);
    if (type) params.append("type", type);
    setLocation(`/directory?${params.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary/5 py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary">
              Find the Right Caregiver for Your Child
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              A trusted directory connecting families of children with autism and special needs to qualified, compassionate caregivers in the Philadelphia metro area.
            </p>
            
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 w-full mt-8 max-w-2xl bg-card p-4 rounded-xl shadow-lg border">
              <div className="flex-1">
                <Select value={county} onValueChange={setCounty}>
                  <SelectTrigger aria-label="Select County">
                    <SelectValue placeholder="Any County" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any County</SelectItem>
                    {COUNTIES.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger aria-label="Provider Type">
                    <SelectValue placeholder="Any Provider Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Type</SelectItem>
                    {PROVIDER_TYPES.map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter text-primary">Featured Caregivers</h2>
            <p className="text-muted-foreground md:text-lg max-w-[800px]">
              Highly qualified professionals and agencies trusted by our community.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings?.slice(0, 3).map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" onClick={() => setLocation("/directory")}>
              View All Caregivers
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter text-primary">How It Works</h2>
            <p className="text-muted-foreground mt-4">Simple, clear steps to find the support your family needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">1</div>
              <h3 className="text-xl font-semibold">Search</h3>
              <p className="text-muted-foreground">Filter by county, provider type, and specializations to find the perfect match for your child.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">2</div>
              <h3 className="text-xl font-semibold">Review</h3>
              <p className="text-muted-foreground">Read detailed profiles, verify credentials, and understand their approach to care.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">3</div>
              <h3 className="text-xl font-semibold">Connect</h3>
              <p className="text-muted-foreground">Reach out directly to providers to discuss your family's needs and begin building a relationship.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
