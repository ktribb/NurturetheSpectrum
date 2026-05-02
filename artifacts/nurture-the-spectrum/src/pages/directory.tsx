import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useGetListings } from "@workspace/api-client-react";
import { ListingCard } from "@/components/listing-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { COUNTIES, PROVIDER_TYPES, SPECIALIZATIONS, CERTIFICATIONS } from "@/lib/constants";
import { Filter, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Directory() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const [county, setCounty] = useState(searchParams.get("county") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [specs, setSpecs] = useState<string[]>(searchParams.get("specializations")?.split(",").filter(Boolean) || []);
  const [certs, setCerts] = useState<string[]>(searchParams.get("certifications")?.split(",").filter(Boolean) || []);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetListings({
    county: county === "any" ? "" : county,
    type: type === "any" ? "" : type,
    specializations: specs.length > 0 ? specs.join(",") : undefined,
    certifications: certs.length > 0 ? certs.join(",") : undefined,
    page,
    limit: 12
  });

  // Keep URL in sync with state if needed, or rely on state for simplicity in this mockup
  
  const toggleSpec = (spec: string) => {
    setSpecs(prev => prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]);
    setPage(1);
  };

  const toggleCert = (cert: string) => {
    setCerts(prev => prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]);
    setPage(1);
  };

  const clearFilters = () => {
    setCounty("");
    setType("");
    setSpecs([]);
    setCerts([]);
    setPage(1);
  };

  const Sidebar = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary">Filters</h2>
        {(county || type || specs.length > 0 || certs.length > 0) && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
            Clear all <X className="w-3 h-3 ml-1" />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">County</h3>
        <div className="space-y-2">
          {COUNTIES.map(c => (
            <div key={c} className="flex items-center space-x-2">
              <Checkbox 
                id={`county-${c}`} 
                checked={county === c} 
                onCheckedChange={(checked) => { setCounty(checked ? c : ""); setPage(1); }} 
              />
              <Label htmlFor={`county-${c}`} className="text-sm font-normal cursor-pointer">{c}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Provider Type</h3>
        <div className="space-y-2">
          {PROVIDER_TYPES.map(t => (
            <div key={t} className="flex items-center space-x-2">
              <Checkbox 
                id={`type-${t}`} 
                checked={type === t} 
                onCheckedChange={(checked) => { setType(checked ? t : ""); setPage(1); }} 
              />
              <Label htmlFor={`type-${t}`} className="text-sm font-normal cursor-pointer">{t}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Specializations</h3>
        <div className="space-y-2">
          {SPECIALIZATIONS.map(s => (
            <div key={s} className="flex items-center space-x-2">
              <Checkbox 
                id={`spec-${s}`} 
                checked={specs.includes(s)} 
                onCheckedChange={() => toggleSpec(s)} 
              />
              <Label htmlFor={`spec-${s}`} className="text-sm font-normal cursor-pointer">{s}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Certifications</h3>
        <div className="space-y-2">
          {CERTIFICATIONS.map(c => (
            <div key={c} className="flex items-center space-x-2">
              <Checkbox 
                id={`cert-${c}`} 
                checked={certs.includes(c)} 
                onCheckedChange={() => toggleCert(c)} 
              />
              <Label htmlFor={`cert-${c}`} className="text-sm font-normal cursor-pointer">{c}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-8 md:py-12 px-4 md:px-6">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0 sticky top-24">
          <Sidebar />
        </aside>

        {/* Mobile Filter Button */}
        <div className="md:hidden w-full flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-primary">Directory</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
              <SheetHeader className="mb-6">
                <SheetTitle>Filter Caregivers</SheetTitle>
              </SheetHeader>
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Content */}
        <main className="flex-1 w-full min-w-0">
          <div className="hidden md:flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary">Directory</h1>
              <p className="text-muted-foreground mt-1">
                {data?.total ? `${data.total} caregiver${data.total === 1 ? '' : 's'} found` : 'Loading...'}
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-72 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : data?.listings && data.listings.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.listings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
              
              {data.totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                  <Button 
                    variant="outline" 
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center px-4 text-sm">
                    Page {page} of {data.totalPages}
                  </div>
                  <Button 
                    variant="outline" 
                    disabled={page === data.totalPages}
                    onClick={() => setPage(p => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24 bg-card rounded-xl border border-dashed">
              <h3 className="text-xl font-semibold mb-2">No caregivers found</h3>
              <p className="text-muted-foreground mb-6">We couldn't find anyone matching your current filters.</p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
