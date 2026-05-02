import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-primary">Nurture the Spectrum</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm">
            Connecting families of children with autism and special needs to qualified caregivers in the Philadelphia metro area.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li><Link href="/directory" className="hover:text-foreground">Directory</Link></li>
            <li><Link href="/about" className="hover:text-foreground">About</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-4">Providers</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/submit" className="hover:text-foreground">Submit a Listing</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">Support</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mt-12 pt-8 border-t text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Nurture the Spectrum. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Compassionate, clear, and professional.</p>
      </div>
    </footer>
  );
}
