import { useRoute, useLocation } from "wouter";
import { useGetListingBySlug, getGetListingBySlugQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, Phone, Clock, Mail, ShieldCheck, Star, ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function safeWebUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

export default function ListingDetail() {
  const [, params] = useRoute("/directory/:slug");
  const [location, setLocation] = useLocation();
  const slug = params?.slug || "";

  const { data: listing, isLoading, error } = useGetListingBySlug(slug, {
    query: {
      enabled: !!slug,
      queryKey: getGetListingBySlugQueryKey(slug)
    }
  });

  if (isLoading) {
    return (
      <div className="container py-8 px-4 md:px-6 max-w-4xl mx-auto">
        <Skeleton className="h-8 w-24 mb-6" />
        <div className="space-y-8">
          <div className="flex gap-6">
            <Skeleton className="w-24 h-24 rounded-full" />
            <div className="space-y-4 flex-1">
              <Skeleton className="h-10 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="container py-24 px-4 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-2">Listing Not Found</h2>
        <p className="text-muted-foreground mb-6">The caregiver you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => setLocation("/directory")}>Return to Directory</Button>
      </div>
    );
  }

  const isFeatured = listing.tier === "Featured";
  const isVerified = listing.tier === "Verified" || isFeatured;
  const safeWebsite = listing.website ? safeWebUrl(listing.website) : null;
  const inquirySubject = `Inquiry regarding ${listing.name} via Nurture the Spectrum`;
  const inquiryMailto = `mailto:hello@example.com?subject=${encodeURIComponent(inquirySubject)}`;

  return (
    <div className="bg-background pb-20">
      {/* Header Banner */}
      <div className="bg-primary/5 border-b">
        <div className="container py-8 md:py-12 px-4 md:px-6 max-w-5xl mx-auto">
          <Button variant="ghost" className="mb-6 -ml-4 hover:bg-transparent hover:underline" onClick={() => window.history.back()}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Directory
          </Button>
          
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {listing.logoUrl && (
              <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-white rounded-xl shadow-sm border p-2 flex items-center justify-center overflow-hidden">
                <img src={listing.logoUrl} alt={`${listing.name} logo`} className="max-w-full max-h-full object-contain" />
              </div>
            )}
            
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {isFeatured && (
                  <Badge className="bg-accent text-accent-foreground hover:bg-accent border-transparent shadow-sm px-3 py-1">
                    <Star className="w-3 h-3 mr-1.5 fill-current" /> Featured
                  </Badge>
                )}
                {isVerified && (
                  <Badge className="bg-primary text-primary-foreground hover:bg-primary border-transparent shadow-sm px-3 py-1">
                    <ShieldCheck className="w-3 h-3 mr-1.5" /> Verified Profile
                  </Badge>
                )}
                <Badge variant="outline" className="px-3 py-1 bg-white">
                  {listing.type}
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-primary">{listing.name}</h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1.5 shrink-0" />
                  {listing.city}, {listing.county}
                </div>
                {listing.yearsExperience && (
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5 shrink-0" />
                    {listing.yearsExperience} Years Experience
                  </div>
                )}
                {listing.hourlyRate && (
                  <div className="flex items-center font-medium text-foreground">
                    <span className="mr-1.5">$</span>
                    {listing.hourlyRate}
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-auto shrink-0 flex flex-col gap-3">
              <Button 
                size="lg" 
                className="w-full md:w-auto shadow-sm"
                onClick={() => { window.location.href = inquiryMailto; }}
              >
                <Mail className="w-4 h-4 mr-2" /> Send Inquiry
              </Button>
              {safeWebsite && (
                <Button variant="outline" className="w-full md:w-auto bg-white" asChild>
                  <a href={safeWebsite} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2" /> Visit Website
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-6">About</h2>
              <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {listing.description}
              </div>
            </section>

            {listing.specializations && listing.specializations.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-primary mb-6">Specializations</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.specializations.map((spec, i) => (
                    <Badge key={i} variant="secondary" className="px-4 py-2 text-sm font-medium bg-muted/50">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {listing.certifications && listing.certifications.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-primary mb-6">Certifications & Credentials</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {listing.certifications.map((cert, i) => (
                    <li key={i} className="flex items-center text-muted-foreground bg-muted/20 p-3 rounded-lg border border-muted">
                      <ShieldCheck className="w-5 h-5 mr-3 text-primary shrink-0" />
                      <span className="font-medium text-foreground">{cert}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card border rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-primary mb-4">Contact Information</h3>
              <div className="space-y-4">
                <Button 
                  className="w-full justify-start text-left bg-primary hover:bg-primary/90" 
                  onClick={() => { window.location.href = inquiryMailto; }}
                >
                  <Mail className="w-4 h-4 mr-3" /> Send a Message
                </Button>
                
                {listing.phone && (
                  <div className="flex items-center p-3 rounded-lg bg-muted/30 border border-muted">
                    <Phone className="w-5 h-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Phone</p>
                      <p className="font-medium">{listing.phone}</p>
                    </div>
                  </div>
                )}
                
                {safeWebsite && (
                  <a href={safeWebsite} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 rounded-lg bg-muted/30 border border-muted hover:bg-muted/50 transition-colors">
                    <Globe className="w-5 h-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Website</p>
                      <p className="font-medium text-primary line-clamp-1">{new URL(safeWebsite).hostname}</p>
                    </div>
                  </a>
                )}
              </div>

              <div className="mt-8 pt-6 border-t">
                <p className="text-xs text-muted-foreground text-center">
                  Always verify credentials directly with the provider before starting care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
