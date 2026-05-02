import { useLocation } from "wouter";
import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, User, Star, ShieldCheck } from "lucide-react";
import type { Listing } from "@workspace/api-client-react";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const [, setLocation] = useLocation();

  const isFeatured = listing.tier === "Featured";
  const isVerified = listing.tier === "Verified" || isFeatured; // Assuming featured is also verified

  return (
    <Card 
      className={`flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer border ${isFeatured ? 'border-accent' : 'border-border'}`}
      onClick={() => setLocation(`/directory/${listing.slug}`)}
    >
      <CardHeader className="p-5 pb-0">
        <div className="flex justify-between items-start mb-2 gap-2">
          <div className="flex flex-wrap gap-2">
            {isFeatured && (
              <Badge className="bg-accent text-accent-foreground hover:bg-accent/90 border-transparent shadow-sm">
                <Star className="w-3 h-3 mr-1 fill-current" /> Featured
              </Badge>
            )}
            {isVerified && (
              <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 border-transparent shadow-sm">
                <ShieldCheck className="w-3 h-3 mr-1" /> Verified
              </Badge>
            )}
          </div>
          <Badge variant="outline" className="text-xs shrink-0 whitespace-nowrap bg-muted/50">
            <User className="w-3 h-3 mr-1" /> {listing.type}
          </Badge>
        </div>
        <h3 className="text-xl font-bold line-clamp-2 text-primary">{listing.name}</h3>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <MapPin className="w-4 h-4 mr-1 shrink-0" />
          <span className="truncate">{listing.city}, {listing.county}</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-5 flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {listing.description}
        </p>
        
        <div className="space-y-2">
          {listing.specializations && listing.specializations.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {listing.specializations.slice(0, 3).map((spec, i) => (
                <Badge key={i} variant="secondary" className="text-xs font-normal">
                  {spec}
                </Badge>
              ))}
              {listing.specializations.length > 3 && (
                <Badge variant="secondary" className="text-xs font-normal">
                  +{listing.specializations.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 border-t mt-auto flex justify-between items-center bg-muted/10">
        <div className="text-sm font-medium text-foreground">
          {listing.hourlyRate ? (
            <span className="flex items-center">
              {listing.hourlyRate}
            </span>
          ) : (
            <span className="text-muted-foreground font-normal">Rates vary</span>
          )}
        </div>
        <span className="text-sm font-medium text-primary hover:underline">View Profile &rarr;</span>
      </CardFooter>
    </Card>
  );
}
