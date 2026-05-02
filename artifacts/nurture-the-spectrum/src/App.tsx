import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import Directory from "@/pages/directory";
import ListingDetail from "@/pages/listing";
import SubmitListing from "@/pages/submit";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";

const queryClient = new QueryClient();

function WithPublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* Admin routes — no public navbar/footer */}
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin" component={AdminLogin} />

      {/* Public routes */}
      <Route path="/">
        <WithPublicLayout><Home /></WithPublicLayout>
      </Route>
      <Route path="/directory/:slug">
        <WithPublicLayout><ListingDetail /></WithPublicLayout>
      </Route>
      <Route path="/directory">
        <WithPublicLayout><Directory /></WithPublicLayout>
      </Route>
      <Route path="/submit">
        <WithPublicLayout><SubmitListing /></WithPublicLayout>
      </Route>
      <Route path="/about">
        <WithPublicLayout><About /></WithPublicLayout>
      </Route>
      <Route path="/contact">
        <WithPublicLayout><Contact /></WithPublicLayout>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
