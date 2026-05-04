import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import CsvImportDialog from "@/components/admin/CsvImportDialog";
import {
  useAdminGetMe,
  getAdminGetMeQueryKey,
  useAdminGetDashboard,
  useAdminGetListings,
  useAdminApproveListing,
  useAdminUpdateListing,
  useAdminDeleteListing,
  useAdminLogout,
  Listing,
} from "@workspace/api-client-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { LogOut, Users, CheckCircle, Clock, Trash2, Check, Upload, Shield, Star, EyeOff, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Auth check
  const { data: me, isLoading: meLoading, error: meError } = useAdminGetMe({
    query: { queryKey: getAdminGetMeQueryKey(), retry: false },
  });

  useEffect(() => {
    if (!meLoading && (!me?.authenticated || meError)) {
      setLocation("/admin");
    }
  }, [me, meLoading, meError, setLocation]);

  const [statusTab, setStatusTab] = useState<string>("All");
  const [tierTab, setTierTab] = useState<string>("All");
  const [page, setPage] = useState(1);
  const [importOpen, setImportOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const { data: stats } = useAdminGetDashboard();
  const { data: listingsData, isLoading: listingsLoading, refetch } = useAdminGetListings({
    status: statusTab === "All" ? undefined : statusTab,
    page,
    limit: 100,
  });

  // Filter by tier client-side
  const filteredListings = tierTab === "All"
    ? (listingsData?.listings ?? [])
    : (listingsData?.listings ?? []).filter((l) => l.tier === tierTab);

  // Clear selection when tabs or page changes
  useEffect(() => { setSelectedIds(new Set()); }, [statusTab, tierTab, page]);

  const approveMutation = useAdminApproveListing();
  const updateMutation = useAdminUpdateListing();
  const deleteMutation = useAdminDeleteListing();
  const logoutMutation = useAdminLogout();

  const toggleOne = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleApprove = (id: number) => {
    approveMutation.mutate({ id }, {
      onSuccess: () => { toast({ title: "Listing approved and published" }); refetch(); },
    });
  };

  const handleToggleStatus = (listing: Listing) => {
    const newStatus = listing.status === "Published" ? "Inactive" : "Published";
    updateMutation.mutate(
      { id: listing.id, data: { status: newStatus } },
      {
        onSuccess: () => {
          toast({ title: `Listing ${newStatus === "Published" ? "published" : "set to inactive"}` });
          refetch();
        },
      }
    );
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    deleteMutation.mutate({ id }, {
      onSuccess: () => {
        toast({ title: "Listing deleted" });
        setSelectedIds((prev) => { const next = new Set(prev); next.delete(id); return next; });
        refetch();
      },
    });
  };

  const [bulkUpdating, setBulkUpdating] = useState(false);

  const handleBulkSetInactive = useCallback(async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    setBulkUpdating(true);
    try {
      const apiBase = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");
      await Promise.all(
        ids.map((id) =>
          fetch(`${apiBase}/api/admin/listings/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Inactive" }),
          })
        )
      );
      toast({ title: `${ids.length} listing${ids.length !== 1 ? "s" : ""} set to inactive` });
      setSelectedIds(new Set());
      refetch();
    } catch {
      toast({ title: "Network error", description: "Could not reach the server", variant: "destructive" });
    } finally {
      setBulkUpdating(false);
    }
  }, [selectedIds, refetch, toast]);

  const handleBulkDelete = useCallback(async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    if (!confirm(`Delete ${ids.length} selected listing${ids.length !== 1 ? "s" : ""}? This cannot be undone.`)) return;
    setBulkDeleting(true);
    try {
      const apiBase = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");
      const resp = await fetch(`${apiBase}/api/admin/listings`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        toast({ title: "Bulk delete failed", description: data.error || "Unknown error", variant: "destructive" });
        return;
      }
      toast({ title: data.message });
      setSelectedIds(new Set());
      refetch();
    } catch {
      toast({ title: "Network error", description: "Could not reach the server", variant: "destructive" });
    } finally {
      setBulkDeleting(false);
    }
  }, [selectedIds, refetch, toast]);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => { setLocation("/admin"); },
      onError: () => { setLocation("/admin"); },
    });
  };

  if (meLoading || !me?.authenticated) {
    return <div className="p-8 text-center">Loading admin portal...</div>;
  }

  const StatCard = ({ title, value, icon }: { title: string; value?: number; icon: React.ReactNode }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value !== undefined ? value : <Skeleton className="h-8 w-16" />}
        </div>
      </CardContent>
    </Card>
  );

  const allSelected = filteredListings.length > 0 && filteredListings.every((l) => selectedIds.has(l.id));

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
              <a href={`${(import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "")}/api/admin/listings/export`} target="_blank" download>
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
          <StatCard title="Total Listings" value={stats?.totalListings} icon={<Users className="w-4 h-4 text-muted-foreground" />} />
          <StatCard title="Pending Approval" value={stats?.pendingCount} icon={<Clock className="w-4 h-4 text-amber-500" />} />
          <StatCard title="Published" value={stats?.publishedCount} icon={<CheckCircle className="w-4 h-4 text-green-500" />} />
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
            {/* Status filter */}
            <div className="mb-2">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1.5">Status</p>
              <Tabs value={statusTab} onValueChange={(v) => { setStatusTab(v); setPage(1); }}>
                <TabsList>
                  <TabsTrigger value="All">All</TabsTrigger>
                  <TabsTrigger value="Pending">Pending</TabsTrigger>
                  <TabsTrigger value="Published">Published</TabsTrigger>
                  <TabsTrigger value="Inactive">Inactive</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Tier filter */}
            <div className="mb-4">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1.5">Tier</p>
              <Tabs value={tierTab} onValueChange={(v) => { setTierTab(v); setPage(1); }}>
                <TabsList>
                  <TabsTrigger value="All">All</TabsTrigger>
                  <TabsTrigger value="Free">Free</TabsTrigger>
                  <TabsTrigger value="Featured">
                    <Star className="w-3 h-3 mr-1 text-accent" />
                    Featured
                  </TabsTrigger>
                  <TabsTrigger value="Verified">
                    <CheckCircle className="w-3 h-3 mr-1 text-primary" />
                    Verified
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Bulk action bar */}
            <div className="flex items-center justify-between mb-3 min-h-[40px]">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  disabled={filteredListings.length === 0}
                  onClick={() => {
                    if (allSelected) {
                      setSelectedIds(new Set());
                    } else {
                      setSelectedIds(new Set(filteredListings.map((l) => l.id)));
                    }
                  }}
                >
                  {allSelected ? "Deselect All" : "Select All"}
                </Button>
                {selectedIds.size > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {selectedIds.size} listing{selectedIds.size !== 1 ? "s" : ""} selected
                  </span>
                )}
              </div>
              {selectedIds.size > 0 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground h-8"
                    onClick={() => setSelectedIds(new Set())}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    disabled={bulkUpdating || bulkDeleting}
                    onClick={handleBulkSetInactive}
                  >
                    <EyeOff className="w-3.5 h-3.5 mr-1.5" />
                    {bulkUpdating ? "Updating…" : `Disable ${selectedIds.size}`}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-8"
                    disabled={bulkDeleting || bulkUpdating}
                    onClick={handleBulkDelete}
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                    {bulkDeleting ? "Deleting…" : `Delete ${selectedIds.size}`}
                  </Button>
                </div>
              )}
            </div>

            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10" />
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
                      <TableCell colSpan={7} className="text-center py-8">Loading listings...</TableCell>
                    </TableRow>
                  ) : filteredListings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No listings found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredListings.map((listing: Listing) => (
                      <TableRow
                        key={listing.id}
                        className={selectedIds.has(listing.id) ? "bg-primary/5" : undefined}
                        data-state={selectedIds.has(listing.id) ? "selected" : undefined}
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedIds.has(listing.id)}
                            onCheckedChange={() => toggleOne(listing.id)}
                            aria-label={`Select ${listing.name}`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{listing.name}</TableCell>
                        <TableCell>{listing.type}</TableCell>
                        <TableCell>{listing.city}, {listing.county}</TableCell>
                        <TableCell>
                          <Badge
                            variant={listing.status === "Published" ? "default" : listing.status === "Pending" ? "secondary" : "outline"}
                            className={listing.status === "Published" ? "bg-green-600" : ""}
                          >
                            {listing.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              listing.tier === "Featured" ? "border-accent text-accent-foreground" :
                              listing.tier === "Verified" ? "border-primary text-primary" : ""
                            }
                          >
                            {listing.tier}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            {listing.status === "Pending" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => handleApprove(listing.id)}
                                title="Approve"
                              >
                                <Check className="h-4 w-4 text-green-600" />
                              </Button>
                            )}
                            {listing.status !== "Pending" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => handleToggleStatus(listing)}
                                title={listing.status === "Published" ? "Set Inactive" : "Publish"}
                              >
                                {listing.status === "Published"
                                  ? <EyeOff className="h-4 w-4 text-muted-foreground" />
                                  : <Eye className="h-4 w-4 text-green-600" />
                                }
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              onClick={() => handleDelete(listing.id)}
                              title="Delete"
                            >
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
                  <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled={page === listingsData.totalPages} onClick={() => setPage((p) => p + 1)}>
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <CsvImportDialog
        open={importOpen}
        onOpenChange={setImportOpen}
        onSuccess={() => { refetch(); }}
      />
    </div>
  );
}
