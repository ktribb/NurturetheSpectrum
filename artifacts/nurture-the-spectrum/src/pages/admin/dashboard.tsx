import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import CsvImportDialog from "@/components/admin/CsvImportDialog";
import { 
  useAdminGetMe, 
  getAdminGetMeQueryKey,
  useAdminGetDashboard,
  useAdminGetListings,
  useAdminApproveListing,
  useAdminDeleteListing,
  useAdminUpdateListing,
  useAdminLogout,
  Listing
} from "@workspace/api-client-react";
import { clearAdminToken } from "@/lib/admin-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LogOut, Users, CheckCircle, Clock, XCircle, Trash2, Edit, Check, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Auth check
  const { data: me, isLoading: meLoading, error: meError } = useAdminGetMe({
    query: {
      queryKey: getAdminGetMeQueryKey(),
      retry: false
    }
  });

  useEffect(() => {
    if (!meLoading && (!me?.authenticated || meError)) {
      setLocation("/admin");
    }
  }, [me, meLoading, meError, setLocation]);

  const [statusTab, setStatusTab] = useState<string>("All");
  const [page, setPage] = useState(1);
  const [importOpen, setImportOpen] = useState(false);

  const { data: stats, isLoading: statsLoading } = useAdminGetDashboard();
  const { data: listingsData, isLoading: listingsLoading, refetch } = useAdminGetListings({
    status: statusTab === "All" ? undefined : statusTab,
    page,
    limit: 20
  });

  const approveMutation = useAdminApproveListing();
  const deleteMutation = useAdminDeleteListing();
  const logoutMutation = useAdminLogout();

  const handleApprove = (id: number) => {
    approveMutation.mutate({ id }, {
      onSuccess: () => {
        toast({ title: "Listing approved" });
        refetch();
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      deleteMutation.mutate({ id }, {
        onSuccess: () => {
          toast({ title: "Listing deleted" });
          refetch();
        }
      });
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        clearAdminToken();
        setLocation("/admin");
      },
      onError: () => {
        clearAdminToken();
        setLocation("/admin");
      }
    });
  };

  if (meLoading || !me?.authenticated) {
    return <div className="p-8 text-center">Loading admin portal...</div>;
  }

  const StatCard = ({ title, value, icon, description }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value !== undefined ? value : <Skeleton className="h-8 w-16" />}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h1 className="font-bold text-lg">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setImportOpen(true)}>
              <Upload className="w-4 h-4 mr-2" /> Import CSV
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/api/admin/export/listings" target="_blank" download>
                Export CSV
              </a>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Total Listings" 
            value={stats?.totalListings} 
            icon={<Users className="w-4 h-4 text-muted-foreground" />}
          />
          <StatCard 
            title="Pending Approval" 
            value={stats?.pendingCount} 
            icon={<Clock className="w-4 h-4 text-amber-500" />}
          />
          <StatCard 
            title="Published" 
            value={stats?.publishedCount} 
            icon={<CheckCircle className="w-4 h-4 text-green-500" />}
          />
          <StatCard 
            title="Premium (Verified/Featured)" 
            value={stats ? stats.verifiedCount + stats.featuredCount : undefined} 
            icon={<Star className="w-4 h-4 text-accent" />}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="All" value={statusTab} onValueChange={(v) => { setStatusTab(v); setPage(1); }}>
              <TabsList className="mb-4">
                <TabsTrigger value="All">All</TabsTrigger>
                <TabsTrigger value="Pending">Pending</TabsTrigger>
                <TabsTrigger value="Published">Published</TabsTrigger>
                <TabsTrigger value="Inactive">Inactive</TabsTrigger>
              </TabsList>
              
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listingsLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">Loading listings...</TableCell>
                      </TableRow>
                    ) : listingsData?.listings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No listings found in this category.</TableCell>
                      </TableRow>
                    ) : (
                      listingsData?.listings.map((listing: Listing) => (
                        <TableRow key={listing.id}>
                          <TableCell className="font-medium">{listing.name}</TableCell>
                          <TableCell>{listing.type}</TableCell>
                          <TableCell>{listing.city}, {listing.county}</TableCell>
                          <TableCell>
                            <Badge variant={
                              listing.status === "Published" ? "default" : 
                              listing.status === "Pending" ? "secondary" : "outline"
                            } className={listing.status === "Published" ? "bg-green-600" : ""}>
                              {listing.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              listing.tier === "Featured" ? "border-accent text-accent-foreground" :
                              listing.tier === "Verified" ? "border-primary text-primary" : ""
                            }>
                              {listing.tier}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {listing.status === "Pending" && (
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => handleApprove(listing.id)} title="Approve">
                                  <Check className="h-4 w-4 text-green-600" />
                                </Button>
                              )}
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-destructive hover:text-destructive" onClick={() => handleDelete(listing.id)} title="Delete">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {listingsData && listingsData.totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {listingsData.totalPages}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled={page === listingsData.totalPages} onClick={() => setPage(p => p + 1)}>
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <CsvImportDialog
        open={importOpen}
        onOpenChange={setImportOpen}
        onSuccess={() => {
          refetch();
        }}
      />
    </div>
  );
}

// Need to import icons used above
import { Shield, Star } from "lucide-react";
