import { Link } from "wouter";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary/30 py-14 mt-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold tracking-tight text-primary">
                Nurture the Spectrum
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Connecting families of children with autism and special needs to qualified,
              compassionate caregivers across the Philadelphia metro area.
            </p>
            <p className="text-xs text-muted-foreground/80 mt-4 flex items-center gap-1.5">
              Built with <Heart className="w-3 h-3 fill-accent text-accent" /> for our community
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-semibold mb-4 text-foreground text-sm uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/directory" className="hover:text-primary transition-colors">Find Caregivers</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Resources</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-semibold mb-4 text-foreground text-sm uppercase tracking-wider">
              For Providers
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/submit" className="hover:text-primary transition-colors">Submit a Listing</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/60 text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-2">
          <p>&copy; {new Date().getFullYear()} Nurture the Spectrum. All rights reserved.</p>
          <p className="text-xs">Compassionate · Clear · Professional</p>
        </div>
      </div>
    </footer>
  );
}
